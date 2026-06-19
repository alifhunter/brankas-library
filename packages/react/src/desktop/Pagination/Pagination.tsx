import { useState } from 'react';
import { cn } from '../../lib/cn.js';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../../shared/icons.js';
import type { PaginationProps } from './Pagination.types';
import './Pagination.css';

type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}

function buildPageItems(
  page: number,
  count: number,
  siblingCount: number,
  boundaryCount: number,
): PageItem[] {
  const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2;
  if (totalPageNumbers >= count) {
    return range(1, count);
  }

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0]! - 2 : count - 1,
  );

  const items: PageItem[] = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (['ellipsis-start'] as const)
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? (['ellipsis-end'] as const)
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];

  return items;
}

export function Pagination({
  count,
  page,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showRowsPerPage = true,
  rowsPerPage,
  rowsPerPageOptions = [10, 25, 50, 100],
  onRowsPerPageChange,
  rowsPerPageLabel = 'Rows per page',
  disabled = false,
  className,
  ...rest
}: PaginationProps) {
  const isControlled = page !== undefined;
  const [internalPage, setInternalPage] = useState<number>(defaultPage);
  const currentPage = Math.min(Math.max(1, isControlled ? page : internalPage), Math.max(1, count));

  const goTo = (next: number) => {
    const clamped = Math.min(Math.max(1, next), Math.max(1, count));
    if (clamped === currentPage) return;
    if (!isControlled) setInternalPage(clamped);
    onPageChange?.(clamped);
  };

  const items = buildPageItems(currentPage, count, siblingCount, boundaryCount);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= count;

  const effectiveRowsPerPage =
    rowsPerPage ?? (rowsPerPageOptions[0] ?? 10);

  return (
    <nav
      {...rest}
      aria-label="Pagination"
      className={cn('ui-pagination', disabled && 'ui-pagination--disabled', className)}
    >
      <div className="ui-pagination__pages">
        <button
          type="button"
          className="ui-pagination__nav"
          aria-label="Previous page"
          disabled={disabled || isFirst}
          onClick={() => goTo(currentPage - 1)}
        >
          <ChevronLeftIcon width={20} height={20} />
        </button>

        <ul className="ui-pagination__list">
          {items.map((item, index) => {
            if (item === 'ellipsis-start' || item === 'ellipsis-end') {
              return (
                <li key={`${item}-${index}`} className="ui-pagination__item">
                  <span className="ui-pagination__ellipsis" aria-hidden="true">
                    …
                  </span>
                </li>
              );
            }
            const isActive = item === currentPage;
            return (
              <li key={item} className="ui-pagination__item">
                <button
                  type="button"
                  className={cn(
                    'ui-pagination__page',
                    isActive && 'ui-pagination__page--active',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Page ${item}`}
                  disabled={disabled}
                  onClick={() => goTo(item)}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="ui-pagination__nav"
          aria-label="Next page"
          disabled={disabled || isLast}
          onClick={() => goTo(currentPage + 1)}
        >
          <ChevronRightIcon width={20} height={20} />
        </button>
      </div>

      {showRowsPerPage ? (
        <div className="ui-pagination__rows">
          <span className="ui-pagination__rows-label">{rowsPerPageLabel}</span>
          <span className="ui-pagination__rows-select-shell">
            <select
              className="ui-pagination__rows-select"
              value={effectiveRowsPerPage}
              disabled={disabled}
              onChange={(event) => {
                const value = Number(event.currentTarget.value);
                onRowsPerPageChange?.(value);
              }}
              aria-label={rowsPerPageLabel}
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="ui-pagination__rows-chevron" aria-hidden="true">
              <ChevronDownIcon width={14} height={14} />
            </span>
          </span>
        </div>
      ) : null}
    </nav>
  );
}
