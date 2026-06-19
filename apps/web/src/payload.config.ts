import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import {
  Articles,
  ComponentPages,
  Foundations,
  Media,
  Releases,
  Users,
  WebsitePages,
} from './payload/collections';
import { SiteNavigation } from './payload/globals/SiteNavigation';
import { seedAdminUser } from './payload/seedAdmin';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isProduction = process.env.NODE_ENV === 'production';

function requireEnv(name: string, devFallback: string): string {
  const value = process.env[name];

  if (value && value.length > 0) {
    return value;
  }

  if (isProduction) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  console.warn(
    `[payload] ${name} is not set. Falling back to a development default. Set it in apps/web/.env.local before deploying.`,
  );
  return devFallback;
}

const databaseUri = requireEnv(
  'DATABASE_URI',
  process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@localhost:5432/brankas_library',
);
const payloadSecret = requireEnv('PAYLOAD_SECRET', 'brankas-dev-secret-change-me');

/**
 * Origins allowed to talk to Payload's API and admin.
 * Local dev defaults plus anything in `PAYLOAD_ALLOWED_ORIGINS` (comma-separated).
 * Set that env var to e.g. `http://10.131.6.146:3000` to access from another device on the LAN.
 */
const extraOrigins = (process.env.PAYLOAD_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const trustedOrigins = Array.from(
  new Set(['http://localhost:3000', 'http://127.0.0.1:3000', ...extraOrigins]),
);

// CORS list — always honor the env-derived allowlist (used for cross-origin
// browser fetches to the API).
const corsOrigins = trustedOrigins;

// CSRF list — in production keep the strict allowlist. In development, an
// empty array tells Payload's JWT extractor to skip the origin check entirely
// (`csrf.length === 0` short-circuits in `extractJWT.cookie`). This makes the
// admin reachable from any LAN IP without re-editing `.env.local` whenever
// DHCP rotates the laptop's IP.
const csrfOrigins = isProduction ? trustedOrigins : [];

console.log('[payload] trustedOrigins =', trustedOrigins);
console.log('[payload] csrfOrigins =', csrfOrigins.length ? csrfOrigins : '(empty — dev mode, any origin accepted)');

export default buildConfig({
  admin: {
    importMap: {
      baseDir: dirname,
    },
    user: Users.slug,
  },
  collections: [Users, Media, WebsitePages, ComponentPages, Foundations, Articles, Releases],
  cors: corsOrigins,
  csrf: csrfOrigins,
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  editor: lexicalEditor(),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'payload-schema.graphql'),
  },
  globals: [SiteNavigation],
  onInit: async (payload) => {
    await seedAdminUser(payload);
  },
  // Media uploads go to Vercel Blob in any environment where the token is set
  // (Vercel deployments + local dev). Vercel's serverless filesystem is
  // ephemeral and read-only, so local-disk uploads would not persist there.
  // Without a token (e.g. CI without secrets) it falls back to local storage.
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: payloadSecret,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
