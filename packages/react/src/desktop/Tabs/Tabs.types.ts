import type { HTMLAttributes, ReactNode } from 'react';

export type TabsType = 'horizontal' | 'vertical' | 'chips';

export interface TabItem {
  /** Unique identifier for this tab. */
  value: string;
  /** Tab label content. */
  label: ReactNode;
  /** Optional number/short string badge rendered next to the label. */
  badge?: number | string;
  /** Disabled tabs are dimmed and not focusable/activatable. */
  disabled?: boolean;
  /**
   * Panel content. All panels stay mounted but inactive ones are hidden.
   * Omit to render only the tab strip (no panel for that item).
   */
  panel?: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /** Visual layout. Default `horizontal`. */
  type?: TabsType;
  items: TabItem[];
  /** Currently active tab value (controlled). */
  value?: string;
  /** Initial active tab value (uncontrolled). Defaults to the first non-disabled tab. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Override the tablist's accessible name. Default "Tabs". */
  'aria-label'?: string;
}
