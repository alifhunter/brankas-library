import { getComponentThumbnails } from '../../lib/component-pages';
import { getSiteNavigation } from '../../lib/site-navigation';
import { defaultHomePage, getWebsitePage } from '../../lib/website-pages';
import { HomePageClient } from './home-page-client';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [page, navigation, thumbnails] = await Promise.all([
    getWebsitePage('home'),
    getSiteNavigation(),
    getComponentThumbnails(),
  ]);

  return (
    <HomePageClient page={page ?? defaultHomePage} navigation={navigation} thumbnails={thumbnails} />
  );
}
