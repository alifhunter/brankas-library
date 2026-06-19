import configPromise from '@payload-config';
import { getPayload } from 'payload';

export type FoundationContent = {
  description: string;
  eyebrow: string;
  name: string;
  sections: Array<{ body: string; title: string }>;
  slug: string;
  tokenReferences: Array<{ name: string; value: string }>;
};

type PayloadFoundation = {
  description?: string | null;
  eyebrow?: string | null;
  name?: string | null;
  sections?: Array<{ body?: string | null; title?: string | null }> | null;
  slug?: string | null;
  status?: 'draft' | 'published' | null;
  tokenReferences?: Array<{ name?: string | null; value?: string | null }> | null;
};

export async function getFoundation(slug: string): Promise<FoundationContent | null> {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: 'foundations',
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
  });

  const [page] = result.docs;

  if (!page) {
    return null;
  }

  return normalizeFoundation(page as PayloadFoundation);
}

export async function getAllFoundationSlugs(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: 'foundations',
    depth: 0,
    limit: 100,
    where: { status: { equals: 'published' } },
  });

  return result.docs.map((doc) => (doc as PayloadFoundation).slug ?? '').filter(Boolean);
}

function normalizeFoundation(page: PayloadFoundation): FoundationContent {
  const slug = page.slug ?? '';

  return {
    description: page.description ?? '',
    eyebrow: page.eyebrow ?? 'Foundation',
    name: page.name ?? slug,
    sections:
      page.sections
        ?.map((section) => ({ body: section.body ?? '', title: section.title ?? '' }))
        .filter((section) => section.title && section.body) ?? [],
    slug,
    tokenReferences:
      page.tokenReferences
        ?.map((token) => ({ name: token.name ?? '', value: token.value ?? '' }))
        .filter((token) => token.name) ?? [],
  };
}
