import type { ImageSourcePropType, ViewStyle } from 'react-native';

export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarTone = 'light' | 'dark';

export interface AvatarProps {
  size?: AvatarSize;
  tone?: AvatarTone;
  source?: ImageSourcePropType;
  initials?: string;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
