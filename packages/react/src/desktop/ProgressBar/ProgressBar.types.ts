import type { HTMLAttributes } from 'react';

export type ProgressBarSize = 'small' | 'large';
export type ProgressBarVariant = 'default' | 'inverse';

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Progress percentage from 0 to 100. */
  value?: number;
  /** Track height — small (4px) or large (12px). Default `small`. */
  size?: ProgressBarSize;
  /** `inverse` uses a translucent white track for use on dark backgrounds. */
  variant?: ProgressBarVariant;
  /** Override `aria-label` if no surrounding label exists. */
  'aria-label'?: string;
}
