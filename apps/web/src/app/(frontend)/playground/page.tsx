import Link from 'next/link';
import { getSiteNavigation } from '../../../lib/site-navigation';
import { DocsShell } from '../docs-shell';
import { ComponentPlayground } from '../playground';

export const dynamic = 'force-dynamic';

export default async function PlaygroundPage() {
  const navigation = await getSiteNavigation();

  return (
    <DocsShell activeHref="/playground" navigation={navigation}>
      <div className="detail-page">
        <Link className="back-link" href="/">
          ← Home
        </Link>

        <section className="detail-hero">
          <div>
            <p className="eyebrow">Try it</p>
            <h1>Playground</h1>
            <p>
              Adjust common component variants and copy the import shape used by consuming teams.
            </p>
          </div>
        </section>

        <div className="playground-wrap">
          <ComponentPlayground />
        </div>
      </div>
    </DocsShell>
  );
}
