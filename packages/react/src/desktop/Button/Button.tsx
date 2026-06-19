import { cn } from '../../lib/cn.js';
import type { ButtonProps, ButtonSize } from './Button.types.js';
import './Button.css';

const sizeClass: Record<ButtonSize, string> = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  'extra-large': 'xl',
};

export function Button({
  children = 'Button',
  variant = 'primary',
  size = 'large',
  state = 'default',
  loading = false,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  disabled,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading || state === 'disabled';

  return (
    <button
      type={type}
      className={cn(
        'ui-button',
        `ui-button--${variant}`,
        `ui-button--${sizeClass[size]}`,
        iconOnly && 'ui-button--icon-only',
        state !== 'default' && `ui-button--state-${state}`,
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span className="ui-button__spinner" aria-hidden="true" />
      ) : leadingIcon ? (
        <span className="ui-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      {!iconOnly && <span className="ui-button__label">{children}</span>}
      {!loading && trailingIcon ? (
        <span className="ui-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </button>
  );
}
