import { cn } from '../../lib/cn.js';
import type { LoaderProps } from './Loader.types';
import './Loader.css';

export function Loader({
  size = 64,
  thickness,
  inverse = false,
  color,
  label = 'Loading',
  className,
  style,
  ...rest
}: LoaderProps) {
  const px = typeof size === 'number' ? size : Number.parseFloat(size) || 64;
  // Default stroke scales with size: 6 / 64 ≈ 9.4% — matches Figma's 9.11% inset.
  const stroke = thickness ?? Math.max(2, Math.round(px * 0.094));
  const radius = (px - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  // Visible arc ~75% of circle; the remaining gap is what spins around.
  const visible = circumference * 0.75;
  const gap = circumference - visible;
  const cssSize = typeof size === 'number' ? `${size}px` : size;

  const resolvedColor =
    color ?? (inverse ? 'var(--color-icon-inverse, #ffffff)' : 'currentColor');

  return (
    <span
      {...rest}
      role="status"
      aria-label={label}
      className={cn('ui-loader', className)}
      style={{
        ...style,
        width: cssSize,
        height: cssSize,
        color: resolvedColor,
      }}
    >
      <svg
        className="ui-loader__svg"
        viewBox={`0 0 ${px} ${px}`}
        width={px}
        height={px}
        aria-hidden="true"
      >
        <circle
          className="ui-loader__track"
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${visible} ${gap}`}
        />
      </svg>
      <span className="ui-loader__sr-only">{label}</span>
    </span>
  );
}
