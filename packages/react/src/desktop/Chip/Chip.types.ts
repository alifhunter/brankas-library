import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ChipVisualState = 'default' | 'hover';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  state?: ChipVisualState;
  leadingIcon?: ReactNode;
  /** Pass a node to render a custom trailing icon, or `true` for the default close (X) shown when selected. */
  trailingIcon?: ReactNode | boolean;
  badge?: ReactNode;
  /** Click handler for the trailing icon. Stops propagation so it doesn't toggle the chip. */
  onTrailingIconClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}
