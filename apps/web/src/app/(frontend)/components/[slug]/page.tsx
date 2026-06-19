import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ComponentDetailContent } from './component-detail-content';
import { getComponentPage } from '../../../../lib/component-pages';
import { getSiteNavigation } from '../../../../lib/site-navigation';
import { DocsShell } from '../../docs-shell';

export const dynamic = 'force-dynamic';

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [doc, navigation] = await Promise.all([getComponentPage(slug), getSiteNavigation()]);

  if (!doc) {
    notFound();
  }

  const hasDesktop = !!doc.desktop;
  const hasMobile = !!doc.mobile;
  const eyebrow = hasDesktop && hasMobile
    ? 'Desktop & mobile component'
    : hasMobile
      ? 'Mobile component'
      : 'Desktop component';

  const heroDetail = doc.defaultPlatform === 'mobile' && hasMobile ? doc.mobile! : doc.desktop ?? doc.mobile!;

  return (
    <DocsShell activeHref={`/components/${doc.slug}`} navigation={navigation}>
      <div className="detail-page">
        <Link className="back-link" href="/#components">
          ← Components
        </Link>

        <section className="detail-hero">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{doc.name}</h1>
            <p>{heroDetail.description}</p>
          </div>
          <div className="detail-status">
            <span>{heroDetail.status}</span>
            <span>{heroDetail.packageName}</span>
          </div>
        </section>

        <ComponentDetailContent doc={doc} />
      </div>
    </DocsShell>
  );
}
