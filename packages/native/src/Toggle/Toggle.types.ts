import type { AccessibilityProps, ViewStyle } from 'react-native';

export interface ToggleProps extends AccessibilityProps {
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: (next: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}
