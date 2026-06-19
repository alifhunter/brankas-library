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
      name: 'anatomy',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'usage',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'accessibility',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
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
