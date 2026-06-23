import type { GlobalConfig } from 'payload';

export const General: GlobalConfig = {
  slug: 'general',
  label: 'General',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Navbar',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Logo image shown in the navbar. Replaces the default “B” mark when set.',
          },
        },
        {
          name: 'brandName',
          type: 'text',
          defaultValue: 'Brankas',
          admin: {
            description: 'Bold brand title in the navbar.',
          },
        },
        {
          name: 'productName',
          type: 'text',
          defaultValue: 'Bank Sinarmas Design System',
          admin: {
            description: 'Lighter product name shown next to the brand in the navbar.',
          },
        },
      ],
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Website icon shown in the browser tab (favicon).',
      },
    },
    {
      name: 'home',
      type: 'group',
      label: 'Home hero',
      admin: {
        description: 'The large hero at the top of the home page.',
      },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          defaultValue: 'Brankas Design System',
        },
        {
          name: 'heroDescription',
          type: 'textarea',
        },
        {
          name: 'heroCtaLabel',
          type: 'text',
          defaultValue: 'Get Started',
        },
        {
          name: 'heroCtaHref',
          type: 'text',
          defaultValue: '/what-is-brankas',
        },
      ],
    },
  ],
};
