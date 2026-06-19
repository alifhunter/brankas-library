import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';

export type DropdownItemVariant = 'default' | 'danger';

export interface DropdownItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {
  /** Item label. */
  children: ReactNode;
  /** Disabled items render in muted gray and ignore clicks. */
  disabled?: boolean;
  /** `danger` colors the label red — destructive actions like Delete. */
  variant?: DropdownItemVariant;
  /** Optional icon shown on the left. */
  leadingIcon?: ReactNode;
  /** Optional icon shown on the right (e.g. chevron for submenu, shortcut hint). */
  trailingIcon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum height in pixels. The list scrolls if items overflow. Default 240. */
  maxHeight?: number;
  /** Override width. Default `199px` from Figma; pass `'100%'` to fill the parent. */
  width?: number | string;
  /** Container for `DropdownItem` children. */
  children?: ReactNode;
}
