import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type CurveBackgroundDirection = 'down' | 'up';

export interface CurveBackgroundProps {
  color?: string;
  height?: number;
  curveDepth?: number;
  direction?: CurveBackgroundDirection;
  width?: number | string;
  style?: ViewStyle;
  children?: ReactNode;
  testID?: string;
}
