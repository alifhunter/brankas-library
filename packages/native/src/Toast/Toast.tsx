import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import { CloseIcon } from '../internal/icons';
import type { ToastProps } from './Toast.types';

const BG = color.neutral['1000'];
const FG = color.background.default;

export function Toast({ children, onDismiss, style, testID, accessibilityLabel }: ToastProps) {
  return (
    <View
      style={[styles.root, style ?? {}]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={accessibilityLabel ?? children}
      testID={testID}
    >
      <Text style={styles.text} numberOfLines={2}>
        {children}
      </Text>
      {onDismiss ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss toast"
          hitSlop={8}
          onPress={onDismiss}
          style={styles.close}
        >
          <CloseIcon size={18} color={FG} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 44,
    width: 328,
    backgroundColor: BG,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  text: {
    flex: 1,
    color: FG,
    ...typography.mobile.body.md.regular,
  },
  close: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
