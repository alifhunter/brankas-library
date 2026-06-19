import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'blue-primary'
  | 'blue-secondary'
  | 'blue-tertiary'
  | 'danger-primary'
  | 'danger-secondary'
  | 'danger-tertiary';

export type ButtonSize = 'small' | 'medium' | 'large' | 'extra-large';
export type ButtonVisualState = 'default' | 'hover' | 'focused' | 'disabled';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonVisualState;
  loading?: boolean;
  iconOnly?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}
