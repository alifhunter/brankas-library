import { getSiteNavigation } from '../../lib/site-navigation';
import { defaultHomePage, getWebsitePage } from '../../lib/website-pages';
import { HomePageClient } from './home-page-client';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [page, navigation] = await Promise.all([getWebsitePage('home'), getSiteNavigation()]);

  return <HomePageClient page={page ?? defaultHomePage} navigation={navigation} />;
}
