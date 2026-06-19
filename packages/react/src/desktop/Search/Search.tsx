import { forwardRef, useRef, useState } from 'react';
import { cn } from '../../lib/cn.js';
import { ChevronDownIcon, SearchIcon } from '../../shared/icons.js';
import { Button } from '../Button/Button.js';
import type { SearchProps } from './Search.types';
import './Search.css';

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" fill="currentColor" opacity="0.85" />
      <path
        d="M7.5 7.5l5 5M12.5 7.5l-5 5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShortcutHint({ shortcutKey }: { shortcutKey: string }) {
  return (
    <span className="ui-search__shortcut" aria-hidden="true">
      <span className="ui-search__shortcut-text">Press</span>
      <span className="ui-search__shortcut-kbd">{shortcutKey}</span>
      <span className="ui-search__shortcut-text">to search</span>
    </span>
  );
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  {
    value,
    defaultValue,
    placeholder = 'Search by username, employee no., full name, or email',
    onValueChange,
    showButton = false,
    buttonLabel = 'Cari',
    onButtonClick,
    showDropdown = false,
    dropdownLabel = 'Search by:',
    dropdownValue = 'All',
    onDropdownClick,
    showShortcutHint = true,
    shortcutKey = 'CTRL + K',
    showClearButton = true,
    onClear,
    disabled = false,
    onFocus,
    onBlur,
    className,
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
  const currentValue = isControlled ? value : internalValue;
  const hasValue = currentValue.length > 0;

  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const handleChange = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onValueChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div
      role="search"
      className={cn(
        'ui-search',
        focused && 'ui-search--focused',
        disabled && 'ui-search--disabled',
        className,
      )}
    >
      <div className="ui-search__bar">
        {showDropdown ? (
          <button
            type="button"
            className="ui-search__dropdown"
            disabled={disabled}
            onClick={onDropdownClick}
          >
            <span className="ui-search__dropdown-label">{dropdownLabel}</span>
            <span className="ui-search__dropdown-value">{dropdownValue}</span>
            <span className="ui-search__dropdown-chevron" aria-hidden="true">
              <ChevronDownIcon width={16} height={16} />
            </span>
          </button>
        ) : null}
        <div className="ui-search__field">
          <input
            {...rest}
            ref={setRef}
            type="search"
            className="ui-search__input"
            value={currentValue}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(event) => handleChange(event.currentTarget.value)}
            onFocus={(event) => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setFocused(false);
              onBlur?.(event);
            }}
          />
          {showShortcutHint ? <ShortcutHint shortcutKey={shortcutKey} /> : null}
          {hasValue && showClearButton && !disabled ? (
            <button
              type="button"
              className="ui-search__clear"
              aria-label="Clear search"
              onClick={handleClear}
            >
              <CloseIcon />
            </button>
          ) : null}
          <span className="ui-search__icon" aria-hidden="true">
            <SearchIcon width={20} height={20} />
          </span>
        </div>
      </div>
      {showButton ? (
        <Button size="large" disabled={disabled} variant="blue-primary" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      ) : null}
    </div>
  );
});
