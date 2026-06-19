import { cn } from '../../lib/cn.js';
import type { SelectItemProps } from './Select.types';

export function SelectItem({
  children,
  selected = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  onClick,
  className,
  onKeyDown,
  ...rest
}: SelectItemProps) {
  return (
    <li
      {...rest}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'ui-select-item',
        selected && 'ui-select-item--selected',
        disabled && 'ui-select-item--disabled',
        className,
      )}
      onClick={() => {
        if (disabled) return;
        onClick?.();
      }}
      onKeyDown={(event) => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick?.();
        }
        onKeyDown?.(event);
      }}
    >
      {leadingIcon ? (
        <span className="ui-select-item__icon ui-select-item__icon--leading" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <span className="ui-select-item__label">{children}</span>
      {trailingIcon ? (
        <span className="ui-select-item__icon ui-select-item__icon--trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </li>
  );
}
