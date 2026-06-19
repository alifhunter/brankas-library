import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getArticle } from '../../../../lib/articles';
import { getSiteNavigation } from '../../../../lib/site-navigation';
import { DocsShell } from '../../docs-shell';
import { RichText } from '../../rich-text';

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'Article not found — Brankas Library' };
  }

  return {
    description: article.excerpt || undefined,
    title: `${article.title} — Brankas Library`,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, navigation] = await Promise.all([getArticle(slug), getSiteNavigation()]);

  if (!article) {
    notFound();
  }

  return (
    <DocsShell activeHref="/articles" navigation={navigation} showSidebar={false}>
      <article className="article-detail-page">
        <Link className="back-link" href="/articles">
          ← Articles
        </Link>

        <header className="article-detail-header">
          {article.category ? <p className="article-detail-category">{article.category}</p> : null}
          <h1>{article.title}</h1>
          {article.dateLabel ? <p className="article-detail-date">{article.dateLabel}</p> : null}
          {article.excerpt ? <p className="article-detail-excerpt">{article.excerpt}</p> : null}
        </header>

        {article.heroImage?.url ? (
          <figure className="article-detail-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={article.heroImage.alt ?? article.title} src={article.heroImage.url} />
          </figure>
        ) : null}

        <section className="detail-card detail-card-wide article-body">
          <RichText content={article.content} fallback={article.excerpt} />
        </section>
      </article>
    </DocsShell>
  );
}
