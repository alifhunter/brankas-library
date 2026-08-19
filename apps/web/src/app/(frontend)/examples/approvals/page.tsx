import Link from 'next/link';
import { getSiteNavigation } from '../../../../lib/site-navigation';
import { DocsShell } from '../../docs-shell';
import { ApprovalsScreen } from '../approvals-screen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Approvals queue — Disbursements example',
};

export default async function ExampleApprovalsPage() {
  const navigation = await getSiteNavigation();

  return (
    <DocsShell activeHref="/examples" navigation={navigation} showSidebar={false}>
      <div className="example-screen-page">
        <Link className="back-link" href="/examples">
          ← All example screens
        </Link>
        <ApprovalsScreen />
      </div>
    </DocsShell>
  );
}
