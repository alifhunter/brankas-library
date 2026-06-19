import type { ComponentType } from 'react';

export type CaseMeta = {
  /** Display name shown in the case list. */
  name: string;
  /** Section header in the grouped list. */
  category: string;
  /** Renders a small badge next to the name. */
  type: 'screen' | 'flow';
  /** Optional one-liner shown under the name. */
  description?: string;
  /**
   * - `shell` (default) — the case renders inside CaseShell's header.
   * - `fullscreen` — case renders edge-to-edge; CaseShell shows only a small
   *   floating back button. Use for dashboards or hero screens that bring
   *   their own top bar.
   */
  chrome?: 'shell' | 'fullscreen';
};

export type CaseEntry = {
  /** Stable id derived from the filename (no extension). */
  id: string;
  meta: CaseMeta;
  Component: ComponentType;
};
