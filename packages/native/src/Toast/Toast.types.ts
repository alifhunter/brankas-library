import type { ViewStyle } from 'react-native';

export interface ToastProps {
  children: string;
  onDismiss?: () => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
