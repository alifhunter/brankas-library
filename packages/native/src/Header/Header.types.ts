import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type HeaderVariant = 'default' | 'centered' | 'search';

export interface HeaderProps {
  /** Title text. Required for `default` and `centered`. */
  title?: string;
  /**
   * Subtitle text. Hidden when the header is scrolled. Auto-switches to
   * Medium 14/20 typography when the subtitle exceeds 140 characters
   * (improves readability of long descriptions).
   */
  subtitle?: string;
  /** Show a back arrow on the left + handle its press. */
  onBack?: () => void;
  /** Right-side actions (e.g. icon buttons). */
  trailing?: ReactNode;
  /** Progress bar (0..1) rendered between the nav row and the title. */
  progress?: number;
  /** Pill label rendered to the right of the title (e.g. "4/7"). */
  stepLabel?: string;
  /** Layout variant. */
  variant?: HeaderVariant;
  /** Slot used when `variant="search"` (e.g. a TextField). */
  searchSlot?: ReactNode;
  /** Disable the red curved brand background. */
  flat?: boolean;
  /**
   * Reanimated shared value that the consumer's ScrollView updates on scroll.
   * When supplied, the header shrinks (title scales 24→18, subtitle fades,
   * inner padding tightens) past the threshold.
   */
  scrollY?: SharedValue<number>;
  /** Scroll distance (px) at which the header is fully shrunk. Default 48. */
  scrollThreshold?: number;
  /** Override the brand background entirely. */
  background?: ReactNode;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
