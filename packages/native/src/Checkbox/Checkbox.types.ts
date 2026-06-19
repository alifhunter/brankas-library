import type { AccessibilityProps, GestureResponderEvent, ViewStyle } from 'react-native';

export interface CheckboxProps extends AccessibilityProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange?: (next: boolean) => void;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  testID?: string;
}
