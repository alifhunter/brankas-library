import { useState } from 'react';
import { cn } from '../../lib/cn.js';
import { SearchIcon } from '../../shared/icons.js';
import { Button } from '../Button/Button.js';
import type { SelectPanelProps } from './Select.types';
import './Select.css';

function DefaultEmptyIllustration() {
  return (
    <svg viewBox="0 0 96 96" width="96" height="96" aria-hidden="true">
      <rect x="14" y="26" width="68" height="52" rx="6" fill="#e0e6ed" />
      <rect x="14" y="26" width="68" height="14" rx="6" fill="#c0c7d1" />
      <circle cx="68" cy="64" r="14" fill="#f7f9fa" stroke="#8d8d8d" strokeWidth="1.6" />
      <path
        d="M64 60l8 8M72 60l-8 8"
        stroke="#8d8d8d"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SelectPanel({
  children,
  width = 250,
  maxHeight = 240,
  searchable = false,
  searchValue,
  defaultSearchValue,
  searchPlaceholder = 'Search...',
  onSearchChange,
  showApplyButton = false,
  applyLabel = 'Terapkan',
  onApply,
  empty = false,
  emptyMessage = 'No data.',
  emptyIllustration,
  className,
  style,
  ...rest
}: SelectPanelProps) {
  const isSearchControlled = searchValue !== undefined;
  const [internalSearch, setInternalSearch] = useState(defaultSearchValue ?? '');
  const currentSearch = isSearchControlled ? searchValue : internalSearch;

  const handleSearchChange = (next: string) => {
    if (!isSearchControlled) setInternalSearch(next);
    onSearchChange?.(next);
  };

  return (
    <div
      {...rest}
      role="dialog"
      className={cn('ui-select-panel', className)}
      style={{
        ...style,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
    >
      {searchable ? (
        <div className="ui-select-panel__search">
          <span className="ui-select-panel__search-icon" aria-hidden="true">
            <SearchIcon width={20} height={20} />
          </span>
          <input
            type="search"
            className="ui-select-panel__search-input"
            value={currentSearch}
            placeholder={searchPlaceholder}
            onChange={(event) => handleSearchChange(event.currentTarget.value)}
            aria-label="Search options"
          />
        </div>
      ) : null}

      {empty ? (
        <div className="ui-select-panel__empty">
          {emptyIllustration ?? <DefaultEmptyIllustration />}
          <p className="ui-select-panel__empty-message">{emptyMessage}</p>
        </div>
      ) : (
        <ul
          role="listbox"
          className="ui-select-panel__list"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {children}
        </ul>
      )}

      {showApplyButton && !empty ? (
        <div className="ui-select-panel__apply-row">
          <Button variant="secondary" size="medium" onClick={onApply} style={{ width: '100%' }}>
            {applyLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
