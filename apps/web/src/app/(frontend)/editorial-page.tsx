import Link from 'next/link';

import { getSiteNavigation } from '../../lib/site-navigation';
import { getWebsitePage } from '../../lib/website-pages';
import { DocsShell } from './docs-shell';

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Renders a CMS-backed editorial page (e.g. "What is Brankas" or "Design
 * Principles") from its own `website-pages` entry. Section headings get a
 * slugified `id` so they can be deep-linked (e.g. /design-principles#token-first).
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
  const intro = page?.intro;

  return (
    <DocsShell activeHref={activeHref} navigation={navigation}>
      <div className="detail-page">
        <Link className="back-link" href="/">
          ← Home
        </Link>

        <section className="text-block">
          {intro?.eyebrow ? <p className="eyebrow">{intro.eyebrow}</p> : null}
          <h1 className="hero-title">{intro?.title || page?.title || fallbackTitle}</h1>

          {intro?.cardTitle || intro?.cardBody ? (
            <div className="doc-hero">
              <div>
                {intro.cardTitle ? <strong>{intro.cardTitle}</strong> : null}
                {intro.cardBody ? <p>{intro.cardBody}</p> : null}
                <span>bank sinarmas</span>
              </div>
            </div>
          ) : null}

          {intro?.body.map((section, index) => (
            <section
              id={section.heading ? slugifyHeading(section.heading) : undefined}
              key={`${section.heading ?? 'body'}-${index}`}
            >
              {section.heading ? <h2>{section.heading}</h2> : null}
              <p>{section.body}</p>
            </section>
          ))}
        </section>
      </div>
    </DocsShell>
  );
}
