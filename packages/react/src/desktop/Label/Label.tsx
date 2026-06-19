import type { ReactNode } from 'react';
import { cn } from '../../lib/cn.js';
import type { LabelProps, LabelVariant } from './Label.types';
import './Label.css';

function InfoIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="currentColor" />
      <path d="M6 5.5v3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="3.6" r="0.7" fill="white" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="currentColor" />
      <path
        d="M3.5 6.2l1.7 1.7L8.5 4.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path
        d="M6 1.2L11.2 10.4H0.8L6 1.2z"
        fill="currentColor"
      />
      <path d="M6 4.8v2.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="9" r="0.7" fill="white" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="currentColor" />
      <path d="M6 3.5v3.2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="8.4" r="0.7" fill="white" />
    </svg>
  );
}

const variantIcon: Record<LabelVariant, ReactNode> = {
  neutral: <InfoIcon />,
  information: <InfoIcon />,
  positive: <CheckIcon />,
  warning: <WarningIcon />,
  negative: <ErrorIcon />,
};

export function Label({
  variant = 'neutral',
  icon = true,
  children,
  className,
  onClick,
  role,
  tabIndex,
  ...rest
}: LabelProps) {
  const iconContent =
    icon === false ? null : icon === true ? variantIcon[variant] : icon;
  const interactive = Boolean(onClick);

  return (
    <span
      {...rest}
      onClick={onClick}
      role={role ?? (interactive ? 'button' : undefined)}
      tabIndex={tabIndex ?? (interactive ? 0 : undefined)}
      className={cn(
        'ui-label',
        `ui-label--${variant}`,
        interactive && 'ui-label--interactive',
        className,
      )}
    >
      {iconContent ? (
        <span className="ui-label__icon" aria-hidden="true">
          {iconContent}
        </span>
      ) : null}
      <span className="ui-label__text">{children}</span>
    </span>
  );
}
