import type { HTMLAttributes, ReactNode } from 'react';
import { Label } from './Label.js';
import type { LabelVariant } from './Label.types';

/** @deprecated Use `Label` with `variant` instead. */
export type StatusLabelTone = 'default' | 'success' | 'warning' | 'error' | 'info';

/** @deprecated Use `LabelProps` instead. */
export type StatusLabelProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  showIcon?: boolean;
  tone?: StatusLabelTone;
};

const toneToVariant: Record<StatusLabelTone, LabelVariant> = {
  default: 'neutral',
  success: 'positive',
  warning: 'warning',
  error: 'negative',
  info: 'information',
};

/**
 * @deprecated Backward-compatible alias for {@link Label}. New code should use `<Label variant="..." />`.
 */
export function StatusLabel({
  children,
  showIcon = true,
  tone = 'default',
  ...props
}: StatusLabelProps) {
  return (
    <Label {...props} variant={toneToVariant[tone]} icon={showIcon}>
      {children}
    </Label>
  );
}
