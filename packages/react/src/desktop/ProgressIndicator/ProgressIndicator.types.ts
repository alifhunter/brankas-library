import type { HTMLAttributes, ReactNode } from 'react';

export type ProgressIndicatorStepStatus = 'completed' | 'current' | 'upcoming';

export interface ProgressIndicatorStep {
  /** Step label rendered next to the circle marker. */
  label: ReactNode;
  /** Optional explicit id; falls back to the array index. */
  id?: string;
  /**
   * Force a status. Normally derived from the step's position relative to
   * `currentStep` — useful when steps need to be marked invalid or skipped.
   */
  status?: ProgressIndicatorStepStatus;
}

export interface ProgressIndicatorProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  /** Ordered list of steps in the flow. */
  steps: ProgressIndicatorStep[];
  /** 1-indexed position of the active step (i.e. the page the user is on). */
  currentStep: number;
  /**
   * Called when a completed (or current) step is clicked. Use this to navigate
   * back. Upcoming steps are never clickable. Omit to disable click-to-jump.
   */
  onStepClick?: (step: number) => void;
}
