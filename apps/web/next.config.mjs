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

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@brankas/tokens', '@brankas/react', '@brankas/patterns'],
  // Allow dev requests from these hostnames (Next.js 15+ blocks non-localhost by default).
  // Reads from NEXT_ALLOWED_DEV_ORIGINS, falls back to PAYLOAD_ALLOWED_ORIGINS so one env covers both.
  allowedDevOrigins: extraDevOrigins,
};

export default withPayload(nextConfig);
