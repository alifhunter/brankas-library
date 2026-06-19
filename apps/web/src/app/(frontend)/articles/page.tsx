import Link from 'next/link';

import { getPublishedArticles } from '../../../lib/articles';
import { getSiteNavigation } from '../../../lib/site-navigation';
import { DocsShell } from '../docs-shell';

export const dynamic = 'force-dynamic';

export const metadata = {
  description: 'Guidelines, foundations, and announcements from the Brankas design system team.',
  title: 'Articles — Brankas Library',
};

export default async function ArticlesPage() {
  const [articles, navigation] = await Promise.all([getPublishedArticles(), getSiteNavigation()]);

  return (
    <DocsShell activeHref="/articles" navigation={navigation}>
      <div className="articles-page">
        <header className="articles-header">
          <h1>Articles</h1>
          <p>Guidelines, foundations, and announcements from the Brankas design system team.</p>
        </header>

        {articles.length === 0 ? (
          <p className="articles-empty">No articles have been published yet. Check back soon.</p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <Link className="article-card" href={`/articles/${article.slug}`} key={article.slug}>
                {article.heroImage?.url ? (
                  <div className="article-card-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={article.heroImage.alt ?? article.title} src={article.heroImage.url} />
                  </div>
                ) : (
                  <div className="article-card-thumb article-card-thumb-empty" aria-hidden="true" />
                )}
                <div className="article-card-body">
                  {article.category ? <span className="article-card-tag">{article.category}</span> : null}
                  <h2>{article.title}</h2>
                  {article.excerpt ? <p>{article.excerpt}</p> : null}
                  {article.dateLabel ? <span className="article-card-date">{article.dateLabel}</span> : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DocsShell>
  );
}
