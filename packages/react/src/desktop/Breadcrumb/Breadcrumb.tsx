import { Fragment } from 'react';
import { cn } from '../../lib/cn.js';
import { ChevronRightIcon } from '../../shared/icons.js';
import type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb.types';
import './Breadcrumb.css';

type VisibleEntry =
  | { type: 'item'; item: BreadcrumbItem; index: number }
  | { type: 'ellipsis' };

function buildVisibleEntries(items: BreadcrumbItem[], collapseAfter: number): VisibleEntry[] {
  if (items.length <= collapseAfter) {
    return items.map((item, index) => ({ type: 'item' as const, item, index }));
  }

  const leadingCount = Math.max(collapseAfter - 1, 1);
  const leading = items.slice(0, leadingCount).map((item, index) => ({
    type: 'item' as const,
    item,
    index,
  }));
  const lastIndex = items.length - 1;

  const lastItem = items[lastIndex];
  if (!lastItem) {
    return leading;
  }

  return [
    ...leading,
    { type: 'ellipsis' as const },
    { type: 'item' as const, item: lastItem, index: lastIndex },
  ];
}

export function Breadcrumb({
  items,
  activeIndex,
  collapseAfter = 5,
  onItemClick,
  className,
  ...props
}: BreadcrumbProps) {
  const effectiveActiveIndex = activeIndex ?? Math.max(items.length - 1, 0);
  const entries = buildVisibleEntries(items, collapseAfter);

  return (
    <nav className={cn('ui-breadcrumb', className)} aria-label="Breadcrumb" {...props}>
      <ol className="ui-breadcrumb__list">
        {entries.map((entry, visibleIndex) => (
          <li
            key={entry.type === 'item' ? `item-${entry.index}-${entry.item.label}` : `ellipsis-${visibleIndex}`}
            className="ui-breadcrumb__segment"
          >
            {visibleIndex > 0 ? (
              <ChevronRightIcon className="ui-breadcrumb__separator" />
            ) : null}

            {entry.type === 'ellipsis' ? (
              <span className="ui-breadcrumb__ellipsis">...</span>
            ) : (
              <Fragment>
                {entry.item.href && entry.index !== effectiveActiveIndex ? (
                  <a className="ui-breadcrumb__item" href={entry.item.href}>
                    {entry.item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      'ui-breadcrumb__item',
                      entry.index === effectiveActiveIndex && 'ui-breadcrumb__item--active',
                    )}
                    aria-current={entry.index === effectiveActiveIndex ? 'page' : undefined}
                    disabled={entry.index === effectiveActiveIndex}
                    onClick={() => onItemClick?.(entry.index, entry.item)}
                  >
                    {entry.item.label}
                  </button>
                )}
              </Fragment>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
