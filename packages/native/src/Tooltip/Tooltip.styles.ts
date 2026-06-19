import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { color, shadow, typography } from '../theme';

export const BUBBLE_BG = color.background.black;
export const BUBBLE_FG = color.neutral['0'];
export const TAIL = 16;
export const TAIL_OVERLAP = 8;

export const styles = StyleSheet.create({
  /* The wrapper around the trigger element. Sets relative positioning so the
   * absolutely-positioned tooltip bubble is bound to it. `overflow: visible`
   * lets the bubble escape the trigger's box. */
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
    overflow: 'visible',
  } satisfies ViewStyle,

  /* Each position renders the bubble as an absolutely-positioned sibling of
   * the trigger. The flex layout inside places bubble + tail in the right
   * stacking order (column/row + flex-start/end). */
  popTop: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  } satisfies ViewStyle,
  popBottom: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'column',
  } satisfies ViewStyle,
  popLeft: {
    position: 'absolute',
    right: '100%',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  } satisfies ViewStyle,
  popRight: {
    position: 'absolute',
    left: '100%',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
  } satisfies ViewStyle,

  bubble: {
    backgroundColor: BUBBLE_BG,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    maxWidth: 250,
    ...shadow.lg,
  } satisfies ViewStyle,

  text: {
    color: BUBBLE_FG,
    ...typography.mobile.body.sm.regular,
  } satisfies TextStyle,

  /* Negative margins make the tail overlap the bubble by ~8px so they read
   * as one connected shape. The direction matches the bubble/tail stack. */
  tailContainerTop: { marginTop: -TAIL_OVERLAP } satisfies ViewStyle,
  tailContainerBottom: { marginBottom: -TAIL_OVERLAP } satisfies ViewStyle,
  tailContainerLeft: { marginLeft: -TAIL_OVERLAP } satisfies ViewStyle,
  tailContainerRight: { marginRight: -TAIL_OVERLAP } satisfies ViewStyle,
});
