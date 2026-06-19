import { StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import { ErrorIcon, InfoIcon, WarningIcon } from '../internal/icons';
import type { SectionBannerProps, SectionBannerTone } from './SectionBanner.types';

const TONE_MAP: Record<
  SectionBannerTone,
  { bg: string; accent: string; Icon: React.ComponentType<{ size?: number; color?: string }> }
> = {
  info: {
    bg: color.background['information-light'],
    accent: color.text.informational,
    Icon: InfoIcon,
  },
  warning: {
    bg: color.background['warning-light'],
    accent: color.text.warning,
    Icon: WarningIcon,
  },
  error: {
    bg: color.background['error-light'],
    accent: color.text.error,
    Icon: ErrorIcon,
  },
};

export function SectionBanner({
  tone = 'info',
  children,
  style,
  testID,
  accessibilityLabel,
}: SectionBannerProps) {
  const { bg, accent, Icon } = TONE_MAP[tone];
  return (
    <View
      style={[styles.root, { backgroundColor: bg }, style ?? {}]}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <View style={styles.icon}>
        <Icon size={20} color={accent} />
      </View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  icon: {
    marginTop: 2,
  },
  text: {
    flex: 1,
    ...typography.mobile.body.md.regular,
    color: color.text.default,
  },
});
