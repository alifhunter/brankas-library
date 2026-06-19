import { cn } from '../../lib/cn.js';
import { XIcon } from '../../shared/icons.js';
import type { ToastProps } from './Toast.types';
import './Toast.css';

function InfoIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="currentColor" />
      <path d="M10 9v5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="6.6" r="0.95" fill="white" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="currentColor" />
      <path
        d="M6 10.4l2.7 2.7L14 7.8"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path d="M10 1.6L19 17.4H1L10 1.6z" fill="currentColor" />
      <path d="M10 7.5v4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.95" fill="white" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="currentColor" />
      <path d="M10 5.8V11" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="13.8" r="0.95" fill="white" />
    </svg>
  );
}

const TypeIcon = {
  general: InfoIcon,
  information: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export function Toast({
  type = 'general',
  children,
  close = false,
  onClose,
  action,
  className,
  role,
  ...rest
}: ToastProps) {
  const Icon = TypeIcon[type];
  const liveRole = role ?? (type === 'error' ? 'alert' : 'status');

  return (
    <div
      {...rest}
      role={liveRole}
      className={cn('ui-toast', `ui-toast--${type}`, className)}
    >
      <span className="ui-toast__icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="ui-toast__message">{children}</span>
      {action ? (
        <button
          type="button"
          className="ui-toast__action"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ) : null}
      {close ? (
        <button
          type="button"
          className="ui-toast__close"
          aria-label="Close"
          onClick={onClose}
        >
          <XIcon width={20} height={20} />
        </button>
      ) : null}
    </div>
  );
}
