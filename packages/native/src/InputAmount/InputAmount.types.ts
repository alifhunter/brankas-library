import type { ReactNode } from 'react';
import type { TextInputProps, ViewStyle } from 'react-native';

export interface InputAmountCurrency {
  /** Currency code, e.g. "USD", "SGD". */
  code: string;
  /** Flag or icon rendered before the code. */
  flag?: ReactNode;
  /** Conversion rate caption (e.g. `"$1 = S$1.36"`). Rendered top-right. */
  rate?: string;
  /** Tap handler — typically opens a currency picker bottom sheet. */
  onPress?: () => void;
}

export interface InputAmountProps
  extends Omit<
    TextInputProps,
    'style' | 'value' | 'defaultValue' | 'onChangeText' | 'placeholder'
  > {
  /** Title rendered above the amount. */
  label?: string;
  /**
   * Raw digits string (or number). Component formats with thousand separators
   * per `locale`. Caller gets back raw digits via `onValueChange`.
   */
  value?: string | number;
  defaultValue?: string | number;
  /** Fires with the raw digits-only string. */
  onValueChange?: (digits: string) => void;
  /** Currency prefix rendered before the amount. Defaults to "Rp". */
  prefix?: string;
  /** Intl locale used for the thousand-separator. Default `"id-ID"`. */
  locale?: string;
  /** Caption rendered below the divider line in a calm grey. */
  info?: string;
  /** Red border + red caption + warn-icon. `true` shows the border without text. */
  error?: string | boolean;
  disabled?: boolean;
  /**
   * Optional currency selector that appears above the title row (the
   * `Currency` variant from Figma). Tap to open a currency picker.
   */
  currency?: InputAmountCurrency;
  /** Show the clear (X) button when focused with content. Default true. */
  clearable?: boolean;
  /**
   * The base font size for the amount text. The component auto-scales
   * **down** from this if the rendered amount exceeds the available width
   * (the "no ellipsis, dynamic adjustment" Simobi rule). Default 32.
   */
  maxFontSize?: number;
  /** Minimum font size after scaling. Default 16. */
  minFontSize?: number;
  containerStyle?: ViewStyle;
  testID?: string;
}
