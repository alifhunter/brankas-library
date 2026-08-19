import Link from 'next/link';
import { getSiteNavigation } from '../../../../lib/site-navigation';
import { DocsShell } from '../../docs-shell';
import { NewPayoutScreen } from '../new-payout-screen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'New payout stepper — Disbursements example',
};

export default async function ExampleNewPayoutPage() {
  const navigation = await getSiteNavigation();

  return (
    <DocsShell activeHref="/examples" navigation={navigation} showSidebar={false}>
      <div className="example-screen-page">
        <Link className="back-link" href="/examples">
          ← All example screens
        </Link>
        <NewPayoutScreen />
      </div>
    </DocsShell>
  );
}
