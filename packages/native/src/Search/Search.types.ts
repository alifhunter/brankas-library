import type { ReactNode } from 'react';
import type { TextInputProps, ViewStyle } from 'react-native';

export type SearchVariant = 'white' | 'grey';

export interface SearchProps
  extends Omit<TextInputProps, 'style' | 'editable' | 'value' | 'onChangeText'> {
  value?: string;
  defaultValue?: string;
  onChangeText?: (next: string) => void;
  /**
   * Field background tone. `white` for use over a coloured surface
   * (e.g. inside a Header). `grey` for a standalone search bar on a
   * plain screen.
   */
  variant?: SearchVariant;
  /** Override the leading search icon (rare). */
  leadingIcon?: ReactNode;
  /** Disable the clear (X) button when filled. */
  clearable?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}
