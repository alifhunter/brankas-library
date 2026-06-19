import { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { OverlayProps } from './Overlay.types';

const BACKDROP_COLOR = 'rgba(15, 23, 42, 0.5)';
const FADE_DURATION = 200;

export function Overlay({
  open,
  onDismiss,
  dismissOnBackdropPress = true,
  children,
  style,
  backdropStyle,
  testID,
  accessibilityLabel,
}: OverlayProps) {
  const opacity = useSharedValue(0);
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = withTiming(1, { duration: FADE_DURATION });
    } else {
      opacity.value = withTiming(0, { duration: FADE_DURATION }, (finished) => {
        if (finished) {
          // unmount after fade-out
          // eslint-disable-next-line react-hooks/exhaustive-deps -- shared-value callback
        }
      });
      const id = setTimeout(() => setMounted(false), FADE_DURATION);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [open, opacity]);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!mounted) return null;

  const body = (
    <View
      style={styles.root}
      accessibilityViewIsModal
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View
        style={[styles.backdrop, backdropAnimatedStyle, backdropStyle ?? {}]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={dismissOnBackdropPress ? onDismiss : undefined}
          accessibilityLabel="Dismiss overlay"
          accessibilityRole="button"
        />
      </Animated.View>
      <View pointerEvents="box-none" style={[styles.content, style ?? {}]}>
        {children}
      </View>
    </View>
  );

  // On web (react-native-web), Modal portals to document.body and breaks parent
  // bounding (e.g. a phone-frame preview). Render inline so position:absolute is
  // scoped to the nearest position:relative ancestor.
  if (Platform.OS === 'web') {
    return (
      <View style={styles.inlinePortal} testID={testID} pointerEvents="box-none">
        {body}
      </View>
    );
  }

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onDismiss}
      testID={testID}
    >
      {body}
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inlinePortal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BACKDROP_COLOR,
  },
  content: { flex: 1 },
});
