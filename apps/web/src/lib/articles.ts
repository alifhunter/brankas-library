import configPromise from '@payload-config';
import { getPayload } from 'payload';

import { type LexicalContent, type MediaImage, normalizeMedia, slugFromText } from './releases';

export type ArticleContent = {
  category: string;
  content: LexicalContent | null;
  dateLabel: string;
  excerpt: string;
  heroImage: MediaImage | null;
  slug: string;
  title: string;
};

type PayloadArticle = {
  category?: string | null;
  content?: LexicalContent | null;
  excerpt?: string | null;
  heroImage?: MediaImage | string | null;
  publishedAt?: string | null;
  slug?: string | null;
  title?: string | null;
  updatedAt?: string | null;
};

export async function getPublishedArticles(): Promise<ArticleContent[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'articles',
      depth: 1,
      limit: 50,
      sort: '-publishedAt',
      where: {
        status: {
          equals: 'published',
        },
      },
    });

    return result.docs.map((article) => normalizeArticle(article as PayloadArticle));
  } catch {
    return [];
  }
}

export async function getArticle(slug: string): Promise<ArticleContent | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'articles',
      depth: 1,
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

    const [article] = result.docs;

    return article ? normalizeArticle(article as PayloadArticle) : null;
  } catch {
    return null;
  }
}

function normalizeArticle(article: PayloadArticle): ArticleContent {
  const title = article.title ?? 'Article';

  return {
    category: formatCategory(article.category),
    content: article.content ?? null,
    dateLabel: formatArticleDate(article.publishedAt ?? article.updatedAt),
    excerpt: article.excerpt ?? '',
    heroImage: normalizeMedia(article.heroImage),
    slug: article.slug ?? slugFromText(title),
    title,
  };
}

function formatCategory(value?: string | null) {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatArticleDate(value?: string | null) {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}
