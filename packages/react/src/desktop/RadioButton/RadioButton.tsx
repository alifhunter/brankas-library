import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';
import type { RadioButtonProps } from './RadioButton.types';
import './RadioButton.css';

function resolveState(
  state: RadioButtonProps['state'],
  disabled: boolean,
): NonNullable<RadioButtonProps['state']> {
  if (state) {
    return state;
  }

  if (disabled) {
    return 'disabled';
  }

  return 'default';
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
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
  const inputId = id ?? `radio-${generatedId}`;
  const resolvedState = resolveState(state, Boolean(disabled));
  const isDisabled = resolvedState === 'disabled' || Boolean(disabled);
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [descriptionId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={cn(
        'ui-radio',
        `ui-radio--size-${size}`,
        `ui-radio--state-${resolvedState}`,
        isDisabled && 'ui-radio--disabled',
        className,
      )}
    >
      <label className="ui-radio__main" htmlFor={inputId}>
        <input
          {...props}
          id={inputId}
          ref={ref}
          type="radio"
          className="ui-radio__input"
          disabled={isDisabled}
          aria-label={ariaLabel}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          checked={checked}
          defaultChecked={defaultChecked}
        />
        <span className="ui-radio__control" aria-hidden="true">
          <span className="ui-radio__dot" />
        </span>
        <span className="ui-radio__content">
          {label ? (
            <span className="ui-radio__label" id={labelId}>
              {label}
            </span>
          ) : null}
          {description ? (
            <span className="ui-radio__description" id={descriptionId}>
              {description}
            </span>
          ) : null}
        </span>
      </label>
      {helperText ? (
        <span className="ui-radio__helper" id={helperId}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
});
