import type { ViewStyle } from 'react-native';

export type AnnouncementBannerVariant = 'dark' | 'light';

export interface AnnouncementBannerAction {
  label: string;
  onPress: () => void;
}

export interface AnnouncementBannerProps {
  title: string;
  description?: string;
  variant?: AnnouncementBannerVariant;
  action?: AnnouncementBannerAction;
  onDismiss?: () => void;
  style?: ViewStyle;
  testID?: string;
}
