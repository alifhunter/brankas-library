import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { color, shadow, typography, type ShadowStyle } from '../theme';
import type { ButtonSize, ButtonVariant } from './Button.types';

const NAVY = color.background['primary-blue'];
const NAVY_PRESSED = color.neutral['950'];
const WHITE = color.background.default;
const SUBTLE_BORDER = color.border.subtle;
const SUBTLE_BG = color.background.subtle;
const DISABLED_BG = color.neutral['400'];
const DISABLED_TEXT = color.text.subtlest;
const TEXT_GRAY = color.text.gray;
const PRESS_OVERLAY = color.neutral['100'];
const GLASS_BG = 'rgba(255, 255, 255, 0.1)';
const GLASS_BG_DISABLED = 'rgba(255, 255, 255, 0.16)';
const GLASS_TEXT_DISABLED = 'rgba(255, 255, 255, 0.5)';

export interface SizeSpec {
  height: number;
  paddingHorizontal: number;
  paddingVertical: number;
  gap: number;
  /** Typography token consumed for the label. */
  labelType: TextStyle;
  iconSize: number;
}

export const sizeSpec: Record<ButtonSize, SizeSpec> = {
  large: {
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    labelType: typography.mobile.body.lg.semibold,
    iconSize: 24,
  },
  medium: {
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    labelType: typography.mobile.body.md.semibold,
    iconSize: 20,
  },
  small: {
    height: 32,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
    labelType: typography.mobile.body.sm.semibold,
    iconSize: 16,
  },
};

export interface VariantTones {
  bg: string;
  bgPressed: string;
  bgDisabled: string;
  text: string;
  textDisabled: string;
  borderWidth: number;
  borderColor: string;
  borderColorDisabled: string;
  shadow?: ShadowStyle;
}

export const variantTones: Record<ButtonVariant, VariantTones> = {
  primary: {
    bg: NAVY,
    bgPressed: NAVY_PRESSED,
    bgDisabled: DISABLED_BG,
    text: WHITE,
    textDisabled: WHITE,
    borderWidth: 0,
    borderColor: 'transparent',
    borderColorDisabled: 'transparent',
  },
  secondary: {
    bg: WHITE,
    bgPressed: PRESS_OVERLAY,
    bgDisabled: WHITE,
    text: NAVY,
    textDisabled: DISABLED_TEXT,
    borderWidth: 1,
    borderColor: NAVY,
    borderColorDisabled: DISABLED_BG,
  },
  tertiary: {
    bg: 'transparent',
    bgPressed: PRESS_OVERLAY,
    bgDisabled: 'transparent',
    text: NAVY,
    textDisabled: DISABLED_TEXT,
    borderWidth: 0,
    borderColor: 'transparent',
    borderColorDisabled: 'transparent',
  },
  tertiaryBlue: {
    bg: 'transparent',
    bgPressed: PRESS_OVERLAY,
    bgDisabled: 'transparent',
    text: color.text.informational,
    textDisabled: DISABLED_TEXT,
    borderWidth: 0,
    borderColor: 'transparent',
    borderColorDisabled: 'transparent',
  },
  tertiaryRed: {
    bg: 'transparent',
    bgPressed: PRESS_OVERLAY,
    bgDisabled: 'transparent',
    text: color.text.error,
    textDisabled: DISABLED_TEXT,
    borderWidth: 0,
    borderColor: 'transparent',
    borderColorDisabled: 'transparent',
  },
  tertiaryInvert: {
    bg: WHITE,
    bgPressed: SUBTLE_BG,
    bgDisabled: SUBTLE_BG,
    text: NAVY,
    textDisabled: TEXT_GRAY,
    borderWidth: 1,
    borderColor: SUBTLE_BORDER,
    borderColorDisabled: 'transparent',
    shadow: shadow.mobile.button,
  },
  glassmorphism: {
    bg: GLASS_BG,
    bgPressed: NAVY,
    bgDisabled: GLASS_BG_DISABLED,
    text: color.text.inverse,
    textDisabled: GLASS_TEXT_DISABLED,
    borderWidth: 0,
    borderColor: 'transparent',
    borderColorDisabled: 'transparent',
  },
};

export const baseStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  } satisfies ViewStyle,
  label: {
    textAlign: 'center',
  } satisfies TextStyle,
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  } satisfies ViewStyle,
});
