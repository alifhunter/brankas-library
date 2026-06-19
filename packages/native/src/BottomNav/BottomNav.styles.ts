import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { color, shadow, typography } from '../theme';

export const ICON_SIZE = 24;
export const ITEM_HEIGHT = 84;
export const QRIS_SIZE = 57;
export const QRIS_OFFSET = 28;
export const QRIS_ICON_SIZE = 40;

const NAVY = color.background['primary-blue'];
const RED_BRAND = color.background['primary-red'];
const RED_GRADIENT_START = '#9a160e';
const RED_GRADIENT_END = '#d63f36';
const ICON_SUBTLEST = color.text.subtlest;
const WHITE = color.background.default;

export const tone = {
  active: RED_BRAND,
  inactive: ICON_SUBTLEST,
  navy: NAVY,
  qrisStart: RED_GRADIENT_START,
  qrisEnd: RED_GRADIENT_END,
  qrisFallback: RED_BRAND,
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 360,
    width: '100%',
    backgroundColor: WHITE,
    ...shadow.mobile.bottomNav,
    overflow: 'visible',
  } satisfies ViewStyle,
  menuContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    minWidth: 0,
  } satisfies ViewStyle,
  item: {
    flex: 1,
    minWidth: 0,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  } satisfies ViewStyle,
  iconWrap: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  } satisfies ViewStyle,
  label: {
    ...typography.mobile.body.sm.semibold,
    textAlign: 'center',
  } satisfies TextStyle,
  badge: {
    position: 'absolute',
    backgroundColor: RED_BRAND,
    minWidth: 14,
    maxWidth: 34,
    height: 16,
    paddingHorizontal: 2,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    top: 14,
    left: '50%',
    marginLeft: 6,
    overflow: 'hidden',
  } satisfies ViewStyle,
  badgeText: {
    ...typography.mobile.body.xs.semibold,
    color: WHITE,
    textAlign: 'center',
  } satisfies TextStyle,
  qrisSlot: {
    width: 78,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 16,
  } satisfies ViewStyle,
  qrisButton: {
    position: 'absolute',
    top: -QRIS_OFFSET,
    width: QRIS_SIZE,
    height: QRIS_SIZE,
    borderRadius: QRIS_SIZE / 2,
    backgroundColor: RED_GRADIENT_START,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.mobile.bottomNavQris,
  } satisfies ViewStyle,
  qrisGradientLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: QRIS_SIZE / 2,
    overflow: 'hidden',
  } satisfies ViewStyle,
  qrisIconWrap: {
    width: QRIS_ICON_SIZE,
    height: QRIS_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  } satisfies ViewStyle,
});
