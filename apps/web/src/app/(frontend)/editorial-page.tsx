import Link from 'next/link';

import { getSiteNavigation } from '../../lib/site-navigation';
import { getWebsitePage } from '../../lib/website-pages';
import { DocsShell } from './docs-shell';
import { RichText } from './rich-text';

/**
 * Renders a CMS-backed editorial page (e.g. "What is Brankas" or "Design
 * Principles") from its own `website-pages` entry. The body is a single
 * rich-text field; its headings become deep-linkable anchors (see RichText).
 */
export async function EditorialPage({
  activeHref,
  fallbackTitle,
  pageSlug,
}: {
  activeHref: string;
  fallbackTitle: string;
  pageSlug: string;
}) {
  const [page, navigation] = await Promise.all([getWebsitePage(pageSlug), getSiteNavigation()]);

  return (
    <DocsShell activeHref={activeHref} navigation={navigation}>
      <div className="detail-page">
        <Link className="back-link" href="/">
          ← Home
        </Link>

        <section className="text-block rich-text-block">
          <h1 className="hero-title">{page?.title || fallbackTitle}</h1>
          <RichText content={page?.content ?? null} fallback={page?.intro?.cardBody || ''} />
        </section>
      </div>
    </DocsShell>
  );
}
