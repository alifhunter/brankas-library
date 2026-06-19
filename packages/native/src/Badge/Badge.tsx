import { StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import type { BadgeProps } from './Badge.types';

const BRAND_RED = color.background['primary-red'];
const WHITE = color.background.default;

export function Badge({
  label,
  variant = 'solid',
  style,
  testID,
  accessibilityLabel,
}: BadgeProps) {
  if (variant === 'dot') {
    return (
      <View
        style={[styles.dot, style ?? {}]}
        testID={testID}
        accessibilityLabel={accessibilityLabel ?? 'Notification'}
      />
    );
  }
  if (variant === 'ring') {
    return (
      <View
        style={[styles.ring, style ?? {}]}
        testID={testID}
        accessibilityLabel={accessibilityLabel ?? 'Notification'}
      />
    );
  }

  const isOutline = variant === 'outline';
  const isCount = typeof label === 'number';

  return (
    <View
      style={[
        styles.base,
        isCount ? styles.baseCount : styles.basePill,
        {
          backgroundColor: isOutline ? WHITE : BRAND_RED,
          borderColor: BRAND_RED,
          borderWidth: isOutline ? 1 : 0,
        },
        style ?? {},
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? String(label)}
    >
      <Text
        numberOfLines={1}
        style={[
          isCount ? typography.mobile.body.xs.semibold : typography.mobile.body.sm.semibold,
          { color: isOutline ? BRAND_RED : WHITE },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  basePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    minHeight: 20,
    borderRadius: 999,
  },
  baseCount: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 999,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BRAND_RED,
  },
  ring: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: WHITE,
    borderWidth: 1.5,
    borderColor: BRAND_RED,
  },
});
