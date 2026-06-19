import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, typography } from '../theme';
import { HeaderBackground } from './HeaderBackground';
import type { HeaderProps } from './Header.types';

const WHITE = color.background.default;
const SUBTITLE_LONG_THRESHOLD = 140;
const DEFAULT_THRESHOLD = 48;

const TITLE_TYPE = typography.mobile.heading.h3.bold;
const CENTERED_TITLE_TYPE = typography.mobile.heading.h4.bold;
const SUBTITLE_TYPE = typography.mobile.body.lg.regular;
const SUBTITLE_LONG_TYPE = typography.mobile.body.md.medium;
const STEP_PILL_TYPE = typography.mobile.body.md.semibold;

function BackArrow({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back"
      hitSlop={10}
      onPress={onPress}
      style={styles.backHit}
    >
      <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15 6l-6 6 6 6"
          stroke={WHITE}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}

function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

function StepPill({ label }: { label: string }) {
  return (
    <View style={styles.stepPill}>
      <Text style={styles.stepPillText}>{label}</Text>
    </View>
  );
}

export function Header({
  title,
  subtitle,
  onBack,
  trailing,
  progress,
  stepLabel,
  variant = 'default',
  searchSlot,
  flat = false,
  scrollY,
  scrollThreshold = DEFAULT_THRESHOLD,
  background,
  style,
  testID,
  accessibilityLabel,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  // Reanimated needs a stable shared value; fall back to a local zero when the
  // caller doesn't supply one (i.e. when scroll behavior isn't wanted).
  const localScrollY = useSharedValue(0);
  const scroll = scrollY ?? localScrollY;
  const subtitleIsLong = !!subtitle && subtitle.length > SUBTITLE_LONG_THRESHOLD;

  // Per Simobi rule: header *shrinks* on scroll. Title block padding tightens
  // (12 → 8), the title scales 24 → 18, and the subtitle fades + collapses.
  const titleBlockAnimatedStyle = useAnimatedStyle(() => ({
    paddingTop: interpolate(scroll.value, [0, scrollThreshold], [8, 0], 'clamp'),
    paddingBottom: interpolate(scroll.value, [0, scrollThreshold], [12, 8], 'clamp'),
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scroll.value,
      [0, scrollThreshold],
      [1, 18 / 24],
      'clamp',
    );
    return {
      transform: [{ scale }],
    };
  });

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    // Fade out faster than the height collapses so the text disappears before
    // it visually clips at the edge.
    const fullHeight = subtitleIsLong ? 60 : 24;
    return {
      opacity: interpolate(scroll.value, [0, scrollThreshold * 0.5], [1, 0], 'clamp'),
      height: interpolate(
        scroll.value,
        [0, scrollThreshold],
        [fullHeight, 0],
        'clamp',
      ),
      overflow: 'hidden',
    };
  });

  const containerStyle = [
    styles.container,
    { paddingTop: insets.top },
    style ?? {},
  ];

  return (
    <View
      style={containerStyle}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {!flat ? (background ?? <HeaderBackground />) : null}

      <View style={styles.navRow}>
        {onBack ? <BackArrow onPress={onBack} /> : <View style={styles.backHit} />}

        {variant === 'centered' && title ? (
          <Text
            numberOfLines={1}
            style={[styles.titleCentered, { flex: 1 }]}
          >
            {title}
          </Text>
        ) : null}

        {variant === 'search' && searchSlot ? (
          <View style={styles.searchSlot}>{searchSlot}</View>
        ) : null}

        {trailing ? (
          <View style={styles.trailing}>{trailing}</View>
        ) : variant === 'centered' ? (
          // Phantom slot the same width as the back-arrow hit area so the
          // centered title is balanced (centered relative to the full row,
          // not just the space after the back arrow).
          <View style={styles.backHit} />
        ) : null}
      </View>

      {variant === 'default' && title ? (
        <Animated.View style={[styles.titleBlock, titleBlockAnimatedStyle]}>
          {progress !== undefined ? <ProgressBar value={progress} /> : null}
          <View style={styles.titleRow}>
            <Animated.View style={[styles.titleScaler, titleAnimatedStyle]}>
              <Text numberOfLines={2} style={styles.title}>
                {title}
              </Text>
            </Animated.View>
            {stepLabel ? <StepPill label={stepLabel} /> : null}
          </View>
          {subtitle ? (
            <Animated.View style={subtitleAnimatedStyle}>
              <Text
                numberOfLines={3}
                style={[
                  styles.subtitle,
                  subtitleIsLong ? styles.subtitleLong : null,
                ]}
              >
                {subtitle}
              </Text>
            </Animated.View>
          ) : null}
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'visible',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  backHit: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 'auto',
  },
  searchSlot: {
    flex: 1,
    minHeight: 36,
    justifyContent: 'center',
  },
  titleBlock: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 32,
  },
  titleScaler: {
    flex: 1,
    transformOrigin: 'left center',
  },
  title: {
    ...TITLE_TYPE,
    color: WHITE,
  },
  titleCentered: {
    ...CENTERED_TITLE_TYPE,
    color: WHITE,
    textAlign: 'center',
  },
  subtitle: {
    ...SUBTITLE_TYPE,
    color: WHITE,
  },
  subtitleLong: {
    ...SUBTITLE_LONG_TYPE,
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
  },
  stepPill: {
    height: 36,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 200,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPillText: {
    ...STEP_PILL_TYPE,
    color: WHITE,
  },
});
