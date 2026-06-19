export type SiteNavigation = {
  brand: {
    brandName: string;
    homeHref: string;
    productName: string;
  };
  sidebarSections: Array<{
    items: Array<{
      href: string;
      label: string;
    }>;
    title: string;
  }>;
  topNav: Array<{
    href: string;
    label: string;
  }>;
};

export const defaultSiteNavigation: SiteNavigation = {
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
        { label: 'Design Principles', href: '/what-is-brankas#design-principles' },
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
      items: [
        { label: 'Accordion', href: '/components/accordion' },
        { label: 'Avatar', href: '/components/avatar' },
        { label: 'Badge', href: '/components/badge' },
        { label: 'Banner', href: '/components/banner' },
        { label: 'Breadcrumbs', href: '/components/breadcrumbs' },
        { label: 'Button', href: '/components/button' },
        { label: 'Carousel', href: '/components/carousel' },
        { label: 'Checkbox', href: '/components/checkbox' },
        { label: 'Chips', href: '/components/chips' },
        { label: 'Coachmark', href: '/components/coachmark' },
        { label: 'Date picker', href: '/components/date-picker' },
        { label: 'Dialog', href: '/components/dialog' },
        { label: 'Dropdown', href: '/components/dropdown' },
        { label: 'File upload', href: '/components/file-upload' },
        { label: 'Label / Status', href: '/components/label' },
        { label: 'Loader', href: '/components/loader' },
        { label: 'Pagination', href: '/components/pagination' },
        { label: 'Progress bar', href: '/components/progress' },
        { label: 'Progress indicator', href: '/components/progress-indicator' },
        { label: 'Radio button', href: '/components/radio' },
        { label: 'Search', href: '/components/search' },
        { label: 'Sidebar', href: '/components/sidebar' },
        { label: 'Select', href: '/components/select' },
        { label: 'Skeleton', href: '/components/skeleton' },
        { label: 'Table', href: '/components/table' },
        { label: 'Tabs', href: '/components/tabs' },
        { label: 'Text area', href: '/components/text-area' },
        { label: 'Text field', href: '/components/text-field' },
        { label: 'Toast', href: '/components/toast' },
        { label: 'Toggle', href: '/components/toggle' },
        { label: 'Tooltip', href: '/components/tooltip' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Token reference', href: '/tokens' },
        { label: 'Pattern guidance', href: '/patterns' },
        { label: 'Playground', href: '/playground' },
        { label: 'Releases', href: '/change-log' },
      ],
    },
  ],
  topNav: [
    { label: 'Documentation', href: '/' },
    { label: 'Playground', href: '/playground' },
    { label: 'Storybook', href: 'http://localhost:6006' },
    { label: 'Changelog', href: '/change-log' },
  ],
};

export type PayloadSiteNavigation = {
  brand?: {
    brandName?: string | null;
    homeHref?: string | null;
    productName?: string | null;
  } | null;
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

export function normalizeSiteNavigation(navigation: PayloadSiteNavigation): SiteNavigation {
  const topNav = normalizeItems(navigation.topNav);
  const sidebarSections =
    navigation.sidebarSections
      ?.map((section) => ({
        items: normalizeItems(section.items),
        title: section.title ?? '',
      }))
      .filter((section) => section.title && section.items.length > 0) ??
    defaultSiteNavigation.sidebarSections;

  return {
    brand: {
      brandName: navigation.brand?.brandName ?? defaultSiteNavigation.brand.brandName,
      homeHref: navigation.brand?.homeHref ?? defaultSiteNavigation.brand.homeHref,
      productName: navigation.brand?.productName ?? defaultSiteNavigation.brand.productName,
    },
    sidebarSections:
      sidebarSections.length > 0 ? sidebarSections : defaultSiteNavigation.sidebarSections,
    topNav: topNav.length > 0 ? topNav : defaultSiteNavigation.topNav,
  };
}

function normalizeItems(
  items:
    | Array<{
        href?: string | null;
        label?: string | null;
      }>
    | null
    | undefined,
) {
  return (
    items
      ?.map((item) => ({
        href: item.href ?? '',
        label: item.label ?? '',
      }))
      .filter((item) => item.href && item.label) ?? []
  );
}
