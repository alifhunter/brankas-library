import type { CollectionConfig } from 'payload';

export const WebsitePages: CollectionConfig = {
  slug: 'website-pages',
  admin: {
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Website',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description:
          'Use "home" for the website home page. Other slugs render at /[slug]. Do not include a leading slash.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'select',
      admin: {
        description: 'Choose whether this website page uses the documentation sidebar.',
      },
      defaultValue: 'docs-sidebar',
      options: [
        {
          label: 'Documentation sidebar',
          value: 'docs-sidebar',
        },
        {
          label: 'No sidebar',
          value: 'no-sidebar',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      required: true,
    },
    {
      name: 'pageType',
      type: 'select',
      defaultValue: 'generic',
      options: [
        {
          label: 'Home',
          value: 'home',
        },
        {
          label: 'Generic',
          value: 'generic',
        },
        {
          label: 'Tokens',
          value: 'tokens',
        },
        {
          label: 'Patterns',
          value: 'patterns',
        },
        {
          label: 'Changelog',
          value: 'changelog',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
      required: true,
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'ctaLabel',
          type: 'text',
        },
        {
          name: 'ctaHref',
          type: 'text',
        },
      ],
    },
    {
      name: 'visualCards',
      type: 'array',
      admin: {
        description: 'Cards shown in the foundational visual styles section on the home page.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'tone',
          type: 'select',
          defaultValue: 'plain',
          options: [
            {
              label: 'Orange',
              value: 'orange',
            },
            {
              label: 'Light',
              value: 'light',
            },
            {
              label: 'Green',
              value: 'green',
            },
            {
              label: 'Plain',
              value: 'plain',
            },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'intro',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'cardTitle',
          type: 'text',
        },
        {
          name: 'cardBody',
          type: 'textarea',
        },
        {
          name: 'body',
          type: 'array',
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'body',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      admin: {
        description: 'Generic page body sections rendered on /[slug] pages.',
      },
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'changelog',
      type: 'group',
      fields: [
        {
          name: 'dateLabel',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'summary',
          type: 'textarea',
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
  ],
  versions: {
    drafts: true,
  },
};
