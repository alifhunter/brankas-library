import type { HTMLAttributes } from 'react';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Total number of pages. */
  count: number;
  /** Current page (1-indexed). Controlled. */
  page?: number;
  /** Initial page (uncontrolled). */
  defaultPage?: number;
  onPageChange?: (page: number) => void;

  /** Pages to show on each side of the current page. Default 1. */
  siblingCount?: number;
  /** Pages to show at the start and end. Default 1. */
  boundaryCount?: number;

  /** Show the rows-per-page selector at the right. Default true. */
  showRowsPerPage?: boolean;
  /** Current rows-per-page value. */
  rowsPerPage?: number;
  /** Options for the rows-per-page select. */
  rowsPerPageOptions?: number[];
  onRowsPerPageChange?: (value: number) => void;

  /** Label shown next to the rows-per-page select. */
  rowsPerPageLabel?: string;

  /** Disable the entire pagination control. */
  disabled?: boolean;
}
