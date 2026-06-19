import type { CollectionConfig } from 'payload';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    defaultColumns: ['title', 'status', 'category', 'publishedAt', 'updatedAt'],
    group: 'Content',
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
        description: 'URL-safe article identifier, for example design-principles.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary for cards, search results, and previews.',
      },
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
      name: 'category',
      type: 'select',
      defaultValue: 'guideline',
      options: [
        {
          label: 'Guideline',
          value: 'guideline',
        },
        {
          label: 'Foundation',
          value: 'foundation',
        },
        {
          label: 'Component',
          value: 'component',
        },
        {
          label: 'Pattern',
          value: 'pattern',
        },
        {
          label: 'Announcement',
          value: 'announcement',
        },
      ],
      required: true,
    },
    {
      name: 'heroImage',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'relatedComponents',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'platform',
          type: 'select',
          defaultValue: 'desktop',
          options: [
            {
              label: 'Desktop',
              value: 'desktop',
            },
            {
              label: 'Mobile',
              value: 'mobile',
            },
            {
              label: 'Shared',
              value: 'shared',
            },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  versions: {
    drafts: true,
  },
};
