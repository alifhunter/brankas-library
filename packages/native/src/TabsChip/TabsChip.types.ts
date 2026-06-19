import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface TabsChipOption<V extends string = string> {
  value: V;
  label: string;
  /**
   * Optional leading slot. Pass a flag image, currency icon, or any
   * ReactNode. When omitted the chip is text-only.
   */
  icon?: ReactNode;
  accessibilityLabel?: string;
}

export interface TabsChipProps<V extends string = string> {
  options: readonly TabsChipOption<V>[];
  value?: V;
  defaultValue?: V;
  onValueChange?: (next: V) => void;
  /**
   * Translucent / solid contrast.
   * - `light` (default) — for use over a coloured surface. Inactive chips
   *   are translucent white with a border; active is opaque white with
   *   dark text.
   * - `dark` — for use over a white surface. Inactive chips are subtle
   *   grey; active is solid navy.
   */
  tone?: 'light' | 'dark';
  /** Horizontal scroll wrapper. Default true so chip rows don't squeeze. */
  scrollable?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}
