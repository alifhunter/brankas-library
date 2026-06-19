import { cn } from '../../lib/cn.js';
import { Skeleton } from '../Skeleton/Skeleton.js';
import type { SearchResultPanelProps } from './Search.types';
import './Search.css';

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
      <path
        d="M5 12l5-5 5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
      <path
        d="M5 8l5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchResultPanel({
  state = 'default',
  items = [],
  emptyMessage = 'Tidak ada hasil yang cocok',
  defaultMessage = 'Ketik minimal 3 karakter',
  showNavigationHint = true,
  navigationLabel = 'Navigasi',
  shortcutLabel = 'Enter',
  shortcutHint = 'untuk mencari',
  className,
  ...rest
}: SearchResultPanelProps) {
  return (
    <div
      {...rest}
      role="listbox"
      className={cn('ui-search-panel', `ui-search-panel--${state}`, className)}
    >
      {state === 'default' ? (
        <p className="ui-search-panel__message">{defaultMessage}</p>
      ) : null}

      {state === 'empty' ? (
        <p className="ui-search-panel__message">{emptyMessage}</p>
      ) : null}

      {state === 'loading' ? (
        <div className="ui-search-panel__loading">
          <Skeleton width="100%" height={24} radius={4} />
        </div>
      ) : null}

      {state === 'result' ? (
        <div className="ui-search-panel__results">
          {showNavigationHint ? (
            <div className="ui-search-panel__hint-row">
              <div className="ui-search-panel__nav">
                <span className="ui-search-panel__keycap" aria-label="Up">
                  <ArrowUpIcon />
                </span>
                <span className="ui-search-panel__keycap" aria-label="Down">
                  <ArrowDownIcon />
                </span>
                <span className="ui-search-panel__hint-label">{navigationLabel}</span>
              </div>
              <div className="ui-search-panel__shortcut">
                <span className="ui-search-panel__hint-label">Tekan</span>
                <span className="ui-search-panel__keycap ui-search-panel__keycap--text">
                  {shortcutLabel}
                </span>
                <span className="ui-search-panel__hint-label">{shortcutHint}</span>
              </div>
            </div>
          ) : null}
          <ul className="ui-search-panel__list">
            {items.map((item, index) => (
              <li
                key={item.id ?? index}
                className={cn(
                  'ui-search-panel__item',
                  item.onClick && 'ui-search-panel__item--interactive',
                )}
                role="option"
                aria-selected={false}
                onClick={item.onClick}
              >
                <span className="ui-search-panel__item-label">{item.label}</span>
                {item.helper ? (
                  <span className="ui-search-panel__item-helper">{item.helper}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
