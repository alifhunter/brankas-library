import type { ViewStyle } from 'react-native';

export type BadgeVariant = 'solid' | 'outline' | 'dot' | 'ring';

export interface BadgeProps {
  label?: string | number;
  variant?: BadgeVariant;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
