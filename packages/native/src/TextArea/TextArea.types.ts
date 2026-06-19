import type { TextInputProps, ViewStyle } from 'react-native';

export interface TextAreaProps
  extends Omit<
    TextInputProps,
    'style' | 'editable' | 'value' | 'onChangeText' | 'multiline' | 'placeholder'
  > {
  /** Floating title. Doubles as the placeholder when the field is empty and not focused. */
  label: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (next: string) => void;
  /** Small caption below the field. Replaced by `error` if both are set. */
  hint?: string;
  /** Red border + red caption. Pass a string to surface a specific error message. */
  error?: string | boolean;
  disabled?: boolean;
  maxLength?: number;
  /** Shows the character counter on the right of the caption row. Renders `X/maxLength` when `maxLength` is set, otherwise `X`. */
  showCount?: boolean;
  /** Minimum visible rows (line-height ≈ 22). Defaults to 4. */
  rows?: number;
  containerStyle?: ViewStyle;
}
