import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';
import type { TextFieldProps, TextFieldVisualState } from './TextField.types';
import './TextField.css';

function ErrorIcon() {
  return (
    <span className="ui-textfield__error-icon" aria-hidden="true">
      !
    </span>
  );
}

function PlaceholderIcon() {
  return (
    <span className="ui-textfield__placeholder-icon" aria-hidden="true">
      ◌
    </span>
  );
}

function getValueText(value: TextFieldProps['value'] | TextFieldProps['defaultValue']): string {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return '';
}

function resolveVisualState(
  state: TextFieldProps['state'],
  disabled: boolean,
  hasError: boolean,
  hasValue: boolean,
): TextFieldVisualState {
  if (state) {
    return state;
  }

  if (disabled) {
    return 'disabled';
  }

  if (hasError) {
    return hasValue ? 'error-filled' : 'error-default';
  }

  if (hasValue) {
    return 'filled';
  }

  return 'default';
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    id,
    label,
    size = '48px',
    state,
    helperTextTop,
    helperText,
    errorMessage,
    counterText,
    showLeadingIcon = true,
    showTrailingIcon = true,
    required,
    className,
    disabled,
    value,
    defaultValue,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `textfield-${generatedId}`;
  const helperTopId = helperTextTop ? `${inputId}-helper-top` : undefined;
  const helperBottomId = helperText ? `${inputId}-helper-bottom` : undefined;
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const describedBy = [errorId, helperBottomId, helperTopId].filter(Boolean).join(' ') || undefined;

  const hasError = Boolean(errorMessage);
  const valueText = getValueText(value ?? defaultValue);
  const hasValue = valueText.length > 0;
  const resolvedState = resolveVisualState(state, Boolean(disabled), hasError, hasValue);

  const isDisabled = resolvedState === 'disabled' || Boolean(disabled);
  const isError = resolvedState === 'error-default' || resolvedState === 'error-filled' || hasError;
  const isFocusedVisual = resolvedState === 'focused' || resolvedState === 'typing';

  return (
    <div className={cn('ui-textfield', `ui-textfield--size-${size}`, className)}>
      <div className="ui-textfield__title-group">
        <label className="ui-textfield__label" htmlFor={inputId}>
          {label}
          {required ? <span className="ui-textfield__required">*</span> : null}
        </label>
        {helperTextTop ? (
          <p className="ui-textfield__helper-top" id={helperTopId}>
            {helperTextTop}
          </p>
        ) : null}
      </div>

      <div className={cn('ui-textfield__control-shell', isFocusedVisual && 'ui-textfield__control-shell--focused')}>
        <div
          className={cn(
            'ui-textfield__control',
            isError && 'ui-textfield__control--error',
            isDisabled && 'ui-textfield__control--disabled',
          )}
        >
          {showLeadingIcon ? (
            <span className="ui-textfield__icon">
              <PlaceholderIcon />
            </span>
          ) : null}
          <div className="ui-textfield__input-wrap">
            <input
              id={inputId}
              ref={ref}
              className="ui-textfield__input"
              aria-invalid={isError}
              aria-describedby={describedBy}
              required={required}
              disabled={isDisabled}
              value={value}
              defaultValue={defaultValue}
              {...props}
            />
          </div>
          {showTrailingIcon ? (
            <span className="ui-textfield__icon">
              <PlaceholderIcon />
            </span>
          ) : null}
        </div>
      </div>

      {isError && errorMessage ? (
        <div className="ui-textfield__bottom-row ui-textfield__bottom-row--error" id={errorId} role="alert">
          <ErrorIcon />
          <p className="ui-textfield__error-text">{errorMessage}</p>
          {counterText ? <p className="ui-textfield__counter">{counterText}</p> : null}
        </div>
      ) : helperText || counterText ? (
        <div className="ui-textfield__bottom-row" id={helperBottomId}>
          {helperText ? <p className="ui-textfield__helper-bottom">{helperText}</p> : <span />}
          {counterText ? <p className="ui-textfield__counter">{counterText}</p> : null}
        </div>
      ) : null}
    </div>
  );
});
