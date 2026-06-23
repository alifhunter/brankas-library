import { EditorialPage } from '../editorial-page';

export const dynamic = 'force-dynamic';

export default function DesignPrinciplesPage() {
  return (
    <EditorialPage
      activeHref="/design-principles"
      fallbackTitle="Design Principles"
      pageSlug="design-principles"
    />
  );
}
