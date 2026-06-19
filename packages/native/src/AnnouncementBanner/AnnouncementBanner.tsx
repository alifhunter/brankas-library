import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import { CloseIcon, InfoIcon } from '../internal/icons';
import type {
  AnnouncementBannerProps,
  AnnouncementBannerVariant,
} from './AnnouncementBanner.types';

const VARIANT_MAP: Record<
  AnnouncementBannerVariant,
  { bg: string; fg: string; sub: string; link: string }
> = {
  dark: {
    bg: color.background['primary-blue'],
    fg: color.text.inverse,
    sub: color.neutral['300'],
    link: color.text.inverse,
  },
  light: {
    bg: color.background.subtle,
    fg: color.text.default,
    sub: color.text.subtle,
    link: color.text.default,
  },
};

export function AnnouncementBanner({
  title,
  description,
  variant = 'dark',
  action,
  onDismiss,
  style,
  testID,
}: AnnouncementBannerProps) {
  const tones = VARIANT_MAP[variant];
  return (
    <View
      style={[styles.root, { backgroundColor: tones.bg }, style ?? {}]}
      accessibilityRole="alert"
      testID={testID}
    >
      <View style={styles.icon}>
        <InfoIcon size={20} color={tones.fg} />
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { color: tones.fg }]}>{title}</Text>
        {description ? (
          <Text style={[styles.description, { color: tones.sub }]}>{description}</Text>
        ) : null}
        {action ? (
          <Pressable onPress={action.onPress} hitSlop={6} accessibilityRole="link">
            <Text style={[styles.link, { color: tones.link }]}>{action.label}</Text>
          </Pressable>
        ) : null}
      </View>
      {onDismiss ? (
        <Pressable
          onPress={onDismiss}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={styles.close}
        >
          <CloseIcon size={20} color={tones.fg} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  icon: {
    marginTop: 2,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  title: {
    ...typography.mobile.heading.h6.bold,
  },
  description: {
    ...typography.mobile.body.sm.regular,
  },
  link: {
    ...typography.mobile.body.sm.semibold,
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  close: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
