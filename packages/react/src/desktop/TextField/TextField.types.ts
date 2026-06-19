import type { InputHTMLAttributes } from 'react';

export type TextFieldSize = 'default' | '48px';
export type TextFieldVisualState =
  | 'default'
  | 'focused'
  | 'typing'
  | 'filled'
  | 'disabled'
  | 'error-default'
  | 'error-filled';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  size?: TextFieldSize;
  state?: TextFieldVisualState;
  helperTextTop?: string;
  helperText?: string;
  errorMessage?: string;
  counterText?: string;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
}
