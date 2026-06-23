import type { CollectionConfig } from 'payload';

export const ComponentPages: CollectionConfig = {
  slug: 'component-pages',
  admin: {
    defaultColumns: ['name', 'slug', 'platform', 'componentStatus', 'status', 'updatedAt'],
    group: 'Website',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'URL segment used by /components/[slug], for example accordion.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
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
      name: 'componentStatus',
      type: 'select',
      defaultValue: 'Ready',
      options: [
        {
          label: 'Draft',
          value: 'Draft',
        },
        {
          label: 'Ready',
          value: 'Ready',
        },
      ],
      required: true,
    },
    {
      name: 'platform',
      type: 'select',
      defaultValue: 'Desktop',
      options: [
        {
          label: 'Desktop',
          value: 'Desktop',
        },
        {
          label: 'Mobile',
          value: 'Mobile',
        },
        {
          label: 'Shared',
          value: 'Shared',
        },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image shown as this component’s card thumbnail in the Components grid.',
      },
    },
    {
      name: 'importName',
      type: 'text',
      required: true,
    },
    {
      name: 'packageName',
      type: 'text',
      defaultValue: '@brankas/react/desktop',
      required: true,
    },
    {
      name: 'desktopContent',
      type: 'richText',
      admin: {
        description:
          'Desktop guidance shown below the live preview. Use headings, lists, callouts, and images — this replaces the old anatomy/usage/accessibility lists.',
      },
    },
    {
      name: 'mobileContent',
      type: 'richText',
      admin: {
        description: 'Mobile guidance shown below the mobile preview. Leave empty for desktop-only components.',
      },
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
