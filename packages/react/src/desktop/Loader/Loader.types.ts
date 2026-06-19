import type { HTMLAttributes } from 'react';

export interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
  /** Pixel size of the spinner. Default 64. Accepts a number (px) or CSS string. */
  size?: number | string;
  /** Stroke width in pixels. Default 6 for size=64; auto-scales when size changes. */
  thickness?: number;
  /** Use the inverse (light) color on dark backgrounds. Equivalent to passing color="var(--color-icon-inverse)". */
  inverse?: boolean;
  /**
   * Spinner color. Defaults to `currentColor`, so wrapping in any element with
   * a `color` value (or passing `style={{ color: ... }}`) tints the loader.
   * Pass any CSS color or token (e.g. `var(--color-icon-information)`).
   */
  color?: string;
  /** Accessible label announced to screen readers. Default "Loading". */
  label?: string;
}
