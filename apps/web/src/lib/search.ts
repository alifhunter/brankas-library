import { componentDocs, patternDocs, tokenDocs } from '../app/(frontend)/library-data';
import { getPublishedArticles } from './articles';
import { getPublishedReleases } from './releases';
import type { SearchEntry } from './search-types';
import type { SiteNavigation } from './site-navigation-data';

export type { SearchEntry } from './search-types';

function normalizeHref(href: string) {
  const trimmed = href.trim();
  if (trimmed.startsWith('#') || trimmed.startsWith('http')) {
    return trimmed;
  }
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/+$/, '') || '/';
}

/**
 * Builds the search index for the command palette from static library data, the
 * site navigation, and published CMS content. Runs on the server; the resulting
 * plain-object array is passed to the client palette so search is instant.
 */
export async function getSearchIndex(navigation: SiteNavigation): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = [];
  const seen = new Set<string>();

  const add = (entry: SearchEntry) => {
    const key = `${normalizeHref(entry.href)}|${entry.title.toLowerCase()}`;
    if (seen.has(key) || !entry.title) {
      return;
    }
    seen.add(key);
    entries.push(entry);
  };

  // Components (static docs carry the richest descriptions)
  for (const doc of componentDocs) {
    add({
      description: doc.description,
      group: 'Components',
      href: `/components/${doc.slug}`,
      keywords: doc.platform,
      title: doc.name,
    });
  }

  // Patterns
  for (const doc of patternDocs) {
    add({ description: doc.description, group: 'Patterns', href: '/patterns', title: doc.name });
  }

  // Token categories
  for (const doc of tokenDocs) {
    add({ description: doc.description, group: 'Tokens', href: '/tokens', title: doc.category });
  }

  // Pages and foundations from the live navigation
  for (const section of navigation.sidebarSections) {
    for (const item of section.items) {
      if (item.href.startsWith('http')) {
        continue;
      }
      add({ group: section.title, href: item.href, title: item.label });
    }
  }
  for (const item of navigation.topNav) {
    if (item.href.startsWith('http')) {
      continue;
    }
    add({ group: 'Pages', href: item.href, title: item.label });
  }

  // Published CMS content (best-effort — empty if the database is unavailable)
  try {
    const [articles, releases] = await Promise.all([getPublishedArticles(), getPublishedReleases()]);
    for (const article of articles) {
      add({
        description: article.excerpt,
        group: 'Articles',
        href: `/articles/${article.slug}`,
        title: article.title,
      });
    }
    for (const release of releases) {
      add({
        description: release.summary,
        group: 'Releases',
        href: `/change-log/${release.slug}`,
        keywords: release.version,
        title: release.title,
      });
    }
  } catch {
    // ignore — navigation + static entries still provide a useful index
  }

  return entries;
}
