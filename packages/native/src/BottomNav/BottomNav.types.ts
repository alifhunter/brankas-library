import type { ReactNode } from 'react';
import type { GestureResponderEvent, ViewStyle } from 'react-native';

export interface BottomNavIconProps {
  color: string;
  size: number;
}

export interface BottomNavItem {
  key: string;
  label: string;
  icon: (props: BottomNavIconProps) => ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  active?: boolean;
  badge?: number | string;
  accessibilityLabel?: string;
  testID?: string;
}

export interface BottomNavQris {
  icon: (props: BottomNavIconProps) => ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityLabel?: string;
  testID?: string;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  qris?: BottomNavQris;
  style?: ViewStyle;
  testID?: string;
}
