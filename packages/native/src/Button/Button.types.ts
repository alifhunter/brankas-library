import type { ReactNode } from 'react';
import type { AccessibilityProps, GestureResponderEvent, ViewStyle } from 'react-native';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'tertiaryInvert'
  | 'tertiaryBlue'
  | 'tertiaryRed'
  | 'glassmorphism';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends AccessibilityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
