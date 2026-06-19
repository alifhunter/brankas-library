import type { CollectionConfig } from 'payload';

export const Foundations: CollectionConfig = {
  slug: 'foundations',
  admin: {
    defaultColumns: ['name', 'slug', 'status', 'updatedAt'],
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
        description: 'URL segment used by /foundation/[slug], for example color.',
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
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Foundation',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sections',
      type: 'array',
      admin: {
        description: 'Sub-sections rendered as paragraphs on the foundation page.',
      },
      fields: [
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
      name: 'tokenReferences',
      type: 'array',
      admin: {
        description: 'Optional list of CSS variables or token names relevant to this foundation.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
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
