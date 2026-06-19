import type { ReactNode } from 'react';
import type { GestureResponderEvent, ViewStyle } from 'react-native';

/**
 * Variant flavours from the Figma reference:
 * - `card` — default white card with the `Source account` label and a chevron.
 *   Pass an `<AccountItem>` as children.
 * - `selector` — no label, used inside a bottom-sheet selector. Children
 *   still receive the chevron + Default badge.
 * - `empty` — placeholder card with `No account selected` and a top-right
 *   chevron, used when no account has been chosen yet.
 *
 * `disabled` and `error` are orthogonal modifiers applied on top of `card`.
 */
export type SourceOfFundVariant = 'card' | 'selector' | 'empty';

export interface SourceOfFundProps {
  /** Label rendered above the account row. Default: "Source account". */
  label?: string;
  variant?: SourceOfFundVariant;
  /** Renders the inside of the card — usually an `<AccountItem chevron={false}>`. */
  children?: ReactNode;
  /** Custom empty-state caption. Default: "No account selected". */
  emptyText?: string;
  /** Adds a red border + error caption below. */
  error?: string;
  /** Greyed-out state. */
  disabled?: boolean;
  /** Makes the whole card tappable + adds a trailing chevron in the top-right. */
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  testID?: string;
}
