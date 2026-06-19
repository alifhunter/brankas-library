import { cn } from '../../lib/cn.js';
import type { BadgeColor, BadgeProps } from './Badge.types';
import './Badge.css';

function resolveColor(type: BadgeProps['type'], color: BadgeProps['color']): BadgeColor {
  if (type === 'number') {
    return color ?? 'gray';
  }

  if (color === 'red' || color === 'blue') {
    return color;
  }

  return 'red';
}

export function Badge({ type = 'number', color, text, className, ...props }: BadgeProps) {
  const resolvedColor = resolveColor(type, color);
  const content = type === 'dot' ? null : type === 'new' ? String(text ?? 'New') : String(text ?? '9');

  return (
    <span
      className={cn(
        'ui-badge',
        `ui-badge--type-${type}`,
        `ui-badge--color-${resolvedColor}`,
        className,
      )}
      {...props}
    >
      {content}
    </span>
  );
}
