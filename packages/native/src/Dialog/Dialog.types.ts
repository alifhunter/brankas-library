import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface DialogProps {
  open: boolean;
  onDismiss: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  dismissOnBackdropPress?: boolean;
  style?: ViewStyle;
  testID?: string;
}
