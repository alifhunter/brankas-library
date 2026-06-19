import type { GlobalConfig } from 'payload';

export const SiteNavigation: GlobalConfig = {
  slug: 'site-navigation',
  admin: {
    group: 'Website',
  },
  fields: [
    {
      name: 'brand',
      type: 'group',
      fields: [
        {
          name: 'homeHref',
          type: 'text',
          defaultValue: '/',
          required: true,
        },
        {
          name: 'brandName',
          type: 'text',
          defaultValue: 'Brankas',
          required: true,
        },
        {
          name: 'productName',
          type: 'text',
          defaultValue: 'Bank Sinarmas Design System',
          required: true,
        },
      ],
    },
    {
      name: 'topNav',
      type: 'array',
      admin: {
        description: 'Main navbar links shown in the top header.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sidebarSections',
      type: 'array',
      admin: {
        description: 'Sidebar groups and links shown in the documentation shell.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
          required: true,
        },
      ],
    },
  ],
};
