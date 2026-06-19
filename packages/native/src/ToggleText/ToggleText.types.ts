import type { ViewStyle } from 'react-native';

export type ToggleTextSide = 'left' | 'right';
export type ToggleTextTone = 'black' | 'white';

export interface ToggleTextProps {
  /** Label rendered on the left side (active when `value === 'left'`). */
  leftLabel: string;
  /** Label rendered on the right side (active when `value === 'right'`). */
  rightLabel: string;
  /** Which side is active. */
  value?: ToggleTextSide;
  defaultValue?: ToggleTextSide;
  onValueChange?: (next: ToggleTextSide) => void;
  /** Border + thumb tone. `black` for light surfaces, `white` for dark surfaces. */
  tone?: ToggleTextTone;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
