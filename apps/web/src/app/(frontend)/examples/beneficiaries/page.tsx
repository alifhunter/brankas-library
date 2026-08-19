import Link from 'next/link';
import { getSiteNavigation } from '../../../../lib/site-navigation';
import { DocsShell } from '../../docs-shell';
import { BeneficiariesScreen } from '../beneficiaries-screen';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Beneficiary list — Disbursements example',
};

export default async function ExampleBeneficiariesPage() {
  const navigation = await getSiteNavigation();

  return (
    <DocsShell activeHref="/examples" navigation={navigation} showSidebar={false}>
      <div className="example-screen-page">
        <Link className="back-link" href="/examples">
          ← All example screens
        </Link>
        <BeneficiariesScreen />
      </div>
    </DocsShell>
  );
}
