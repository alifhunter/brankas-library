import type { ReactNode } from 'react';
import type { GestureResponderEvent, ViewStyle } from 'react-native';

export interface AccountItemProps {
  /** Account name (bold heading). */
  name: string;
  /** Account number rendered below the name. */
  accountNumber: string;
  /** Optional balance string. Caller formats the currency. */
  balance?: string;
  /**
   * Optional pill label (e.g. "Default", "Primary"). Renders to the right of
   * the content as a small grey chip.
   */
  badge?: string;
  /**
   * Artwork rendered on the left in a 36×44 rounded slot. Pass an Image
   * source via your icon library, an SVG component, or any ReactNode. The
   * component does not clip — wrap your asset to fit.
   */
  artwork?: ReactNode;
  /** Show a trailing chevron-right icon. Default true. */
  chevron?: boolean;
  /** Makes the row tappable. */
  onPress?: (event: GestureResponderEvent) => void;
  /** Greyed-out look + disables press. */
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
