import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface BottomSheetProps {
  open: boolean;
  onDismiss: () => void;
  title?: string;
  supportingText?: string;
  illustration?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  dismissOnBackdropPress?: boolean;
  testID?: string;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}
