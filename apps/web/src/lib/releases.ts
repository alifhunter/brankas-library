import configPromise from '@payload-config';
import { getPayload } from 'payload';

export type ReleaseContent = {
  content: LexicalContent | null;
  dateLabel: string;
  slug: string;
  summary: string;
  tags: string[];
  title: string;
  version: string;
};

export type LexicalContent = {
  root?: {
    children?: LexicalNode[];
  };
};

export type LexicalNode = {
  children?: LexicalNode[];
  fields?: {
    newTab?: boolean | null;
    url?: string | null;
  };
  format?: number | string;
  listType?: string | null;
  tag?: string | null;
  text?: string | null;
  type?: string | null;
  url?: string | null;
  value?: {
    alt?: string | null;
    filename?: string | null;
    url?: string | null;
  } | null;
};

type PayloadRelease = {
  content?: LexicalContent | null;
  releaseDate?: string | null;
  slug?: string | null;
  summary?: string | null;
  tags?: Array<{ label?: string | null }> | null;
  title?: string | null;
  version?: string | null;
};

export async function getPublishedReleases(): Promise<ReleaseContent[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'releases',
      depth: 0,
      limit: 20,
      sort: '-releaseDate',
      where: {
        status: {
          equals: 'published',
        },
      },
    });

    return result.docs.map((release) => normalizeRelease(release as PayloadRelease));
  } catch {
    return [];
  }
}

export async function getRelease(slug: string): Promise<ReleaseContent | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'releases',
      depth: 0,
      limit: 1,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            status: {
              equals: 'published',
            },
          },
        ],
      },
    });

    const [release] = result.docs;

    return release ? normalizeRelease(release as PayloadRelease) : null;
  } catch {
    return null;
  }
}

function normalizeRelease(release: PayloadRelease): ReleaseContent {
  const version = release.version ?? release.title ?? 'Release';

  return {
    content: release.content ?? null,
    dateLabel: formatReleaseDate(release.releaseDate),
    slug: release.slug ?? slugFromText(version),
    summary: release.summary ?? '',
    tags: release.tags?.map((tag) => tag.label ?? '').filter(Boolean) ?? [],
    title: release.title ?? version,
    version,
  };
}

function formatReleaseDate(value?: string | null) {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

export function slugFromText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
