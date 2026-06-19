import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    defaultColumns: ['username', 'name', 'role', 'updatedAt'],
    group: 'Admin',
    useAsTitle: 'username',
  },
  auth: {
    // Username-only auth + sessions in Payload 3.84 returns `user: null` on
    // /api/users/me even with a valid token (JWT carries an empty email, which
    // the session lookup chokes on). Opt out of sessions and use plain JWT auth.
    useSessions: false,
    loginWithUsername: {
      allowEmailLogin: false,
      requireEmail: false,
      requireUsername: true,
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
      required: true,
    },
  ],
};
