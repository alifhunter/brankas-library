import { cn } from '../../lib/cn.js';
import type { SkeletonProps } from './Skeleton.types';
import './Skeleton.css';

function toCss(value: number | string | undefined, fallback: string): string {
  if (value === undefined) return fallback;
  return typeof value === 'number' ? `${value}px` : value;
}

export function Skeleton({
  shape = 'rectangle',
  width,
  height,
  radius,
  animated = true,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const isCircle = shape === 'circle';
  const resolvedWidth = toCss(width, isCircle ? '64px' : '485px');
  const resolvedHeight = toCss(isCircle ? width : height, isCircle ? '64px' : '24px');
  const resolvedRadius = toCss(radius, isCircle ? '50%' : '4px');

  return (
    <span
      {...rest}
      role="status"
      aria-hidden="true"
      className={cn(
        'ui-skeleton',
        `ui-skeleton--${shape}`,
        animated && 'ui-skeleton--animated',
        className,
      )}
      style={{
        ...style,
        width: resolvedWidth,
        height: resolvedHeight,
        borderRadius: resolvedRadius,
      }}
    />
  );
}
