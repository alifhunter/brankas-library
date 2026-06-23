import { getComponentThumbnails } from '../../lib/component-pages';
import { getGeneral } from '../../lib/general';
import { getSiteNavigation } from '../../lib/site-navigation';
import { defaultHomePage, getWebsitePage } from '../../lib/website-pages';
import { HomePageClient } from './home-page-client';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [page, navigation, thumbnails, general] = await Promise.all([
    getWebsitePage('home'),
    getSiteNavigation(),
    getComponentThumbnails(),
    getGeneral(),
  ]);

  const base = page ?? defaultHomePage;
  // The General settings global owns the home hero copy (with the page hero as fallback).
  const merged = {
    ...base,
    hero: {
      ...base.hero,
      ctaHref: general.hero.ctaHref || base.hero.ctaHref,
      ctaLabel: general.hero.ctaLabel || base.hero.ctaLabel,
      description: general.hero.description || base.hero.description,
      title: general.hero.title || base.hero.title,
    },
  };

  return <HomePageClient page={merged} navigation={navigation} thumbnails={thumbnails} />;
}
