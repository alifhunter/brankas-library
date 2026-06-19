import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';
import type { ToggleProps } from './Toggle.types';
import './Toggle.css';

function resolveState(
  state: ToggleProps['state'],
  disabled: boolean,
): NonNullable<ToggleProps['state']> {
  if (state) {
    return state;
  }

  if (disabled) {
    return 'disabled';
  }

  return 'default';
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    id,
    className,
    label,
    description,
    helperText,
    size = 'default',
    state,
    disabled,
    checked,
    defaultChecked,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `toggle-${generatedId}`;
  const resolvedState = resolveState(state, Boolean(disabled));
  const isDisabled = resolvedState === 'disabled' || Boolean(disabled);
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [descriptionId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={cn(
        'ui-toggle',
        `ui-toggle--size-${size}`,
        `ui-toggle--state-${resolvedState}`,
        isDisabled && 'ui-toggle--disabled',
        className,
      )}
    >
      <label className="ui-toggle__main" htmlFor={inputId}>
        <input
          {...props}
          id={inputId}
          ref={ref}
          type="checkbox"
          role="switch"
          className="ui-toggle__input"
          disabled={isDisabled}
          aria-label={ariaLabel}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          checked={checked}
          defaultChecked={defaultChecked}
        />
        <span className="ui-toggle__control" aria-hidden="true">
          <span className="ui-toggle__thumb" />
        </span>
        {(label || description) && (
          <span className="ui-toggle__content">
            {label ? (
              <span className="ui-toggle__label" id={labelId}>
                {label}
              </span>
            ) : null}
            {description ? (
              <span className="ui-toggle__description" id={descriptionId}>
                {description}
              </span>
            ) : null}
          </span>
        )}
      </label>
      {helperText ? (
        <span className="ui-toggle__helper" id={helperId}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
});
