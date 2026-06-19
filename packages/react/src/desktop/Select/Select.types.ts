import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type SelectButtonVisualState = 'default' | 'hover' | 'focused' | 'disabled';

export interface SelectButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value'> {
  /** Inline label rendered before the value (e.g. "Currency"). */
  label?: ReactNode;
  /** Currently selected value rendered next to the label. */
  value?: ReactNode;
  /** Placeholder shown when no value is set. */
  placeholder?: string;
  /** Right-aligned badge (e.g. number of active filters). Number or string is wrapped automatically. */
  badge?: ReactNode;
  /** Visual state override. Normally driven by real DOM `:hover` / `:focus-visible`; pass to lock for snapshots. */
  state?: SelectButtonVisualState;
  /** Optional icon shown before the label/value. */
  leadingIcon?: ReactNode;
  /** Optional icon shown between value and badge (e.g. flag, currency). */
  trailingIcon?: ReactNode;
  /** Whether the panel is currently open — controls aria-expanded and chevron rotation. */
  open?: boolean;
  /** Helper text rendered below the button. */
  helperText?: ReactNode;
}

export interface SelectItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onClick?: () => void;
}

export interface SelectPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Items rendered inside the scrollable area (typically `SelectItem`s). */
  children?: ReactNode;
  /** Panel width. Default 250 (matches Figma). */
  width?: number | string;
  /** Max height of the scrollable list area. Default 240. */
  maxHeight?: number;
  /** Render a search input at the top of the panel. */
  searchable?: boolean;
  searchValue?: string;
  defaultSearchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  /** Render the "Terapkan" apply button beneath the list. */
  showApplyButton?: boolean;
  applyLabel?: string;
  onApply?: () => void;
  /** Show the "No data" empty state instead of children. */
  empty?: boolean;
  emptyMessage?: ReactNode;
  /** Replace the default illustration in the empty state. */
  emptyIllustration?: ReactNode;
}
