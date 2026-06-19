import configPromise from '@payload-config';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import type { ReactNode } from 'react';
import type { ServerFunctionClient } from 'payload';
import '@payloadcms/next/css';

import { importMap } from './admin/importMap';

type PayloadLayoutProps = {
  children: ReactNode;
};

const serverFunction: ServerFunctionClient = async (args) => {
  'use server';

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
};

export default function PayloadLayout({ children }: PayloadLayoutProps) {
  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
