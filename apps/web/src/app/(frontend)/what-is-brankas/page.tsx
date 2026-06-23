import { EditorialPage } from '../editorial-page';

export const dynamic = 'force-dynamic';

export default function WhatIsBrankasPage() {
  return (
    <EditorialPage
      activeHref="/what-is-brankas"
      fallbackTitle="What is Brankas Design System?"
      pageSlug="what-is-brankas"
    />
  );
}
