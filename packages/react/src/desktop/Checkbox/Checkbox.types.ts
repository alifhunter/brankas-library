import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'default' | 'small';
export type CheckboxVisualState = 'default' | 'hover' | 'focused' | 'disabled';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  size?: CheckboxSize;
  state?: CheckboxVisualState;
  indeterminate?: boolean;
  error?: boolean;
}
