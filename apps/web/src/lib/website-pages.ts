import configPromise from '@payload-config';
import { getPayload } from 'payload';

export type VisualCardTone = 'green' | 'light' | 'orange' | 'plain';
export type WebsitePageLayout = 'custom' | 'docs-sidebar' | 'no-sidebar';
export type WebsitePageType = 'changelog' | 'custom' | 'generic' | 'home' | 'patterns' | 'tokens';

export type WebsitePageContent = {
  changelog: {
    dateLabel: string;
    summary: string;
    tags: string[];
    title: string;
  };
  layout: WebsitePageLayout;
  hero: {
    ctaHref: string;
    ctaLabel: string;
    description: string;
    eyebrow: string;
    title: string;
  };
  intro: {
    body: Array<{
      body: string;
      heading?: string;
    }>;
    cardBody: string;
    cardTitle: string;
    eyebrow: string;
    title: string;
  };
  pageType: WebsitePageType;
  sections: Array<{
    body: string;
    eyebrow?: string;
    title: string;
  }>;
  slug: string;
  status: 'draft' | 'published';
  title: string;
  visualCards: Array<{
    label: string;
    title: string;
    tone: VisualCardTone;
  }>;
};

export const defaultHomePage: WebsitePageContent = {
  changelog: {
    dateLabel: 'January 23, 2025',
    summary: 'Brankas 2.2 was released for use in the Simobi+ recolor project in 2025.',
    tags: ['App', 'UI', 'CMS', 'Web', 'Mobile'],
    title: 'Brankas 2.2',
  },
  hero: {
    ctaHref: '#what-is-brankas',
    ctaLabel: 'Get Started',
    description:
      'Brankas provides components and tools to help product teams work more efficiently, and to make Bank Sinarmas products more cohesive.',
    eyebrow: '',
    title: 'Brankas Design System',
  },
  intro: {
    body: [
      {
        heading: 'What is Brankas?',
        body: 'Brankas is the shared design library for Bank Sinarmas product teams. It brings tokens, desktop and mobile components, reusable patterns, documentation, and live previews into one importable system.',
      },
      {
        body: 'The library is built design-library-first: tokens and React components define the product language, then the website consumes those same package outputs for guidance, articles, and playground examples.',
      },
      {
        heading: 'Who manages Brankas?',
        body: 'Brankas is intended to be maintained by a collaborative group of designers, engineers, content designers, accessibility partners, and product teams. The site will support release notes and long-form guidance through CMS-managed content.',
      },
    ],
    cardBody:
      'Brankas Design System enables easier collaboration to make cohesive experiences and scalable products for Bank Sinarmas.',
    cardTitle: 'Brankas',
    eyebrow: 'Get Started',
    title: 'What is Brankas Design System?',
  },
  layout: 'docs-sidebar',
  pageType: 'home',
  sections: [],
  slug: 'home',
  status: 'published',
  title: 'Home',
  visualCards: [
    { title: 'Iconography', label: 'Aa', tone: 'orange' },
    { title: 'Illustration', label: 'VISA', tone: 'light' },
    { title: 'Photography', label: 'Photo', tone: 'green' },
    { title: 'Brand Guideline', label: 'bank sinarmas', tone: 'plain' },
  ],
};

type PayloadWebsitePage = {
  changelog?: {
    dateLabel?: string | null;
    summary?: string | null;
    tags?: Array<{ label?: string | null }> | null;
    title?: string | null;
  } | null;
  hero?: {
    ctaHref?: string | null;
    ctaLabel?: string | null;
    description?: string | null;
    eyebrow?: string | null;
    title?: string | null;
  } | null;
  intro?: {
    body?: Array<{
      body?: string | null;
      heading?: string | null;
    }> | null;
    cardBody?: string | null;
    cardTitle?: string | null;
    eyebrow?: string | null;
    title?: string | null;
  } | null;
  layout?: WebsitePageLayout | null;
  pageType?: WebsitePageType | null;
  sections?: Array<{
    body?: string | null;
    eyebrow?: string | null;
    title?: string | null;
  }> | null;
  slug?: string | null;
  status?: 'draft' | 'published' | null;
  title?: string | null;
  visualCards?: Array<{
    label?: string | null;
    title?: string | null;
    tone?: VisualCardTone | null;
  }> | null;
};

export async function getWebsitePage(slug: string): Promise<WebsitePageContent | null> {
  const normalizedSlug = normalizeWebsiteSlug(slug);

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'website-pages',
      limit: 1,
      where: {
        and: [
          {
            or: [
              {
                slug: {
                  equals: normalizedSlug,
                },
              },
              {
                slug: {
                  equals: `/${normalizedSlug}`,
                },
              },
            ],
          },
          {
            status: {
              equals: 'published',
            },
          },
        ],
      },
    });

    const [page] = result.docs;

    if (!page) {
      return null;
    }

    return normalizeWebsitePage(page as PayloadWebsitePage);
  } catch {
    return null;
  }
}

export function normalizeWebsitePage(page: PayloadWebsitePage): WebsitePageContent {
  const normalizedSlug = normalizeWebsiteSlug(page.slug ?? '');
  const base = normalizedSlug === 'home' ? defaultHomePage : createGenericFallback(normalizedSlug);

  return {
    changelog: {
      dateLabel: page.changelog?.dateLabel ?? base.changelog.dateLabel,
      summary: page.changelog?.summary ?? base.changelog.summary,
      tags:
        page.changelog?.tags?.map((tag) => tag.label ?? '').filter(Boolean) ?? base.changelog.tags,
      title: page.changelog?.title ?? base.changelog.title,
    },
    layout: page.layout ?? base.layout,
    hero: {
      ctaHref: page.hero?.ctaHref ?? base.hero.ctaHref,
      ctaLabel: page.hero?.ctaLabel ?? base.hero.ctaLabel,
      description: page.hero?.description ?? base.hero.description,
      eyebrow: page.hero?.eyebrow ?? base.hero.eyebrow,
      title: page.hero?.title ?? page.title ?? base.hero.title,
    },
    intro: {
      body:
        page.intro?.body
          ?.map((item) => ({
            ...(item.heading ? { heading: item.heading } : {}),
            body: item.body ?? '',
          }))
          .filter((item) => item.body) ?? base.intro.body,
      cardBody: page.intro?.cardBody ?? base.intro.cardBody,
      cardTitle: page.intro?.cardTitle ?? base.intro.cardTitle,
      eyebrow: page.intro?.eyebrow ?? base.intro.eyebrow,
      title: page.intro?.title ?? base.intro.title,
    },
    pageType: page.pageType ?? base.pageType,
    sections:
      page.sections
        ?.map((section) => ({
          ...(section.eyebrow ? { eyebrow: section.eyebrow } : {}),
          body: section.body ?? '',
          title: section.title ?? '',
        }))
        .filter((section) => section.title && section.body) ?? base.sections,
    slug: normalizedSlug || base.slug,
    status: page.status ?? base.status,
    title: page.title ?? base.title,
    visualCards:
      page.visualCards
        ?.map((card) => ({
          label: card.label ?? '',
          title: card.title ?? '',
          tone: card.tone ?? 'plain',
        }))
        .filter((card) => card.label && card.title) ?? base.visualCards,
  };
}

function createGenericFallback(slug: string): WebsitePageContent {
  const title = titleFromSlug(slug);

  return {
    ...defaultHomePage,
    changelog: defaultHomePage.changelog,
    hero: {
      ctaHref: '/',
      ctaLabel: 'Back to documentation',
      description: '',
      eyebrow: 'Documentation',
      title,
    },
    intro: {
      body: [],
      cardBody: '',
      cardTitle: '',
      eyebrow: '',
      title: '',
    },
    pageType: 'generic',
    sections: [],
    slug,
    title,
    visualCards: [],
  };
}

export function normalizeWebsiteSlug(slug: string) {
  const trimmed = slug.trim();

  if (!trimmed || trimmed === '/') {
    return 'home';
  }

  return trimmed.replace(/^\/+/, '').replace(/\/+$/, '');
}

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}
