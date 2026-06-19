import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Redirect the bare `/storybook` path to `/storybook/`.
 *
 * Storybook is proxied (see `next.config.mjs` rewrites) and its manager HTML
 * uses relative asset URLs, so the document must be served under the trailing
 * slash for those assets to resolve as `/storybook/...`. A `redirects()` rule
 * in `next.config` cannot do this because Next matches `/storybook` against
 * `/storybook/` too, producing a redirect loop. The exact `pathname` guard here
 * only rewrites the slash-less form, so `/storybook/` passes straight through.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/storybook') {
    // Set the Location header directly. NextResponse.redirect / NextURL
    // serialization strips the trailing slash back off (the app uses
    // trailingSlash: false), which would redirect /storybook to itself.
    const location = new URL('/storybook/', request.url).toString();
    return new NextResponse(null, { status: 308, headers: { Location: location } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/storybook'],
};
