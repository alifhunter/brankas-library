import type { HTMLAttributes, ReactNode } from 'react';

export type DatePickerView = 'date' | 'month' | 'year';

export type DatePickerWeekStart = 0 | 1;

export interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children' | 'defaultValue'> {
  /** Currently selected date (controlled). */
  value?: Date | null;
  /** Initial selected date (uncontrolled). */
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;

  /** Currently visible month (controlled). The day portion is ignored. */
  month?: Date;
  /** Initial visible month (uncontrolled). */
  defaultMonth?: Date;
  onMonthChange?: (date: Date) => void;

  /** Whether to show the date grid, month picker, or year picker. */
  view?: DatePickerView;
  defaultView?: DatePickerView;
  onViewChange?: (view: DatePickerView) => void;

  /** Show optional info row beneath the grid. */
  showInfo?: boolean;
  infoMessage?: ReactNode;

  /** Show Reset / Cancel / Confirm action row. */
  showActions?: boolean;
  onReset?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;

  /** Disable dates before this. */
  min?: Date;
  /** Disable dates after this. */
  max?: Date;

  /** 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: DatePickerWeekStart;
}
