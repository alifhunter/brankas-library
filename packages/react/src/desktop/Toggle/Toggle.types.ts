import type { InputHTMLAttributes, ReactNode } from 'react';

export type ToggleSize = 'default' | 'small';
export type ToggleVisualState = 'default' | 'hover' | 'focused' | 'disabled';

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  size?: ToggleSize;
  state?: ToggleVisualState;
}
