import type { ComponentType } from 'react';
import type { CaseEntry, CaseMeta } from './_types';

// Metro's require.context auto-discovers every .tsx file in this directory,
// excluding helpers (_types, index). Drop a new file in cases/ and it shows
// up in the landing page on next reload — no registry edit required.
const ctx = (require as unknown as {
  context: (
    dir: string,
    deep: boolean,
    filter: RegExp,
  ) => {
    keys: () => string[];
    (key: string): { default: ComponentType; meta: CaseMeta };
  };
}).context('./', false, /^\.\/(?!_)[^.]+\.tsx$/);

export const cases: CaseEntry[] = ctx
  .keys()
  .map((key) => {
    const mod = ctx(key);
    const id = key.replace(/^\.\//, '').replace(/\.tsx$/, '');
    if (!mod.default) {
      throw new Error(`Case "${id}" is missing a default export.`);
    }
    if (!mod.meta) {
      throw new Error(`Case "${id}" is missing a named "meta" export.`);
    }
    return { Component: mod.default, id, meta: mod.meta };
  })
  .sort((a, b) => {
    if (a.meta.category !== b.meta.category) {
      return a.meta.category.localeCompare(b.meta.category);
    }
    return a.meta.name.localeCompare(b.meta.name);
  });

export type { CaseEntry, CaseMeta };
