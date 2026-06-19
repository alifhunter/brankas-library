import type { ReactNode } from 'react';
import '@brankas/tokens/tokens.css';
import './globals.css';

export const metadata = {
  title: 'Brankas Library',
  description: 'Design system preview and playground.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
