import type { ReactNode, TextareaHTMLAttributes } from 'react';

export type TextAreaVisualState =
  | 'default'
  | 'filled'
  | 'focused'
  | 'focused-filled'
  | 'disabled'
  | 'error';

export type TextAreaHelperPosition = 'above' | 'below';

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'cols'> {
  label?: ReactNode;
  /** Helper copy shown alongside the textarea. Position controlled by `helperPosition`. */
  helperText?: ReactNode;
  /**
   * Where helper text sits relative to the textarea.
   * - `below` (default): helper + counter share a row beneath the textarea
   * - `above`: helper sits between the label and the textarea; counter floats alone underneath
   */
  helperPosition?: TextAreaHelperPosition;
  /** Right-aligned character counter, e.g. `"0/250"`. Consumer manages the value. */
  counterText?: ReactNode;
  /** Error message rendered below with the error icon. Presence implies error state. */
  errorMessage?: ReactNode;
  /** Force a visual state for snapshots; normally derived from real DOM state. */
  state?: TextAreaVisualState;
  /** Show a red asterisk after the label. */
  required?: boolean;
}
