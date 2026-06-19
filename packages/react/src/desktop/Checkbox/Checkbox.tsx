import { forwardRef, useEffect, useId, useRef } from 'react';
import { cn } from '../../lib/cn.js';
import type { CheckboxProps } from './Checkbox.types';
import './Checkbox.css';

function resolveState(
  state: CheckboxProps['state'],
  disabled: boolean,
): NonNullable<CheckboxProps['state']> {
  if (state) {
    return state;
  }

  if (disabled) {
    return 'disabled';
  }

  return 'default';
}

function CheckIcon() {
  return (
    <svg
      className="ui-checkbox__check-icon"
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path d="M2.5 6.5L5 9L9.5 3.5" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      className="ui-checkbox__minus-icon"
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path d="M2 6H10" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg className="ui-checkbox__error-icon" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="currentColor" />
      <path d="M8 4.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.85" fill="white" />
    </svg>
  );
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    id,
    className,
    label,
    description,
    helperText,
    errorMessage,
    size = 'default',
    state,
    disabled,
    checked,
    defaultChecked,
    indeterminate = false,
    error = false,
    onChange,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `checkbox-${generatedId}`;
  const resolvedState = resolveState(state, Boolean(disabled));
  const isDisabled = resolvedState === 'disabled' || Boolean(disabled);
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error && errorMessage ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, helperId, errorId].filter(Boolean).join(' ') || undefined;

  const internalRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div
      className={cn(
        'ui-checkbox',
        `ui-checkbox--size-${size}`,
        `ui-checkbox--state-${resolvedState}`,
        error && 'ui-checkbox--error',
        indeterminate && 'ui-checkbox--indeterminate',
        isDisabled && 'ui-checkbox--disabled',
        className,
      )}
    >
      <label className="ui-checkbox__main" htmlFor={inputId}>
        <input
          {...props}
          id={inputId}
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="checkbox"
          className="ui-checkbox__input"
          disabled={isDisabled}
          aria-label={ariaLabel}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-invalid={error || undefined}
          aria-checked={indeterminate ? 'mixed' : undefined}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        <span className="ui-checkbox__control" aria-hidden="true">
          {indeterminate ? <MinusIcon /> : <CheckIcon />}
        </span>
        {label || description ? (
          <span className="ui-checkbox__content">
            {label ? (
              <span className="ui-checkbox__label" id={labelId}>
                {label}
              </span>
            ) : null}
            {description ? (
              <span className="ui-checkbox__description" id={descriptionId}>
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
      {helperText ? (
        <span className="ui-checkbox__helper" id={helperId}>
          {helperText}
        </span>
      ) : null}
      {error && errorMessage ? (
        <span className="ui-checkbox__error-message" id={errorId}>
          <ErrorIcon />
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
});
