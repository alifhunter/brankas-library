import type { ReactNode } from 'react';
import type { GestureResponderEvent, ViewStyle } from 'react-native';

export type TrackerSize = 'medium' | 'large';
export type TrackerStepStatus = 'completed' | 'active' | 'pending';

export interface TrackerStep {
  key: string;
  label: string;
  supportingText?: string;
  status: TrackerStepStatus;
  onPress?: (event: GestureResponderEvent) => void;
  trailingIcon?: ReactNode;
  testID?: string;
}

export interface TrackerProps {
  steps: TrackerStep[];
  size?: TrackerSize;
  style?: ViewStyle;
  testID?: string;
}
