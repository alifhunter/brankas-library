import { Image, StyleSheet, Text, View } from 'react-native';
import type { TextStyle } from 'react-native';
import { color, typography } from '../theme';
import { PersonIcon } from '../internal/icons';
import type { AvatarProps, AvatarSize, AvatarTone } from './Avatar.types';

const SIZE_MAP: Record<
  AvatarSize,
  { box: number; icon: number; initialsType: TextStyle }
> = {
  small: { box: 32, icon: 18, initialsType: typography.mobile.body.sm.semibold },
  medium: { box: 48, icon: 26, initialsType: typography.mobile.body.lg.semibold },
  large: { box: 64, icon: 34, initialsType: typography.mobile.body.xl.semibold },
};

const TONE_MAP: Record<AvatarTone, { bg: string; fg: string }> = {
  light: { bg: color.neutral['100'], fg: color.text.subtle },
  dark: { bg: color.neutral['600'], fg: color.background.default },
};

export function Avatar({
  size = 'medium',
  tone = 'light',
  source,
  initials,
  style,
  testID,
  accessibilityLabel,
}: AvatarProps) {
  const dims = SIZE_MAP[size];
  const tones = TONE_MAP[tone];

  const containerStyle = {
    width: dims.box,
    height: dims.box,
    borderRadius: dims.box / 2,
    backgroundColor: tones.bg,
  };

  return (
    <View
      style={[styles.root, containerStyle, style ?? {}]}
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? (initials ? `Avatar ${initials}` : 'Avatar')}
    >
      {source ? (
        <Image source={source} style={containerStyle} />
      ) : initials ? (
        <Text
          numberOfLines={1}
          style={[dims.initialsType, { color: tones.fg }]}
        >
          {initials.slice(0, 2).toUpperCase()}
        </Text>
      ) : (
        <PersonIcon size={dims.icon} color={tones.fg} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
