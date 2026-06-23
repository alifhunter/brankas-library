import type { Payload } from 'payload';

import { getMergedComponentDocs } from '../app/(frontend)/library-data';
import { resolveStorybookUrl } from '../lib/site-navigation-data';

const seedUsername = 'brankas';
const seedPassword = 'brankas';
// Seeded value; the navbar re-resolves this per environment at render time
// (see applyStorybookUrl), so this only needs to be a sensible default.
const seedStorybookUrl = resolveStorybookUrl() ?? 'http://localhost:6006';
type SeedWebsitePage = {
  changelog?: {
    dateLabel: string;
    summary: string;
    tags: Array<{ label: string }>;
    title: string;
  };
  hero: {
    description: string;
    eyebrow: string;
    title: string;
  };
  layout: 'docs-sidebar' | 'no-sidebar';
  pageType: 'changelog' | 'patterns' | 'tokens';
  sections: Array<{
    body: string;
    eyebrow?: string;
    title: string;
  }>;
  slug: string;
  status: 'published';
  title: string;
};
const defaultSiteNavigation = {
  brand: {
    brandName: 'Brankas',
    homeHref: '/',
    productName: 'Bank Sinarmas Design System',
  },
  sidebarSections: [
    {
      title: 'Get Started',
      items: [
        { label: 'What is Brankas Design System?', href: '/what-is-brankas' },
        { label: 'Design Principles', href: '/design-principles' },
      ],
    },
    {
      title: 'Foundation',
      items: [
        { label: 'Color', href: '/foundation/color' },
        { label: 'Typography', href: '/foundation/typography' },
        { label: 'Spacing', href: '/foundation/spacing' },
        { label: 'Radius', href: '/foundation/radius' },
        { label: 'Elevation', href: '/foundation/elevation' },
        { label: 'Content', href: '/foundation/content' },
        { label: 'Iconography', href: '/foundation/iconography' },
        { label: 'Illustration', href: '/foundation/illustration' },
        { label: 'Breakpoints', href: '/foundation/breakpoints' },
      ],
    },
    {
      title: 'Components',
      items: getMergedComponentDocs().map((doc) => ({
        label: doc.name,
        href: `/components/${doc.slug}`,
      })),
    },
    {
      title: 'Resources',
      items: [
        { label: 'Token reference', href: '/tokens' },
        { label: 'Pattern guidance', href: '/patterns' },
        { label: 'Playground', href: '/playground' },
        { label: 'Articles', href: '/articles' },
        { label: 'Releases', href: '/change-log' },
      ],
    },
  ],
  topNav: [
    { label: 'Documentation', href: '/' },
    { label: 'Playground', href: '/playground' },
    { label: 'Articles', href: '/articles' },
    { label: 'Storybook', href: seedStorybookUrl },
    { label: 'Changelog', href: '/change-log' },
  ],
};

export async function seedAdminUser(payload: Payload): Promise<void> {
  if (process.env.PAYLOAD_SEED_ADMIN !== 'false') {
    await seedUser(payload);
  }

  if (process.env.PAYLOAD_SEED_CONTENT === 'false') {
    return;
  }

  await seedHomePage(payload);
  await seedStandardWebsitePages(payload);
  await seedEditorialPages(payload);
  await seedReleases(payload);
  await seedArticles(payload);
  await seedComponentPages(payload);
  await seedFoundations(payload);
  await seedSiteNavigation(payload);
}

const starterFoundations: Array<{
  description: string;
  name: string;
  sections: Array<{ body: string; title: string }>;
  slug: string;
  tokenReferences?: Array<{ name: string; value?: string }>;
}> = [
  {
    description:
      'Color carries product meaning, brand identity, and accessibility intent across every Brankas surface.',
    name: 'Color',
    sections: [
      {
        title: 'How color is structured',
        body: 'Color tokens are layered: primitive palettes ship raw values, semantic tokens bind those primitives to roles like background, text, and border, and component tokens wire semantics to specific UI behavior.',
      },
      {
        title: 'Using color in product',
        body: 'Reach for semantic tokens (color.text.default, color.background.error) instead of primitives. Semantic tokens travel with the system and update automatically when a brand decision changes.',
      },
    ],
    slug: 'color',
  },
  {
    description:
      'Typography establishes a readable hierarchy and a consistent voice for Bank Sinarmas product copy. Brankas ships separate semantic ramps for desktop and mobile so layouts stay legible on every surface.',
    name: 'Typography',
    sections: [
      {
        title: 'Type ramp',
        body: 'Use the documented body, label, and heading sizes from typography.desktop and typography.mobile rather than ad-hoc values. Scales are tuned for the platforms they target and compose with the spacing tokens.',
      },
      {
        title: 'Heading scale',
        body: 'Headings (h1–h5) carry weight and intent. Reach for them when a section starts a new task, not for visual emphasis inside an existing block.',
      },
      {
        title: 'Body and label',
        body: 'Body sizes (sm/md/lg) handle prose, table cells, and helper copy. Labels stay one step smaller than body so input affordances feel deliberate.',
      },
      {
        title: 'Voice and tone',
        body: 'Lead with clarity. Brankas copy should sound like a trusted teammate explaining a process, not a marketing brochure. Avoid jargon that doesn’t appear in the product itself.',
      },
    ],
    slug: 'typography',
    tokenReferences: [
      { name: 'typography.desktop.heading.h1.semibold', value: '32px / 32px · 600' },
      { name: 'typography.desktop.heading.h3.semibold', value: '24px / 24px · 600' },
      { name: 'typography.desktop.body-lg-medium', value: '16px / 24px · 500' },
      { name: 'typography.desktop.body-md-regular', value: '14px / 22px · 400' },
      { name: 'typography.desktop.label-sm-medium', value: '12px / 16px · 500' },
      { name: 'typography.mobile.heading.h1.semibold', value: 'mobile h1' },
      { name: 'typography.mobile.body-md-regular', value: 'mobile body md' },
    ],
  },
  {
    description:
      'Spacing tokens define the rhythm between elements so layouts feel deliberate at every density.',
    name: 'Spacing',
    sections: [
      {
        title: 'Spacing ramp',
        body: 'A 4px base ramp drives spacing across components and patterns. Compose tokens (spacing.sm, spacing.md) instead of arbitrary px values.',
      },
      {
        title: 'When to break the grid',
        body: 'Component-internal spacing can deviate when it serves clarity, but page-level rhythm should always pull from the canonical ramp.',
      },
    ],
    slug: 'spacing',
  },
  {
    description:
      'Radius tokens shape the softness of containers, controls, and surfaces across the system.',
    name: 'Radius',
    sections: [
      {
        title: 'How radius is graded',
        body: 'Radius scales from sharp utility surfaces to friendly hero containers. Use radius.sm for inputs, radius.md for cards, and radius.lg for marketing surfaces.',
      },
    ],
    slug: 'radius',
  },
  {
    description:
      'Elevation expresses hierarchy through shadow and surface stacking, not arbitrary z-index choices.',
    name: 'Elevation',
    sections: [
      {
        title: 'Elevation principles',
        body: 'Elevation should describe relationships, not decoration. Use a higher elevation for transient overlays (dialogs, toasts) and reserve lower elevations for grouped content.',
      },
    ],
    slug: 'elevation',
  },
  {
    description:
      'Content guidance defines the product language used across Brankas experiences — labels, helper text, status messages, and release notes.',
    name: 'Content',
    sections: [
      {
        title: 'Voice principles',
        body: 'Be clear, concise, and action-oriented. Speak in the second person and avoid jargon that does not appear in the product itself.',
      },
      {
        title: 'Common patterns',
        body: 'Mirror real product flows when writing example copy. Generic placeholders make it hard for engineers to translate guidance into shipped UI.',
      },
    ],
    slug: 'content',
  },
  {
    description:
      'Iconography keeps visual cues recognizable and consistent across product surfaces and platforms.',
    name: 'Iconography',
    sections: [
      {
        title: 'Icon style',
        body: 'Icons share a stroke weight and corner radius drawn from the same drafting grid. Pull from the Brankas icon library rather than mixing third-party sets.',
      },
    ],
    slug: 'iconography',
  },
  {
    description:
      'Illustration adds personality to empty states, marketing surfaces, and onboarding moments without overwhelming the product.',
    name: 'Illustration',
    sections: [
      {
        title: 'When to illustrate',
        body: 'Reach for illustration when the surface needs warmth or context that a screenshot or icon cannot deliver. Keep ratios consistent with the documented usage pages.',
      },
    ],
    slug: 'illustration',
  },
  {
    description:
      'Breakpoints define the supported device classes for desktop and mobile layouts in the design library.',
    name: 'Breakpoints',
    sections: [
      {
        title: 'Supported breakpoints',
        body: 'Layouts adapt at the documented sm, md, l, and xl breakpoints. Components ship responsive defaults so most product code can rely on them without bespoke media queries.',
      },
    ],
    slug: 'breakpoints',
  },
];

function lexicalParagraph(text: string) {
  return {
    children: [lexicalText(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'paragraph',
    version: 1,
  };
}

/**
 * Converts the code-owned title/body sections into a single Lexical document
 * (heading + paragraph per section) so the new foundation editor opens
 * pre-filled instead of blank.
 */
function createLexicalFromSections(sections: Array<{ body: string; title: string }>) {
  const children: Array<{ [key: string]: unknown; type: string; version: number }> = [];
  for (const section of sections) {
    if (section.title) {
      children.push(lexicalHeading(section.title));
    }
    if (section.body) {
      children.push(lexicalParagraph(section.body));
    }
  }

  if (children.length === 0) {
    return createLexicalContent('');
  }

  return {
    root: {
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}

async function seedFoundations(payload: Payload): Promise<void> {
  const existing = await payload.find({
    collection: 'foundations',
    depth: 0,
    limit: 100,
  });
  const existingBySlug = new Map(existing.docs.map((doc) => [doc.slug, doc]));

  for (const f of starterFoundations) {
    const data = {
      content: createLexicalFromSections(f.sections),
      description: f.description,
      eyebrow: 'Foundation',
      name: f.name,
      publishedAt: new Date().toISOString(),
      slug: f.slug,
      status: 'published' as const,
      ...(f.tokenReferences ? { tokenReferences: f.tokenReferences } : {}),
    };

    const doc = existingBySlug.get(f.slug);
    if (doc) {
      await payload.update({ collection: 'foundations', id: doc.id, data });
    } else {
      await payload.create({ collection: 'foundations', data });
    }
  }
}

async function seedUser(payload: Payload): Promise<void> {
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
    where: {
      username: {
        equals: seedUsername,
      },
    },
  });

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        name: 'Brankas Admin',
        password: seedPassword,
        role: 'admin',
        username: seedUsername,
      },
    });
  }
}

const editorialPages: Array<{
  intro: {
    body: Array<{ body: string; heading?: string }>;
    cardBody: string;
    cardTitle: string;
    eyebrow: string;
    title: string;
  };
  slug: string;
  title: string;
}> = [
  {
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
          body: 'Brankas is maintained by a collaborative group of designers, engineers, content designers, accessibility partners, and product teams. Release notes and long-form guidance are managed through the CMS.',
        },
        {
          heading: 'Content',
          body: 'Content guidance covers the product language used across Brankas experiences — labels, help text, status messages, empty states, and release notes. Keep writing clear, concise, and action-oriented.',
        },
      ],
      cardBody:
        'Brankas Design System enables easier collaboration to make cohesive experiences and scalable products for Bank Sinarmas.',
      cardTitle: 'Brankas',
      eyebrow: 'Get Started',
      title: 'What is Brankas Design System?',
    },
    slug: 'what-is-brankas',
    title: 'What is Brankas Design System?',
  },
  {
    intro: {
      body: [
        {
          heading: 'Token-first',
          body: 'Build from design tokens, never hard-coded values. Tokens carry brand, theme, and accessibility decisions, so a single change propagates across every surface that consumes the library.',
        },
        {
          heading: 'Consume the library',
          body: 'Product surfaces and this website consume the same @brankas packages. There is no parallel, website-only design system — the library is the single source of truth.',
        },
        {
          heading: 'Accessible by default',
          body: 'Components ship with sensible keyboard behavior, focus states, and semantics. Accessibility is a baseline expectation for every interactive component, not an afterthought.',
        },
        {
          heading: 'Desktop and mobile parity',
          body: 'Desktop and mobile share primitive and semantic tokens. Platform-specific behavior is intentional and documented, never accidental drift between the two.',
        },
        {
          heading: 'Consistency over novelty',
          body: 'Reach for the closest existing component or pattern before inventing a new one. Predictable, familiar interfaces serve users better than clever one-offs.',
        },
      ],
      cardBody: '',
      cardTitle: '',
      eyebrow: 'Get Started',
      title: 'Design Principles',
    },
    slug: 'design-principles',
    title: 'Design Principles',
  },
];

async function seedEditorialPages(payload: Payload): Promise<void> {
  for (const page of editorialPages) {
    const content = createLexicalFromSections(
      page.intro.body.map((section) => ({ body: section.body, title: section.heading ?? '' })),
    );

    const existing = await payload.find({
      collection: 'website-pages',
      depth: 0,
      limit: 1,
      where: { slug: { equals: page.slug } },
    });

    const doc = existing.docs[0];
    if (doc) {
      await payload.update({
        collection: 'website-pages',
        id: doc.id,
        data: { content, title: page.title },
      });
    } else {
      await payload.create({
        collection: 'website-pages',
        data: {
          content,
          hero: { title: page.title },
          layout: 'docs-sidebar',
          pageType: 'custom',
          slug: page.slug,
          status: 'published',
          title: page.title,
        },
      });
    }
  }
}

async function seedHomePage(payload: Payload): Promise<void> {
  const existingHomePage = await payload.find({
    collection: 'website-pages',
    limit: 1,
    where: {
      slug: {
        equals: 'home',
      },
    },
  });

  if (existingHomePage.totalDocs > 0) {
    return;
  }

  await payload.create({
    collection: 'website-pages',
    data: {
      changelog: {
        dateLabel: 'January 23, 2025',
        summary: 'Brankas 2.2 was released for use in the Simobi+ recolor project in 2025.',
        tags: [
          { label: 'App' },
          { label: 'UI' },
          { label: 'CMS' },
          { label: 'Web' },
          { label: 'Mobile' },
        ],
        title: 'Brankas 2.2',
      },
      hero: {
        ctaHref: '#what-is-brankas',
        ctaLabel: 'Get Started',
        description:
          'Brankas provides components and tools to help product teams work more efficiently, and to make Bank Sinarmas products more cohesive.',
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
      publishedAt: new Date().toISOString(),
      slug: 'home',
      status: 'published',
      title: 'Home',
      visualCards: [
        { label: 'Aa', title: 'Iconography', tone: 'orange' },
        { label: 'VISA', title: 'Illustration', tone: 'light' },
        { label: 'Photo', title: 'Photography', tone: 'green' },
        { label: 'bank sinarmas', title: 'Brand Guideline', tone: 'plain' },
      ],
    },
  });
}

async function seedStandardWebsitePages(payload: Payload): Promise<void> {
  const existingPages = await payload.find({
    collection: 'website-pages',
    depth: 0,
    limit: 100,
  });
  const existingSlugs = new Set(existingPages.docs.map((page) => normalizeSeedSlug(page.slug)));
  const standardPages: SeedWebsitePage[] = [
    {
      hero: {
        description:
          'Canonical token JSON is generated into CSS variables and TypeScript exports for product teams and the preview website.',
        eyebrow: 'Foundation',
        title: 'Tokens',
      },
      layout: 'docs-sidebar',
      pageType: 'tokens',
      sections: [
        {
          body: 'Token source files remain canonical in packages/tokens/source and are surfaced here for documentation, usage guidance, and implementation references.',
          eyebrow: 'CMS-backed page',
          title: 'How this page is managed',
        },
      ],
      slug: 'tokens',
      status: 'published',
      title: 'Tokens',
    },
    {
      hero: {
        description:
          'Patterns combine Brankas components into reusable product workflows and document when each composition should be used.',
        eyebrow: 'Compositions',
        title: 'Patterns',
      },
      layout: 'docs-sidebar',
      pageType: 'patterns',
      sections: [
        {
          body: 'The CMS owns this page introduction and supplemental guidance. Live examples continue to render from @brankas/patterns/desktop.',
          eyebrow: 'CMS-backed page',
          title: 'How this page is managed',
        },
      ],
      slug: 'patterns',
      status: 'published',
      title: 'Patterns',
    },
    {
      changelog: {
        dateLabel: 'January 23, 2025',
        summary: 'Brankas 2.2 was released for use in the Simobi+ recolor project in 2025.',
        tags: [
          { label: 'App' },
          { label: 'UI' },
          { label: 'CMS' },
          { label: 'Web' },
          { label: 'Mobile' },
        ],
        title: 'Brankas 2.2',
      },
      hero: {
        description: 'See the latest feature releases, product improvements, and bug fixes.',
        eyebrow: 'Releases',
        title: 'Changelog',
      },
      layout: 'no-sidebar',
      pageType: 'changelog',
      sections: [
        {
          body: 'Use this page for release notes and product-facing design system updates.',
          title: 'Release notes',
        },
      ],
      slug: 'change-log',
      status: 'published',
      title: 'Changelog',
    },
  ];

  await Promise.all(
    standardPages
      .filter((page) => !existingSlugs.has(normalizeSeedSlug(page.slug)))
      .map((page) =>
        payload.create({
          collection: 'website-pages',
          data: {
            ...page,
            publishedAt: new Date().toISOString(),
          },
        }),
      ),
  );

  await repairStandardWebsitePages(payload);
}

async function repairStandardWebsitePages(payload: Payload): Promise<void> {
  const changelogPages = await payload.find({
    collection: 'website-pages',
    depth: 0,
    limit: 10,
    where: {
      or: [{ slug: { equals: 'change-log' } }, { slug: { equals: '/change-log' } }],
    },
  });

  await Promise.all(
    changelogPages.docs.map((page) =>
      payload.update({
        collection: 'website-pages',
        id: page.id,
        data: {
          layout: 'no-sidebar',
          pageType: 'changelog',
          slug: 'change-log',
        },
      }),
    ),
  );
}

type GuideDetail = {
  accessibility: string[];
  anatomy: string[];
  description: string;
  usage: string[];
};

function lexicalText(text: string) {
  return { detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 };
}

function lexicalHeading(text: string) {
  return {
    children: [lexicalText(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    tag: 'h3' as const,
    type: 'heading',
    version: 1,
  };
}

function lexicalList(items: string[]) {
  return {
    children: items.map((item, index) => ({
      children: [lexicalText(item)],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'listitem',
      value: index + 1,
      version: 1,
    })),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    listType: 'bullet' as const,
    start: 1,
    tag: 'ul' as const,
    type: 'list',
    version: 1,
  };
}

/**
 * Converts the code-owned anatomy/usage/accessibility lists into a single
 * Lexical rich-text document (heading + bullet list per section) so the new
 * per-platform editor opens pre-filled instead of blank.
 */
function createLexicalGuide(detail: GuideDetail) {
  const children: Array<{ [key: string]: unknown; type: string; version: number }> = [];
  const addSection = (title: string, items: string[]) => {
    if (items.length > 0) {
      children.push(lexicalHeading(title));
      children.push(lexicalList(items));
    }
  };

  addSection('Anatomy', detail.anatomy);
  addSection('Usage', detail.usage);
  addSection('Accessibility', detail.accessibility);

  if (children.length === 0) {
    return createLexicalContent(detail.description);
  }

  return {
    root: {
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}

async function seedComponentPages(payload: Payload): Promise<void> {
  const merged = getMergedComponentDocs();
  const canonicalSlugs = new Set(merged.map((doc) => doc.slug));

  const existingPages = await payload.find({
    collection: 'component-pages',
    depth: 0,
    limit: 300,
  });
  const bySlug = new Map(existingPages.docs.map((page) => [page.slug, page]));

  for (const doc of merged) {
    const platform: 'Desktop' | 'Mobile' = doc.desktop ? 'Desktop' : 'Mobile';
    const detail = doc.desktop ?? doc.mobile;
    if (!detail) {
      continue;
    }

    const data = {
      componentStatus: detail.status,
      description: detail.description,
      desktopContent: doc.desktop ? createLexicalGuide(doc.desktop) : null,
      importName: detail.importName,
      mobileContent: doc.mobile ? createLexicalGuide(doc.mobile) : null,
      name: doc.name,
      packageName: detail.packageName,
      platform,
      publishedAt: new Date().toISOString(),
      slug: doc.slug,
      status: 'published' as const,
    };

    const existing = bySlug.get(doc.slug);
    if (existing) {
      await payload.update({ collection: 'component-pages', id: existing.id, data });
    } else {
      await payload.create({ collection: 'component-pages', data });
    }
  }

  // Remove legacy pages keyed by non-canonical slugs (e.g. mobile- prefixed),
  // which are superseded by the canonical per-platform pages above.
  for (const page of existingPages.docs) {
    if (page.slug && !canonicalSlugs.has(page.slug)) {
      await payload.delete({ collection: 'component-pages', id: page.id });
    }
  }
}

async function seedReleases(payload: Payload): Promise<void> {
  const existingReleases = await payload.find({
    collection: 'releases',
    depth: 0,
    limit: 100,
  });
  const existingSlugs = new Set(
    existingReleases.docs.map((release) => normalizeSeedSlug(release.slug ?? release.version)),
  );
  const starterReleases = [
    {
      releaseDate: '2025-01-23T00:00:00.000Z',
      slug: 'brankas-2-2',
      summary: 'Brankas 2.2 was released for use in the Simobi+ recolor project in 2025.',
      tags: [
        { label: 'App' },
        { label: 'UI' },
        { label: 'CMS' },
        { label: 'Web' },
        { label: 'Mobile' },
      ],
      title: 'Brankas 2.2 release notes',
      version: 'Brankas 2.2',
    },
    {
      releaseDate: '2024-01-15T00:00:00.000Z',
      slug: 'brankas-2-1',
      summary: 'Brankas 2.1 was released for use in the Simobi+ recolor project in 2024.',
      tags: [{ label: 'Mobile' }, { label: 'UI' }, { label: 'App' }],
      title: 'Brankas 2.1 release notes',
      version: 'Brankas 2.1',
    },
  ];

  await Promise.all(
    starterReleases
      .filter((release) => !existingSlugs.has(release.slug))
      .map((release) =>
        payload.create({
          collection: 'releases',
          data: {
            ...release,
            content: createLexicalContent(release.summary),
            status: 'published',
          },
        }),
      ),
  );

  await Promise.all(
    existingReleases.docs
      .filter((release) => !release.slug)
      .map((release) =>
        payload.update({
          collection: 'releases',
          id: release.id,
          data: {
            slug: normalizeSeedSlug(release.version),
          },
        }),
      ),
  );
}

async function seedArticles(payload: Payload): Promise<void> {
  const existingArticles = await payload.find({
    collection: 'articles',
    depth: 0,
    limit: 100,
  });
  const existingSlugs = new Set(
    existingArticles.docs.map((article) => normalizeSeedSlug(article.slug ?? article.title)),
  );
  const starterArticles = [
    {
      category: 'guideline' as const,
      content:
        'Brankas components and patterns are built to be composed. Start from the design tokens, reach for the closest existing pattern, and only drop to raw components when a layout genuinely has no precedent. This keeps product surfaces consistent and makes future theming changes propagate automatically.',
      excerpt: 'How to compose Brankas tokens, components, and patterns without drifting from the system.',
      publishedAt: '2026-05-01T00:00:00.000Z',
      slug: 'composing-with-brankas',
      title: 'Composing interfaces with Brankas',
    },
    {
      category: 'announcement' as const,
      content:
        'The Brankas design system website is now live, backed by a self-hosted Payload CMS. Editorial content — guidelines, foundations, and release notes — is authored in the CMS while component previews stay package-backed from @brankas/react. Images embedded in rich text are uploaded to Vercel Blob.',
      excerpt: 'The Brankas design system site and CMS are live, with package-backed previews and CMS-authored content.',
      publishedAt: '2026-06-19T00:00:00.000Z',
      slug: 'brankas-library-is-live',
      title: 'Brankas Library is live',
    },
  ];

  await Promise.all(
    starterArticles
      .filter((article) => !existingSlugs.has(article.slug))
      .map((article) =>
        payload.create({
          collection: 'articles',
          data: {
            category: article.category,
            content: createLexicalContent(article.content),
            excerpt: article.excerpt,
            publishedAt: article.publishedAt,
            slug: article.slug,
            status: 'published',
            title: article.title,
          },
        }),
      ),
  );
}

async function seedSiteNavigation(payload: Payload): Promise<void> {
  const existingNavigation = (await payload.findGlobal({
    slug: 'site-navigation',
  })) as {
    brand?: unknown;
    sidebarSections?: Array<{
      items?: Array<{
        href?: string | null;
        label?: string | null;
      }> | null;
      title?: string | null;
    }> | null;
    topNav?: Array<{
      href?: string | null;
      label?: string | null;
    }> | null;
  };

  if (existingNavigation.topNav?.length || existingNavigation.sidebarSections?.length) {
    const topNav =
      existingNavigation.topNav
        ?.map((item) => ({
          href: repairNavigationHref(item.label, item.href),
          label: item.label ?? '',
        }))
        .filter((item) => item.href && item.label) ?? [];
    if (!topNav.some((item) => item.label === 'Playground')) {
      const insertAt = topNav.findIndex((item) => item.label === 'Changelog');
      const playground = { href: '/playground', label: 'Playground' };
      if (insertAt >= 0) {
        topNav.splice(insertAt, 0, playground);
      } else {
        topNav.push(playground);
      }
    }
    if (!topNav.some((item) => item.label === 'Storybook')) {
      const insertAt = topNav.findIndex((item) => item.label === 'Changelog');
      const storybook = { href: seedStorybookUrl, label: 'Storybook' };
      if (insertAt >= 0) {
        topNav.splice(insertAt, 0, storybook);
      } else {
        topNav.push(storybook);
      }
    }
    const mergedComponentItems = getMergedComponentDocs().map((doc) => ({
      href: `/components/${doc.slug}`,
      label: doc.name,
    }));

    // Always overwrite the Components section with the canonical merged list
    // and drop any legacy "Mobile components" section, so the sidebar is
    // deterministic across seed runs.
    const sidebarSections =
      existingNavigation.sidebarSections
        ?.filter((section) => section.title !== 'Mobile components')
        .map((section) => {
          if (section.title === 'Components') {
            return {
              items: mergedComponentItems,
              title: section.title ?? '',
            };
          }
          return {
            items:
              section.items
                ?.map((item) => ({
                  href: repairNavigationHref(item.label, item.href) ?? '',
                  label: item.label ?? '',
                }))
                .filter((item) => item.href && item.label) ?? [],
            title: section.title ?? '',
          };
        }) ?? [];

    await payload.updateGlobal({
      slug: 'site-navigation',
      data: {
        sidebarSections,
        topNav,
      },
    });

    return;
  }

  await payload.updateGlobal({
    slug: 'site-navigation',
    data: defaultSiteNavigation,
  });
}

const foundationLabelToSlug: Record<string, string> = {
  Color: 'color',
  Typography: 'typography',
  Spacing: 'spacing',
  Radius: 'radius',
  Elevation: 'elevation',
  Content: 'content',
  Iconography: 'iconography',
  Illustration: 'illustration',
  Breakpoints: 'breakpoints',
};

function repairNavigationHref(label: string | null | undefined, href: string | null | undefined) {
  if (
    label &&
    foundationLabelToSlug[label] &&
    (href?.startsWith('/tokens') ||
      href === '/what-is-brankas#content' ||
      href === '/#foundation' ||
      href === '/#content')
  ) {
    return `/foundation/${foundationLabelToSlug[label]}`;
  }

  if (label === 'What is Brankas Design System?' && href === '/#what-is-brankas') {
    return '/what-is-brankas';
  }

  if (
    label === 'Design Principles' &&
    (href === '/#foundation' || href === '/what-is-brankas#design-principles')
  ) {
    return '/design-principles';
  }

  if (
    label === 'Documentation' &&
    (href === '/#what-is-brankas' || href === '/what-is-brankas')
  ) {
    return '/';
  }

  if ((label === 'Changelog' || label === 'Releases') && href === '/#changelog') {
    return '/change-log';
  }

  return href ?? '';
}

function mergeSidebarItems(
  current:
    | Array<{
        href?: string | null;
        label?: string | null;
      }>
    | null
    | undefined,
  additions: Array<{
    href: string;
    label: string;
  }>,
) {
  const items = current ?? [];
  const existingHrefs = new Set(items.map((item) => item.href).filter(Boolean));

  return [...items, ...additions.filter((item) => !existingHrefs.has(item.href))];
}

function normalizeSeedSlug(slug: string | null | undefined) {
  const value = (slug ?? '').trim();

  if (!value || value === '/') {
    return 'home';
  }

  return value.replace(/^\/+/, '').replace(/\/+$/, '');
}

function createLexicalContent(text: string) {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}
