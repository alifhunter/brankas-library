import type { ReactElement, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip body content. Keep it short. */
  content: ReactNode;
  /** Single trigger element. Hover/focus on this element shows the tooltip. */
  children: ReactElement;
  /** Preferred placement. Auto-flips to the opposite side if there isn't room. Default `top`. */
  placement?: TooltipPlacement;
  /** Skip rendering the tooltip (still renders the child trigger). */
  disabled?: boolean;
  /** Milliseconds to wait before showing. Default 500. */
  openDelay?: number;
  /** Milliseconds to wait before hiding. Default 100. */
  closeDelay?: number;
  /** Initial open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Fires when open changes (controlled or uncontrolled). */
  onOpenChange?: (open: boolean) => void;
  /** Pixel gap between trigger edge and tooltip. Default 8 (matches Figma). */
  offset?: number;
  /** Override the accessible role. Default `tooltip`. */
  role?: 'tooltip' | 'label';
}
