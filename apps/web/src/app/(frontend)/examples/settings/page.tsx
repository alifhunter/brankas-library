import Link from 'next/link';
import { getSiteNavigation } from '../../../../lib/site-navigation';
import { DocsShell } from '../../docs-shell';
import { SettingsScreen } from '../settings-screen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Settings form — Disbursements example',
};

export default async function ExampleSettingsPage() {
  const navigation = await getSiteNavigation();

  return (
    <DocsShell activeHref="/examples" navigation={navigation} showSidebar={false}>
      <div className="example-screen-page">
        <Link className="back-link" href="/examples">
          ← All example screens
        </Link>
        <SettingsScreen />
      </div>
    </DocsShell>
  );
}
