import configPromise from '@payload-config';
import { getPayload, type Payload } from 'payload';

export type GeneralSettings = {
  brandName: string;
  faviconUrl: string | null;
  hero: {
    ctaHref: string;
    ctaLabel: string;
    description: string;
    title: string;
  };
  logoUrl: string | null;
  productName: string;
};

const emptyGeneral: GeneralSettings = {
  brandName: '',
  faviconUrl: null,
  hero: { ctaHref: '', ctaLabel: '', description: '', title: '' },
  logoUrl: null,
  productName: '',
};

function mediaUrl(value: unknown): string | null {
  return value && typeof value === 'object' && 'url' in value
    ? ((value as { url?: string | null }).url ?? null)
    : null;
}

/**
 * Reads the site-wide General settings global (navbar logo/title, favicon,
 * home hero). Pass an existing payload instance to avoid a second init.
 * Returns empty values on error so callers fall back to their own defaults.
 */
export async function getGeneral(payloadInstance?: Payload): Promise<GeneralSettings> {
  try {
    const payload = payloadInstance ?? (await getPayload({ config: configPromise }));
    const data = (await payload.findGlobal({ slug: 'general', depth: 1 })) as {
      brandName?: string | null;
      favicon?: unknown;
      home?: {
        heroCtaHref?: string | null;
        heroCtaLabel?: string | null;
        heroDescription?: string | null;
        heroTitle?: string | null;
      } | null;
      logo?: unknown;
      productName?: string | null;
    };

    return {
      brandName: data.brandName ?? '',
      faviconUrl: mediaUrl(data.favicon),
      hero: {
        ctaHref: data.home?.heroCtaHref ?? '',
        ctaLabel: data.home?.heroCtaLabel ?? '',
        description: data.home?.heroDescription ?? '',
        title: data.home?.heroTitle ?? '',
      },
      logoUrl: mediaUrl(data.logo),
      productName: data.productName ?? '',
    };
  } catch {
    return emptyGeneral;
  }
}
