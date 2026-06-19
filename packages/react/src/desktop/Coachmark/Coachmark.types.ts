import type { HTMLAttributes, ReactNode } from 'react';

export type CoachmarkPosition =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-center'
  | 'right-center';

export interface CoachmarkProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  /** Body content. Defaults to a Lorem placeholder when omitted. */
  children?: ReactNode;
  /** Arrow position. Determines which side and offset the pointer sits on. */
  position?: CoachmarkPosition;
  /** Show the dismiss (X) button. Default true. */
  close?: boolean;
  onDismiss?: () => void;
  /** Show the carousel dots + action button row. Default false. */
  config?: boolean;
  /** Total carousel steps. Default 2. */
  totalSteps?: number;
  /** Current carousel step (1-indexed). Default 1. */
  currentStep?: number;
  /** Optional replacement for the default Button 1 / Button 2 footer actions. */
  actions?: ReactNode;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}
