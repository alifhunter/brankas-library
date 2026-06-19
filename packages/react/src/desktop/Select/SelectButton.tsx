import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import { ChevronDownIcon } from '../../shared/icons.js';
import type { SelectButtonProps } from './Select.types';
import './Select.css';

export const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(function SelectButton(
  {
    label,
    value,
    placeholder = 'Select',
    badge,
    state,
    leadingIcon,
    trailingIcon,
    open = false,
    helperText,
    disabled,
    type = 'button',
    className,
    'aria-haspopup': ariaHaspopup,
    'aria-expanded': ariaExpanded,
    ...rest
  },
  ref,
) {
  const visualState = state ?? 'default';
  const showValue = value !== undefined && value !== null && value !== '';

  return (
    <div className={cn('ui-select-button-wrapper', className)}>
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled}
        aria-haspopup={ariaHaspopup ?? 'listbox'}
        aria-expanded={ariaExpanded ?? open}
        className={cn(
          'ui-select-button',
          `ui-select-button--state-${visualState}`,
          open && 'ui-select-button--open',
          disabled && 'ui-select-button--disabled',
        )}
      >
        {leadingIcon ? (
          <span className="ui-select-button__icon ui-select-button__icon--leading" aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}
        {label ? <span className="ui-select-button__label">{label}</span> : null}
        <span
          className={cn(
            'ui-select-button__value',
            !showValue && 'ui-select-button__value--placeholder',
          )}
        >
          {showValue ? value : placeholder}
        </span>
        {trailingIcon ? (
          <span className="ui-select-button__icon ui-select-button__icon--trailing" aria-hidden="true">
            {trailingIcon}
          </span>
        ) : null}
        {badge !== undefined && badge !== null && badge !== '' ? (
          <span className="ui-select-button__badge">{badge}</span>
        ) : null}
        <span className="ui-select-button__chevron" aria-hidden="true">
          <ChevronDownIcon width={20} height={20} />
        </span>
      </button>
      {helperText ? <span className="ui-select-button__helper">{helperText}</span> : null}
    </div>
  );
});
