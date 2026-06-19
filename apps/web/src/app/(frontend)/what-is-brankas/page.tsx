import Link from 'next/link';
import { getSiteNavigation } from '../../../lib/site-navigation';
import { getWebsitePage } from '../../../lib/website-pages';
import { DocsShell } from '../docs-shell';

export const dynamic = 'force-dynamic';

export default async function WhatIsBrankasPage() {
  const [page, navigation] = await Promise.all([getWebsitePage('home'), getSiteNavigation()]);

  const intro = page?.intro;

  return (
    <DocsShell activeHref="/what-is-brankas" navigation={navigation}>
      <div className="detail-page">
        <Link className="back-link" href="/">
          ← Home
        </Link>

        <section className="text-block">
          {intro?.eyebrow ? <p className="eyebrow">{intro.eyebrow}</p> : null}
          {intro?.title ? <h1 className="hero-title">{intro.title}</h1> : <h1>What is Brankas?</h1>}

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
            <section key={`${section.heading ?? 'body'}-${index}`}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              <p>{section.body}</p>
            </section>
          ))}

          <section>
            <h2>Content</h2>
            <p>
              Content guidance covers the product language used across Brankas experiences,
              including labels, help text, status messages, empty states, and release notes.
            </p>
            <p>
              Keep writing clear, concise, and action-oriented. Content should help teams build
              consistent interfaces without introducing a separate voice from the design library.
            </p>
          </section>
        </section>
      </div>
    </DocsShell>
  );
}
