import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { color, typography } from '../theme';

const NAVY = color.background['primary-blue'];
const WHITE = color.background.default;
const TEXT_DEFAULT = color.text.default;
const BG_SUBTLE = color.background.subtle;
const NEUTRAL_300 = color.neutral['300'];

export const HANDLE_AREA_HEIGHT = 32;
export const HANDLE_WIDTH = 36;
export const HANDLE_HEIGHT = 4;

export const colors = {
  navy: NAVY,
  white: WHITE,
  text: TEXT_DEFAULT,
  bgSubtle: BG_SUBTLE,
  handle: NEUTRAL_300,
};

export const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: WHITE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  } satisfies ViewStyle,
  handleArea: {
    height: HANDLE_AREA_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  } satisfies ViewStyle,
  handle: {
    width: HANDLE_WIDTH,
    height: HANDLE_HEIGHT,
    borderRadius: HANDLE_HEIGHT / 2,
    backgroundColor: BG_SUBTLE,
  } satisfies ViewStyle,
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 8,
  } satisfies ViewStyle,
  illustration: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  } satisfies ViewStyle,
  title: {
    ...typography.mobile.heading.h3.bold,
    color: TEXT_DEFAULT,
  } satisfies TextStyle,
  supportingText: {
    ...typography.mobile.body.md.regular,
    color: TEXT_DEFAULT,
  } satisfies TextStyle,
  content: {
    paddingHorizontal: 16,
  } satisfies ViewStyle,
  contentInner: {
    paddingBottom: 16,
  } satisfies ViewStyle,
  footer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: WHITE,
  } satisfies ViewStyle,
});
