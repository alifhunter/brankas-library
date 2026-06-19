import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, typography } from '@brankas/native';

type Chrome = 'shell' | 'fullscreen';

export function CaseShell({
  title,
  onBack,
  chrome = 'shell',
  children,
}: {
  title: string;
  onBack: () => void;
  chrome?: Chrome;
  children: ReactNode;
}) {
  if (chrome === 'fullscreen') {
    return (
      <View style={styles.root}>
        <View style={styles.body}>{children}</View>
        <Pressable
          accessibilityLabel="Back to cases"
          accessibilityRole="button"
          hitSlop={12}
          onPress={onBack}
          style={({ pressed }) => [
            styles.floatingBack,
            pressed && styles.floatingBackPressed,
          ]}
        >
          <Text style={styles.floatingBackText}>‹</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Back to cases"
          accessibilityRole="button"
          hitSlop={12}
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && styles.backPressed]}
        >
          <Text style={styles.backText}>‹ Cases</Text>
        </Pressable>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.spacer} />
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: color.background.default,
    borderBottomColor: color.border.subtle,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 12,
    height: 44,
    paddingHorizontal: 12,
  },
  back: {
    minWidth: 72,
  },
  backPressed: {
    opacity: 0.5,
  },
  backText: {
    ...typography.mobile.body.md.semibold,
    color: color.text.default,
  },
  title: {
    ...typography.mobile.body.md.semibold,
    color: color.text.default,
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    minWidth: 72,
  },
  body: {
    flex: 1,
  },
  floatingBack: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    left: 12,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    top: 8,
    width: 36,
    zIndex: 10,
  },
  floatingBackPressed: {
    opacity: 0.6,
  },
  floatingBackText: {
    color: color.text.default,
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
});
