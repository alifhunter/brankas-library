import { cn } from '../../lib/cn.js';
import type { ProgressBarProps } from './ProgressBar.types';
import './ProgressBar.css';

export function ProgressBar({
  value = 0,
  size = 'small',
  variant = 'default',
  className,
  ...rest
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      {...rest}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn(
        'ui-progressbar',
        `ui-progressbar--${size}`,
        `ui-progressbar--${variant}`,
        className,
      )}
    >
      <div
        className="ui-progressbar__fill"
        style={{ width: clamped === 0 ? 0 : `${clamped}%` }}
      />
    </div>
  );
}
