import type { ViewStyle } from 'react-native';

export interface TabsOption<V extends string = string> {
  value: V;
  label: string;
  accessibilityLabel?: string;
}

export interface TabsProps<V extends string = string> {
  options: readonly TabsOption<V>[];
  value?: V;
  defaultValue?: V;
  onValueChange?: (next: V) => void;
  /**
   * Tone of the tab bar.
   * - `light` (default) — for use over a coloured surface (the brand red
   *   header). Text is white, active underline is white.
   * - `dark` — for use over a plain white surface. Text is navy, active
   *   underline is navy.
   */
  tone?: 'light' | 'dark';
  /**
   * Horizontal scroll wrapper. Default true so long tab labels don't squeeze.
   */
  scrollable?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}
