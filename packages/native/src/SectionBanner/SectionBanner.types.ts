import type { ViewStyle } from 'react-native';

export type SectionBannerTone = 'info' | 'warning' | 'error';

export interface SectionBannerProps {
  tone?: SectionBannerTone;
  children: string;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
