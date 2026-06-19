import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface OverlayProps {
  open: boolean;
  onDismiss?: () => void;
  dismissOnBackdropPress?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
  backdropStyle?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
