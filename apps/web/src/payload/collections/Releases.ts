import type { CollectionConfig } from 'payload';

export const Releases: CollectionConfig = {
  slug: 'releases',
  admin: {
    defaultColumns: ['version', 'title', 'releaseDate', 'status', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'version',
  },
  fields: [
    {
      name: 'version',
      type: 'text',
      admin: {
        description: 'Release label, for example Brankas 2.2 or @brankas/react 0.3.0.',
      },
      required: true,
      unique: true,
    },
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
          'Public URL slug. For example, brankas-2-2 renders at /change-log/brankas-2-2.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'summary',
      type: 'textarea',
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
      name: 'releaseDate',
      type: 'date',
      required: true,
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
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
};
