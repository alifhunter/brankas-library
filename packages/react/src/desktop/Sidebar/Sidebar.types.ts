import type { HTMLAttributes, ReactNode } from 'react';

export interface SidebarMenuItem {
  /** Unique identifier for this menu item. */
  value: string;
  /** Visible label. Hidden (icon-only) when the sidebar is collapsed. */
  label: ReactNode;
  /**
   * Leading icon. Top-level items default to a 24×24 brand placeholder; nested
   * items default to a 16×16 branch glyph. Pass a node to override either.
   */
  icon?: ReactNode;
  /** Link target. When set on a leaf item, it renders as an anchor; otherwise a button. */
  href?: string;
  /** Click handler. Receives the item value. Fired when a leaf item is activated. */
  onClick?: (value: string) => void;
  /** Disabled items are dimmed and skipped in keyboard navigation. */
  disabled?: boolean;
  /**
   * Nested sub-items. An item with children becomes an expand/collapse group
   * (a chevron is shown) instead of a navigation leaf. Supports parent →
   * child → grandchild (and deeper) nesting.
   */
  children?: SidebarMenuItem[];
  /** Start this group expanded (uncontrolled). Ancestors of the active item auto-expand. */
  defaultExpanded?: boolean;
}

export interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Menu items rendered in the scrollable middle group. May be nested via `children`. */
  items: SidebarMenuItem[];
  /** Active item value (controlled). */
  activeValue?: string;
  /** Initial active item value (uncontrolled). Defaults to the first enabled leaf. */
  defaultActiveValue?: string;
  /** Fires with the value of the activated leaf item. */
  onActiveChange?: (value: string) => void;
  /** Fires when a group is expanded or collapsed, with the full set of expanded values. */
  onExpandedChange?: (expanded: string[]) => void;
  /** Brand/logo content in the header. Defaults to the Brankas brand lockup. */
  logo?: ReactNode;
  /** Render the bottom bar with the collapse ("Minimize") control. Default `false`. */
  showCollapseControl?: boolean;
  /** Collapsed rail state (controlled). */
  collapsed?: boolean;
  /** Initial collapsed state (uncontrolled). Default `false`. */
  defaultCollapsed?: boolean;
  /** Fires when the collapse control is toggled. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Label shown next to the collapse control when expanded. Default "Minimize". */
  collapseLabel?: ReactNode;
  /** Accessible name for the navigation landmark. Default "Sidebar". */
  'aria-label'?: string;
}
