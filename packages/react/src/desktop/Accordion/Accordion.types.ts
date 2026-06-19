import type { ReactNode } from 'react';

export type AccordionVisualState = 'default' | 'hover';

export interface AccordionProps {
  title: ReactNode;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  state?: AccordionVisualState;
  showLeadingIcon?: boolean;
  leadingIcon?: ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
  placeholderTitle?: string;
  placeholderSubtitle?: string;
  className?: string;
  contentClassName?: string;
}
