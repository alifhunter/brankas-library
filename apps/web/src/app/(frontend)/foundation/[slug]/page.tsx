import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFoundation } from '../../../../lib/foundations';
import { getSiteNavigation } from '../../../../lib/site-navigation';
import { DocsShell } from '../../docs-shell';

export const dynamic = 'force-dynamic';

export default async function FoundationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [page, navigation] = await Promise.all([getFoundation(slug), getSiteNavigation()]);

  if (!page) {
    notFound();
  }

  return (
    <DocsShell activeHref={`/foundation/${page.slug}`} navigation={navigation}>
      <div className="detail-page">
        <Link className="back-link" href="/">
          ← Home
        </Link>

        <section className="detail-hero">
          <div>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.name}</h1>
            <p>{page.description}</p>
          </div>
        </section>

        {page.sections.length > 0 ? (
          <section className="text-block">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </section>
        ) : null}

        {page.tokenReferences.length > 0 ? (
          <section className="section">
            <div className="section-heading">
              <h2>Tokens</h2>
            </div>
            <div className="token-row">
              {page.tokenReferences.map((token) => (
                <div className="token-chip" key={token.name}>
                  <span
                    className="token-dot"
                    style={token.value ? { background: token.value } : undefined}
                  />
                  <strong>{token.name}</strong>
                  {token.value ? <span>{token.value}</span> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </DocsShell>
  );
}
