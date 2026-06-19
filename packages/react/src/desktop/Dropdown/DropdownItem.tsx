import { cn } from '../../lib/cn.js';
import type { DropdownItemProps } from './Dropdown.types';

export function DropdownItem({
  children,
  disabled = false,
  variant = 'default',
  leadingIcon,
  trailingIcon,
  onClick,
  className,
  onKeyDown,
  ...rest
}: DropdownItemProps) {
  return (
    <li
      {...rest}
      role="menuitem"
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'ui-dropdown__item',
        `ui-dropdown__item--${variant}`,
        disabled && 'ui-dropdown__item--disabled',
        className,
      )}
      onClick={(event) => {
        if (disabled) return;
        onClick?.(event);
      }}
      onKeyDown={(event) => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          // Cast to MouseEvent-shaped object — the consumer only typically reads target/currentTarget.
          onClick?.(event as unknown as React.MouseEvent<HTMLLIElement>);
        }
        onKeyDown?.(event);
      }}
    >
      {leadingIcon ? (
        <span className="ui-dropdown__item-icon ui-dropdown__item-icon--leading" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <span className="ui-dropdown__item-label">{children}</span>
      {trailingIcon ? (
        <span className="ui-dropdown__item-icon ui-dropdown__item-icon--trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </li>
  );
}
