import {
  findMergedComponentDoc,
  type MergedComponentDoc,
} from '../app/(frontend)/library-data';

export type ComponentPlatformContent = {
  accessibility: string[];
  anatomy: string[];
  description: string;
  importName: string;
  packageName: string;
  status: 'Draft' | 'Ready';
  usage: string[];
};

export type ComponentPageContent = {
  defaultPlatform: 'desktop' | 'mobile';
  desktop: ComponentPlatformContent | null;
  mobile: ComponentPlatformContent | null;
  name: string;
  slug: string;
};

export async function getComponentPage(slug: string): Promise<ComponentPageContent | null> {
  const canonical = slug.startsWith('mobile-') ? slug.slice('mobile-'.length) : slug;
  const doc = findMergedComponentDoc(canonical);
  return doc ? toContent(doc) : null;
}

function toContent(doc: MergedComponentDoc): ComponentPageContent {
  return {
    defaultPlatform: doc.defaultPlatform,
    desktop: doc.desktop,
    mobile: doc.mobile,
    name: doc.name,
    slug: doc.slug,
  };
}
