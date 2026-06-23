import type { ReactNode } from 'react';
import '@brankas/tokens/tokens.css';
import './globals.css';

import { getGeneral } from '../../lib/general';

export async function generateMetadata() {
  const general = await getGeneral();
  const title = general.brandName ? `${general.brandName} Design System` : 'Brankas Library';

  return {
    title,
    description: 'Design system preview and playground.',
    ...(general.faviconUrl ? { icons: { icon: general.faviconUrl } } : {}),
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
