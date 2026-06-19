import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['alt', 'filename', 'mimeType', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
  },
};
