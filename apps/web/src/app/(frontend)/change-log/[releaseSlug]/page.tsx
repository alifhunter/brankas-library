import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getRelease } from '../../../../lib/releases';
import { getSiteNavigation } from '../../../../lib/site-navigation';
import { DocsShell } from '../../docs-shell';
import { RichText } from '../../rich-text';

type ReleasePageProps = {
  params: Promise<{
    releaseSlug: string;
  }>;
};

export const dynamic = 'force-dynamic';

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { releaseSlug } = await params;
  const [release, navigation] = await Promise.all([getRelease(releaseSlug), getSiteNavigation()]);

  if (!release) {
    notFound();
  }

  return (
    <DocsShell activeHref="/change-log" navigation={navigation} showSidebar={false}>
      <article className="release-detail-page">
        <Link className="back-link" href="/change-log">
          ← Changelog
        </Link>

        <header className="release-detail-header">
          <p>{release.dateLabel}</p>
          <h1>{release.version}</h1>
          <div className="changelog-tags">
            {release.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <section className="detail-card detail-card-wide release-article">
          <h2>{release.title}</h2>
          <RichText content={release.content} fallback={release.summary} />
        </section>
      </article>
    </DocsShell>
  );
}
