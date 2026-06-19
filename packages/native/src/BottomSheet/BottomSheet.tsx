import { useEffect, useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Overlay } from '../Overlay/Overlay';
import { colors, styles } from './BottomSheet.styles';
import type { BottomSheetProps } from './BottomSheet.types';

const SPRING_CONFIG = { damping: 22, stiffness: 220, mass: 0.6 };
const HALF_HEIGHT_RATIO = 0.5;
const FULL_HEIGHT_RATIO = 0.95;
const DISMISS_THRESHOLD = 0.25;
const EXPAND_THRESHOLD = 0.08;

export function BottomSheet({
  open,
  onDismiss,
  title,
  supportingText,
  illustration,
  children,
  footer,
  dismissOnBackdropPress = true,
  testID,
  style,
  contentContainerStyle,
}: BottomSheetProps) {
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const halfHeight = screenHeight * HALF_HEIGHT_RATIO;
  const fullHeight = screenHeight * FULL_HEIGHT_RATIO;

  const [expanded, setExpanded] = useState(false);
  const maxHeight = expanded ? fullHeight : halfHeight;

  const translateY = useSharedValue(screenHeight);
  const dragStart = useSharedValue(0);

  useEffect(() => {
    if (open) {
      translateY.value = withSpring(0, SPRING_CONFIG);
    } else {
      translateY.value = withTiming(screenHeight, { duration: 220 });
    }
  }, [open, screenHeight, translateY]);

  const requestDismiss = () => {
    setExpanded(false);
    onDismiss();
  };

  const requestExpand = () => setExpanded(true);
  const requestCollapse = () => setExpanded(false);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      dragStart.value = translateY.value;
    })
    .onUpdate((event) => {
      const next = dragStart.value + event.translationY;
      translateY.value = next < 0 ? next * 0.2 : next;
    })
    .onEnd((event) => {
      const dismissDistance = maxHeight * DISMISS_THRESHOLD;
      const expandDistance = -maxHeight * EXPAND_THRESHOLD;
      const movedDown = event.translationY > dismissDistance || event.velocityY > 800;
      const movedUp = event.translationY < expandDistance || event.velocityY < -800;

      if (movedDown) {
        translateY.value = withTiming(screenHeight, { duration: 220 }, (finished) => {
          if (finished) runOnJS(requestDismiss)();
        });
      } else if (movedUp && !expanded) {
        runOnJS(requestExpand)();
        translateY.value = withSpring(0, SPRING_CONFIG);
      } else if (event.translationY > 0 && expanded) {
        runOnJS(requestCollapse)();
        translateY.value = withSpring(0, SPRING_CONFIG);
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Overlay
      open={open}
      onDismiss={onDismiss}
      dismissOnBackdropPress={dismissOnBackdropPress}
      {...(testID ? { testID } : {})}
      accessibilityLabel={title ?? 'Bottom sheet'}
    >
      <View
        pointerEvents="box-none"
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <GestureDetector gesture={panGesture}>
          <Animated.View
            accessibilityViewIsModal
            style={[styles.sheet, { maxHeight }, sheetAnimatedStyle, style ?? {}]}
          >
            <View style={styles.handleArea}>
              <View style={styles.handle} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                contentContainerStyle ?? {},
                { paddingBottom: footer ? 0 : 16 + insets.bottom },
              ]}
              scrollEnabled={expanded}
            >
              {(illustration || title || supportingText) && (
                <View style={styles.header}>
                  {illustration ? (
                    <View style={styles.illustration}>{illustration}</View>
                  ) : null}
                  {title ? (
                    <Text accessibilityRole="header" style={styles.title}>
                      {title}
                    </Text>
                  ) : null}
                  {supportingText ? (
                    <Text style={styles.supportingText}>{supportingText}</Text>
                  ) : null}
                </View>
              )}
              {children ? <View style={styles.content}>{children}</View> : null}
            </ScrollView>

            {footer ? (
              <View
                style={[
                  styles.footer,
                  { paddingBottom: 20 + insets.bottom },
                ]}
              >
                {footer}
              </View>
            ) : null}
          </Animated.View>
        </GestureDetector>
      </View>
    </Overlay>
  );
}

// Re-export for consumers that just want the named tone palette in custom slots
export const bottomSheetColors = colors;
