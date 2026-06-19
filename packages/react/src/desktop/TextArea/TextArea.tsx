import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';
import type { TextAreaProps } from './TextArea.types';
import './TextArea.css';

function ErrorIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="currentColor" />
      <path d="M10 6v5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="13.6" r="0.95" fill="white" />
    </svg>
  );
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    id,
    label,
    helperText,
    helperPosition = 'below',
    counterText,
    errorMessage,
    state,
    required,
    disabled,
    className,
    onFocus,
    onBlur,
    rows = 4,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? `textarea-${generatedId}`;
  const labelId = label ? `${textareaId}-label` : undefined;
  const helperId = helperText ? `${textareaId}-helper` : undefined;
  const errorId = errorMessage ? `${textareaId}-error` : undefined;
  const counterId = counterText ? `${textareaId}-counter` : undefined;
  const describedBy =
    [helperId, errorId, counterId].filter(Boolean).join(' ') || undefined;

  const isError = state === 'error' || Boolean(errorMessage);
  const isDisabled = state === 'disabled' || Boolean(disabled);
  const resolvedState: TextAreaProps['state'] = isError
    ? 'error'
    : isDisabled
      ? 'disabled'
      : (state ?? 'default');

  return (
    <div
      className={cn(
        'ui-textarea',
        `ui-textarea--state-${resolvedState}`,
        `ui-textarea--helper-${helperPosition}`,
        isError && 'ui-textarea--error',
        isDisabled && 'ui-textarea--disabled',
        className,
      )}
    >
      <div className="ui-textarea__title-group">
        {label ? (
          <label id={labelId} htmlFor={textareaId} className="ui-textarea__label">
            {label}
            {required ? <span className="ui-textarea__required" aria-hidden="true"> *</span> : null}
          </label>
        ) : null}
        {helperPosition === 'above' && helperText && !isError ? (
          <p id={helperId} className="ui-textarea__helper ui-textarea__helper--above">
            {helperText}
          </p>
        ) : null}
      </div>

      <div className="ui-textarea__control-shell">
        <textarea
          {...rest}
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={isDisabled}
          required={required}
          aria-invalid={isError || undefined}
          aria-describedby={describedBy}
          className="ui-textarea__input"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      {isError ? (
        <div className="ui-textarea__error-row">
          <span className="ui-textarea__error-icon" aria-hidden="true">
            <ErrorIcon />
          </span>
          <p id={errorId} className="ui-textarea__error-message">
            {errorMessage}
          </p>
          {counterText !== undefined && counterText !== null ? (
            <span id={counterId} className="ui-textarea__counter">
              {counterText}
            </span>
          ) : null}
        </div>
      ) : helperPosition === 'below' ? (
        helperText || counterText !== undefined ? (
          <div className="ui-textarea__bottom-row">
            {helperText ? (
              <p id={helperId} className="ui-textarea__helper ui-textarea__helper--below">
                {helperText}
              </p>
            ) : (
              <span className="ui-textarea__helper-spacer" />
            )}
            {counterText !== undefined && counterText !== null ? (
              <span id={counterId} className="ui-textarea__counter">
                {counterText}
              </span>
            ) : null}
          </div>
        ) : null
      ) : counterText !== undefined && counterText !== null ? (
        <span id={counterId} className="ui-textarea__counter ui-textarea__counter--standalone">
          {counterText}
        </span>
      ) : null}
    </div>
  );
});
