import { createContext, useContext } from 'react';
import { cn } from '../../lib/cn.js';
import type {
  TableBodyProps,
  TableCellProps,
  TableHeadProps,
  TableHeaderCellProps,
  TableProps,
  TableRowProps,
  TableSize,
  TableSortDirection,
} from './Table.types';
import './Table.css';

interface TableContextValue {
  size: TableSize;
  sticky: boolean;
}

const TableContext = createContext<TableContextValue>({ size: 'medium', sticky: false });

function useTableContext() {
  return useContext(TableContext);
}

export function Table({
  size = 'medium',
  sticky = false,
  zebra = false,
  className,
  children,
  ...rest
}: TableProps) {
  return (
    <TableContext.Provider value={{ size, sticky }}>
      <table
        {...rest}
        className={cn(
          'ui-table',
          `ui-table--size-${size}`,
          sticky && 'ui-table--sticky',
          zebra && 'ui-table--zebra',
          className,
        )}
      >
        {children}
      </table>
    </TableContext.Provider>
  );
}

export function TableHead({ className, children, ...rest }: TableHeadProps) {
  const { sticky } = useTableContext();
  return (
    <thead {...rest} className={cn('ui-table__head', sticky && 'ui-table__head--sticky', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...rest }: TableBodyProps) {
  return (
    <tbody {...rest} className={cn('ui-table__body', className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ selected = false, className, children, ...rest }: TableRowProps) {
  return (
    <tr
      {...rest}
      aria-selected={selected || undefined}
      className={cn('ui-table__row', selected && 'ui-table__row--selected', className)}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  alignment = 'left',
  className,
  children,
  ...rest
}: TableCellProps) {
  const { size } = useTableContext();
  return (
    <td
      {...rest}
      className={cn(
        'ui-table__cell',
        `ui-table__cell--size-${size}`,
        `ui-table__cell--align-${alignment}`,
        className,
      )}
    >
      {children}
    </td>
  );
}

function SortIcon({ direction }: { direction: TableSortDirection }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      className={cn(
        'ui-table__sort-icon',
        direction === 'asc' && 'ui-table__sort-icon--asc',
        direction === 'desc' && 'ui-table__sort-icon--desc',
      )}
    >
      <path
        d="M4 10l4-4 4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={direction === 'desc' ? 0.3 : 1}
      />
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={direction === 'asc' ? 0.3 : 1}
        transform="translate(0, 4)"
      />
    </svg>
  );
}

export function TableHeaderCell({
  alignment = 'left',
  sortable = false,
  sortDirection = null,
  onSort,
  className,
  children,
  scope,
  ...rest
}: TableHeaderCellProps) {
  const { size } = useTableContext();
  const ariaSort =
    sortable && sortDirection === 'asc'
      ? 'ascending'
      : sortable && sortDirection === 'desc'
        ? 'descending'
        : sortable
          ? 'none'
          : undefined;

  return (
    <th
      {...rest}
      scope={scope ?? 'col'}
      aria-sort={ariaSort}
      className={cn(
        'ui-table__header-cell',
        `ui-table__cell--size-${size}`,
        `ui-table__cell--align-${alignment}`,
        sortable && 'ui-table__header-cell--sortable',
        className,
      )}
    >
      {sortable ? (
        <button
          type="button"
          className="ui-table__sort-trigger"
          onClick={onSort}
          aria-label={
            typeof children === 'string'
              ? `Sort by ${children}${
                  sortDirection === 'asc'
                    ? ' (ascending)'
                    : sortDirection === 'desc'
                      ? ' (descending)'
                      : ''
                }`
              : undefined
          }
        >
          <span>{children}</span>
          <SortIcon direction={sortDirection} />
        </button>
      ) : (
        children
      )}
    </th>
  );
}
