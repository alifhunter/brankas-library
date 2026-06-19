import { notFound } from 'next/navigation';

import { getPublishedReleases } from '../../../lib/releases';
import { getSiteNavigation } from '../../../lib/site-navigation';
import { getWebsitePage, normalizeWebsiteSlug } from '../../../lib/website-pages';
import { DocsShell } from '../docs-shell';

type CmsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = 'force-dynamic';

export default async function CmsPage({ params }: CmsPageProps) {
  const { slug } = await params;
  const normalizedSlug = normalizeWebsiteSlug(slug);
  const [page, navigation] = await Promise.all([
    getWebsitePage(normalizedSlug),
    getSiteNavigation(),
  ]);

  if (!page || page.slug === 'home') {
    notFound();
  }

  if (page.pageType === 'changelog' || page.slug === 'change-log') {
    const title = page.hero.title === 'Change-log' ? 'Changelog' : page.hero.title;
    const description =
      page.hero.description ||
      'See the latest feature releases, product improvements and bug fixes.';

    const cmsReleases = await getPublishedReleases();
    const releases =
      cmsReleases.length > 0
        ? cmsReleases.map((release, index) => ({
            dateLabel: release.dateLabel,
            href: `/change-log/${release.slug}`,
            imageTone: index % 2 === 0 ? ('red' as const) : ('light' as const),
            summary: release.summary,
            tags: release.tags,
            title: release.version,
          }))
        : [
            {
              dateLabel: page.changelog.dateLabel,
              href: '/change-log/brankas-2-2',
              imageTone: 'red' as const,
              summary: page.changelog.summary,
              tags: page.changelog.tags,
              title: page.changelog.title,
            },
            {
              dateLabel: 'January 15, 2024',
              href: '/change-log/brankas-2-1',
              imageTone: 'light' as const,
              summary: 'Brankas 2.1 was released for use in the Simobi+ recolor project in 2024.',
              tags: ['Mobile', 'UI', 'App'],
              title: 'Brankas 2.1',
            },
          ];

    return (
      <DocsShell activeHref={`/${page.slug}`} navigation={navigation} showSidebar={false}>
        <ChangelogPage description={description} releases={releases} title={title} />
      </DocsShell>
    );
  }

  return (
    <DocsShell
      activeHref={`/${page.slug}`}
      navigation={navigation}
      showSidebar={page.layout === 'docs-sidebar'}
    >
      <section className="detail-page">
        <section className="detail-hero">
          {page.hero.eyebrow ? <p className="eyebrow">{page.hero.eyebrow}</p> : null}
          <h1>{page.hero.title}</h1>
          {page.hero.description ? <p>{page.hero.description}</p> : null}
          {page.hero.ctaLabel && page.hero.ctaHref ? (
            <a className="primary-cta" href={page.hero.ctaHref}>
              {page.hero.ctaLabel}
            </a>
          ) : null}
        </section>

        {page.sections.length > 0 ? (
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

        <a className="next-link-card" href="/admin/collections/website-pages">
          <span>Edit this page in Payload</span>
          <span>›</span>
        </a>
      </section>
    </DocsShell>
  );
}

type ChangelogRelease = {
  dateLabel: string;
  href: string;
  imageTone: 'light' | 'red';
  summary: string;
  tags: string[];
  title: string;
};

function ChangelogPage({
  description,
  releases,
  title,
}: {
  description: string;
  releases: ChangelogRelease[];
  title: string;
}) {
  return (
    <section className="changelog-page">
      <header className="changelog-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <div className="changelog-timeline">
        {releases.map((release) => (
          <article className="changelog-entry" key={release.title}>
            <div className="changelog-meta">
              <span className="timeline-dot" aria-hidden="true" />
              <p>{release.dateLabel}</p>
              <h2>{release.title}</h2>
              <div className="changelog-tags">
                {release.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="changelog-card">
              <div className={`changelog-image changelog-image-${release.imageTone}`}>
                <div className="phone-mockup">
                  <span>simobi</span>
                  <strong>Rp280.000.000</strong>
                </div>
                <div className="dashboard-mockup">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <p>{release.summary}</p>
              <a className="read-more" href={release.href}>
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
