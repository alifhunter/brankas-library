import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface AccordionProps {
  title: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  leadingIcon?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  testID?: string;
}
