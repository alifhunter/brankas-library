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
    const url = request.nextUrl.clone();
    url.pathname = '/storybook/';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/storybook'],
};
