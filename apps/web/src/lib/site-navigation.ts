import configPromise from '@payload-config';
import { getPayload } from 'payload';

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
    const navigation = await payload.findGlobal({
      slug: 'site-navigation',
    });

    return normalizeSiteNavigation(navigation as PayloadSiteNavigation);
  } catch {
    return applyStorybookUrl(defaultSiteNavigation);
  }
}
