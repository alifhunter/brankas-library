import { NextResponse } from 'next/server';

import { getSearchIndex } from '../../../lib/search';
import { getSiteNavigation } from '../../../lib/site-navigation';

export const dynamic = 'force-dynamic';

// Serves the command-palette search index. Built from static library data, the
// live site navigation, and published CMS content. The client palette fetches
// this once on first open.
export async function GET() {
  const navigation = await getSiteNavigation();
  const index = await getSearchIndex(navigation);

  return NextResponse.json(index, {
    headers: {
      'Cache-Control': 'public, max-age=120, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
