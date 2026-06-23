import configPromise from '@payload-config';
import { getPayload } from 'payload';

import {
  findMergedComponentDoc,
  type ComponentPlatformDetail,
  type MergedComponentDoc,
} from '../app/(frontend)/library-data';
import type { LexicalContent } from './releases';

export type ComponentPlatformContent = {
  content: LexicalContent | null;
  description: string;
  importName: string;
  packageName: string;
  status: 'Draft' | 'Ready';
};

export type ComponentPageContent = {
  defaultPlatform: 'desktop' | 'mobile';
  desktop: ComponentPlatformContent | null;
  mobile: ComponentPlatformContent | null;
  name: string;
  slug: string;
};

type ComponentPageBodies = {
  desktopContent: LexicalContent | null;
  mobileContent: LexicalContent | null;
};

export async function getComponentPage(slug: string): Promise<ComponentPageContent | null> {
  const canonical = slug.startsWith('mobile-') ? slug.slice('mobile-'.length) : slug;
  const doc = findMergedComponentDoc(canonical);

  if (!doc) {
    return null;
  }

  const bodies = await getComponentBodies(canonical);
  return toContent(doc, bodies);
}

/**
 * Fetches the editable per-platform rich-text bodies for a component from the
 * CMS. The live preview and import snippet stay code-owned (see library-data);
 * only the written guidance below them is authored in Payload.
 */
async function getComponentBodies(canonicalSlug: string): Promise<ComponentPageBodies> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'component-pages',
      depth: 1,
      limit: 1,
      where: {
        and: [{ slug: { equals: canonicalSlug } }, { status: { equals: 'published' } }],
      },
    });

    const page = result.docs[0] as
      | { desktopContent?: LexicalContent | null; mobileContent?: LexicalContent | null }
      | undefined;

    return {
      desktopContent: page?.desktopContent ?? null,
      mobileContent: page?.mobileContent ?? null,
    };
  } catch {
    return { desktopContent: null, mobileContent: null };
  }
}

/**
 * Returns a map of canonical component slug -> thumbnail image URL for every
 * published component page that has a thumbnail set. Used to render the
 * Components grid cards. Empty on database error.
 */
export async function getComponentThumbnails(): Promise<Record<string, string>> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'component-pages',
      depth: 1,
      limit: 300,
      where: { status: { equals: 'published' } },
    });

    const map: Record<string, string> = {};
    for (const doc of result.docs) {
      const page = doc as {
        slug?: string | null;
        thumbnail?: { url?: string | null } | string | null;
        thumbnailUrl?: string | null;
      };
      const uploaded = page.thumbnail && typeof page.thumbnail === 'object' ? page.thumbnail.url : null;
      const linked = page.thumbnailUrl?.trim();
      // Prefer an uploaded image; fall back to an external image URL.
      const url = uploaded || (linked && /^https?:\/\//.test(linked) ? linked : null);
      if (page.slug && url) {
        map[page.slug] = url;
      }
    }
    return map;
  } catch {
    return {};
  }
}

function toContent(doc: MergedComponentDoc, bodies: ComponentPageBodies): ComponentPageContent {
  return {
    defaultPlatform: doc.defaultPlatform,
    desktop: toPlatformContent(doc.desktop, bodies.desktopContent),
    mobile: toPlatformContent(doc.mobile, bodies.mobileContent),
    name: doc.name,
    slug: doc.slug,
  };
}

function toPlatformContent(
  detail: ComponentPlatformDetail | null,
  content: LexicalContent | null,
): ComponentPlatformContent | null {
  if (!detail) {
    return null;
  }

  return {
    content,
    description: detail.description,
    importName: detail.importName,
    packageName: detail.packageName,
    status: detail.status,
  };
}
