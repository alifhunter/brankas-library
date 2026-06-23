import configPromise from '@payload-config';
import { getPayload } from 'payload';

import { getGeneral } from './general';
import {
  applyStorybookUrl,
  defaultSiteNavigation,
  normalizeSiteNavigation,
  type PayloadSiteNavigation,
  type SiteNavigation,
} from './site-navigation-data';

export async function getSiteNavigation(): Promise<SiteNavigation> {
  try {
    const payload = await getPayload({ config: configPromise });
    const [navigationDoc, general] = await Promise.all([
      payload.findGlobal({ slug: 'site-navigation' }),
      getGeneral(payload),
    ]);

    const navigation = normalizeSiteNavigation(navigationDoc as PayloadSiteNavigation);

    // The General settings global owns the navbar brand identity (logo + title).
    return {
      ...navigation,
      brand: {
        ...navigation.brand,
        brandName: general.brandName || navigation.brand.brandName,
        logoUrl: general.logoUrl,
        productName: general.productName || navigation.brand.productName,
      },
    };
  } catch {
    return applyStorybookUrl(defaultSiteNavigation);
  }
}
