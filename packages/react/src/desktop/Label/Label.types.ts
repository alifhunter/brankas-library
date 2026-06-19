import type { HTMLAttributes, ReactNode } from 'react';

export type LabelVariant = 'neutral' | 'information' | 'positive' | 'warning' | 'negative';

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: LabelVariant;
  /**
   * `true` (default) renders the variant's default icon, `false` hides it,
   * or pass a ReactNode to use a custom 12px icon.
   */
  icon?: boolean | ReactNode;
  children?: ReactNode;
}
