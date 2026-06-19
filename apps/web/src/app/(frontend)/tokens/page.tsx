import Link from 'next/link';
import { getSiteNavigation } from '../../../lib/site-navigation';
import { getWebsitePage } from '../../../lib/website-pages';
import { DocsShell } from '../docs-shell';
import { tokenDocs } from '../library-data';

export const dynamic = 'force-dynamic';

export default async function TokensPage() {
  const [page, navigation] = await Promise.all([getWebsitePage('tokens'), getSiteNavigation()]);

  return (
    <DocsShell
      activeHref="/tokens"
      navigation={navigation}
      showSidebar={page?.layout !== 'no-sidebar' && page?.layout !== 'custom'}
    >
      <div className="detail-page">
        <Link className="back-link" href="/#tokens">
          ← Home
        </Link>

        <section className="detail-hero">
          <div>
            <p className="eyebrow">Foundation</p>
            <h1>{page?.hero.title ?? 'Tokens'}</h1>
            <p>
              {page?.hero.description ??
                'Canonical token JSON is generated into CSS variables and TypeScript exports for product teams and the preview website.'}
            </p>
          </div>
          <div className="detail-status">
            <span>DTCG JSON</span>
            <span>No Tailwind dependency</span>
          </div>
        </section>

        <section className="token-detail-list">
          {tokenDocs.map((group) => (
            <article className="detail-card" key={group.category}>
              <div className="detail-card-header">
                <h2>{group.category}</h2>
                <p>{group.description}</p>
              </div>
              <div className="token-reference-table">
                {group.references.map((reference) => (
                  <div className="token-reference-row" key={reference.name}>
                    <div className="token-reference-name">
                      {reference.preview ? (
                        <span className="token-dot" style={{ background: reference.preview }} />
                      ) : null}
                      <strong>{reference.name}</strong>
                    </div>
                    <code>{reference.css}</code>
                    <code>{reference.ts}</code>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        {page?.sections.length ? (
          <section className="section text-block">
            {page.sections.map((section) => (
              <section key={section.title}>
                {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </section>
        ) : null}
      </div>
    </DocsShell>
  );
}
