import type { HTMLAttributes } from 'react';

export type SkeletonShape = 'rectangle' | 'circle';

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Shape preset. `circle` forces a 1:1 aspect and pill border-radius. Default `rectangle`. */
  shape?: SkeletonShape;
  /** Pixel width (number) or CSS value (string). Default 485 for rectangle, 64 for circle. */
  width?: number | string;
  /** Pixel height (number) or CSS value (string). Default 24 for rectangle. Ignored for circle. */
  height?: number | string;
  /** Override border-radius. Defaults: rectangle = 4px, circle = 50%. */
  radius?: number | string;
  /** Toggle the subtle shimmer animation. Default true. Disables itself under `prefers-reduced-motion`. */
  animated?: boolean;
}
