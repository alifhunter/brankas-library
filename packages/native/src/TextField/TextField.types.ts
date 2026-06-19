import type { ReactNode } from 'react';
import type { TextInputProps, ViewStyle } from 'react-native';

export interface TextFieldProps
  extends Omit<TextInputProps, 'style' | 'editable' | 'value' | 'onChangeText' | 'placeholder'> {
  /**
   * Floating title. Doubles as the placeholder when the field is empty and not focused.
   */
  label: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (next: string) => void;
  /** Small caption below the field. Replaced by `error` if both are set. */
  hint?: string;
  /** Red border + red caption. Pass a string to surface a specific error message. */
  error?: string | boolean;
  disabled?: boolean;
  /** Icon rendered on the left of the input row. */
  leadingIcon?: ReactNode;
  /** Icon rendered on the right of the input row. Hidden while the clear button is active. */
  trailingIcon?: ReactNode;
  /** Short text rendered just before the value — useful for currency (e.g. `"Rp "`). */
  prefix?: string;
  /** Adds a clear (X) button on the right when the field is non-empty and editable. */
  clearable?: boolean;
  containerStyle?: ViewStyle;
}
