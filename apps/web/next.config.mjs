import { withPayload } from '@payloadcms/next/withPayload';

const extraDevOrigins = (process.env.NEXT_ALLOWED_DEV_ORIGINS ?? process.env.PAYLOAD_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((value) =>
    value
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '')
      .replace(/:\d+$/, ''),
  )
  .filter(Boolean);

// Storybook is a separate Vercel project (built from apps/storybook) served on
// the main domain under /storybook via the rewrites below (Next.js multi-zone
// pattern). Override the origin with STORYBOOK_ORIGIN if the project URL changes.
const storybookOrigin = (process.env.STORYBOOK_ORIGIN ?? 'https://brankas-storybook.vercel.app').replace(
  /\/$/,
  '',
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@brankas/tokens', '@brankas/react', '@brankas/patterns'],
  // Allow dev requests from these hostnames (Next.js 15+ blocks non-localhost by default).
  // Reads from NEXT_ALLOWED_DEV_ORIGINS, falls back to PAYLOAD_ALLOWED_ORIGINS so one env covers both.
  allowedDevOrigins: extraDevOrigins,
  // Storybook's static assets use relative URLs, so the proxied document must
  // keep its trailing slash (/storybook/). Disabling Next's automatic
  // trailing-slash redirect prevents /storybook/ -> /storybook stripping that
  // would break those relative asset paths. (A redirect rule here would loop,
  // because Next matches `/storybook` against `/storybook/` too.)
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return {
      beforeFiles: [
        // Proxy the Storybook index and all of its assets. The bare /storybook
        // path is sent to /storybook/ by middleware.ts first so the manager's
        // relative asset URLs resolve under the /storybook/ prefix.
        { source: '/storybook/', destination: `${storybookOrigin}/` },
        { source: '/storybook/:path*', destination: `${storybookOrigin}/:path*` },
      ],
    };
  },
};

export default withPayload(nextConfig);
