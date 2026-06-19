import type { ReactElement } from 'react';
import type { GestureResponderEvent, ViewStyle } from 'react-native';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'longPress' | 'press' | 'manual';

export interface TooltipProps {
  /** The string rendered inside the tooltip bubble. */
  text: string;
  /** Where the bubble appears relative to the trigger. */
  position?: TooltipPosition;
  /** What gesture toggles the tooltip. `manual` only reacts to `visible`. */
  trigger?: TooltipTrigger;
  /** Controlled visibility. Omit for uncontrolled. */
  visible?: boolean;
  /** Initial visibility for uncontrolled mode. */
  defaultVisible?: boolean;
  /** Fires whenever the visibility flips. */
  onVisibilityChange?: (next: boolean) => void;
  /**
   * The element the tooltip anchors to. Receives press/longPress handlers
   * via a wrapping Pressable when `trigger` is `press` or `longPress`.
   */
  children: ReactElement;
  /** Style passed to the wrapping View around the trigger. */
  style?: ViewStyle;
  /** Style passed to the tooltip bubble itself. */
  bubbleStyle?: ViewStyle;
  /** Override the trigger Pressable's onPress (only used when trigger='press'). */
  onPress?: (event: GestureResponderEvent) => void;
  /** Override the trigger Pressable's onLongPress (only used when trigger='longPress'). */
  onLongPress?: (event: GestureResponderEvent) => void;
  testID?: string;
  accessibilityLabel?: string;
}
