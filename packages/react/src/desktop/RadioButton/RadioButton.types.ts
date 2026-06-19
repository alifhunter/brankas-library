import type { InputHTMLAttributes, ReactNode } from 'react';

export type RadioButtonSize = 'default' | 'small';
export type RadioButtonVisualState = 'default' | 'hover' | 'focused' | 'disabled';

export interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  size?: RadioButtonSize;
  state?: RadioButtonVisualState;
}
