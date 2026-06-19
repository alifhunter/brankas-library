import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from 'react';

export type TableSize = 'small' | 'medium' | 'large';
export type TableCellAlignment = 'left' | 'center' | 'right';
export type TableSortDirection = 'asc' | 'desc' | null;

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Row/cell density. Cascades to all cells via context. Default `medium`. */
  size?: TableSize;
  /**
   * Make the header stick to the top of the nearest scroll container.
   * Wrap the table in a fixed-height div with `overflow: auto` for this to take effect.
   */
  sticky?: boolean;
  /** Stripe alternating rows with a subtle background. Default false. */
  zebra?: boolean;
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Apply selected-row visual styling (used by selectable patterns). */
  selected?: boolean;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  alignment?: TableCellAlignment;
}

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  alignment?: TableCellAlignment;
  /** Render a sort indicator and make the cell a sort trigger. */
  sortable?: boolean;
  /** Current sort direction for this column. `null` means "sortable but inactive". */
  sortDirection?: TableSortDirection;
  /** Fires when a sortable header is clicked. Consumer toggles direction. */
  onSort?: () => void;
}
