import type { HTMLAttributes } from 'react';

export type BadgeType = 'number' | 'dot' | 'new';
export type BadgeColor = 'gray' | 'primary' | 'red' | 'blue';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  type?: BadgeType;
  color?: BadgeColor;
  text?: string | number;
}
