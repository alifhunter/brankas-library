import { useMemo, useState } from 'react';
import { cn } from '../../lib/cn.js';
import { Button } from '../Button/Button.js';
import type { DatePickerProps, DatePickerView, DatePickerWeekStart } from './DatePicker.types';
import './DatePicker.css';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_SHORT = MONTH_NAMES.map((m) => m.slice(0, 3));
const WEEKDAYS_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const WEEKDAYS_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const YEAR_PAGE_SIZE = 18;

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addMonths(date: Date, n: number) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

function buildGrid(visible: Date, weekStartsOn: DatePickerWeekStart): Date[] {
  const first = startOfMonth(visible);
  const firstWeekday = first.getDay();
  const offset = (firstWeekday - weekStartsOn + 7) % 7;
  const start = new Date(first);
  start.setDate(start.getDate() - offset);

  // 6 weeks × 7 days = 42 cells (covers any month layout)
  const cells: Date[] = [];
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  return cells;
}

function isOutsideRange(date: Date, min?: Date, max?: Date): boolean {
  const day = startOfDay(date).getTime();
  if (min && day < startOfDay(min).getTime()) return true;
  if (max && day > startOfDay(max).getTime()) return true;
  return false;
}

export function DatePicker({
  value,
  defaultValue,
  onChange,
  month,
  defaultMonth,
  onMonthChange,
  view,
  defaultView = 'date',
  onViewChange,
  showInfo = false,
  infoMessage = 'Info here',
  showActions = false,
  onReset,
  onCancel,
  onConfirm,
  min,
  max,
  weekStartsOn = 0,
  className,
  ...rest
}: DatePickerProps) {
  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
  const selected = isValueControlled ? (value ?? null) : internalValue;

  const isMonthControlled = month !== undefined;
  const [internalMonth, setInternalMonth] = useState<Date>(
    () => startOfMonth(defaultMonth ?? defaultValue ?? new Date()),
  );
  const visibleMonth = isMonthControlled ? startOfMonth(month) : internalMonth;

  const isViewControlled = view !== undefined;
  const [internalView, setInternalView] = useState<DatePickerView>(defaultView);
  const currentView = isViewControlled ? view : internalView;

  const [yearPageStart, setYearPageStart] = useState<number>(() => {
    const baseYear = (defaultValue ?? defaultMonth ?? new Date()).getFullYear();
    return baseYear - (baseYear % YEAR_PAGE_SIZE);
  });

  const setView = (next: DatePickerView) => {
    if (!isViewControlled) {
      setInternalView(next);
    }
    onViewChange?.(next);
  };

  const setMonth = (next: Date) => {
    const nextMonth = startOfMonth(next);
    if (!isMonthControlled) {
      setInternalMonth(nextMonth);
    }
    onMonthChange?.(nextMonth);
  };

  const setValue = (next: Date | null) => {
    if (!isValueControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const handleSelectDate = (date: Date) => {
    if (isOutsideRange(date, min, max)) return;
    const day = startOfDay(date);
    setValue(day);
    setMonth(day);
  };

  const handleSelectMonth = (monthIndex: number) => {
    const next = new Date(visibleMonth.getFullYear(), monthIndex, 1);
    setMonth(next);
    setView('date');
  };

  const handleSelectYear = (year: number) => {
    const next = new Date(year, visibleMonth.getMonth(), 1);
    setMonth(next);
    setView('month');
  };

  const handlePrev = () => {
    if (currentView === 'date') {
      setMonth(addMonths(visibleMonth, -1));
    } else if (currentView === 'month') {
      setMonth(new Date(visibleMonth.getFullYear() - 1, visibleMonth.getMonth(), 1));
    } else {
      setYearPageStart((y) => y - YEAR_PAGE_SIZE);
    }
  };

  const handleNext = () => {
    if (currentView === 'date') {
      setMonth(addMonths(visibleMonth, 1));
    } else if (currentView === 'month') {
      setMonth(new Date(visibleMonth.getFullYear() + 1, visibleMonth.getMonth(), 1));
    } else {
      setYearPageStart((y) => y + YEAR_PAGE_SIZE);
    }
  };

  const grid = useMemo(
    () => buildGrid(visibleMonth, weekStartsOn),
    [visibleMonth, weekStartsOn],
  );
  const weekdays = weekStartsOn === 1 ? WEEKDAYS_MON : WEEKDAYS_SUN;
  const today = startOfDay(new Date());

  return (
    <div
      {...rest}
      className={cn('ui-datepicker', `ui-datepicker--view-${currentView}`, className)}
      role="group"
      aria-label="Date picker"
    >
      <div className="ui-datepicker__header">
        <div className="ui-datepicker__header-controls">
          <button
            type="button"
            className={cn(
              'ui-datepicker__pill',
              currentView === 'month' && 'ui-datepicker__pill--active',
            )}
            onClick={() => setView(currentView === 'month' ? 'date' : 'month')}
            aria-pressed={currentView === 'month'}
          >
            {MONTH_SHORT[visibleMonth.getMonth()]}
          </button>
          <button
            type="button"
            className={cn(
              'ui-datepicker__pill',
              currentView === 'year' && 'ui-datepicker__pill--active',
            )}
            onClick={() => setView(currentView === 'year' ? 'date' : 'year')}
            aria-pressed={currentView === 'year'}
          >
            {visibleMonth.getFullYear()}
          </button>
        </div>
        <div className="ui-datepicker__nav">
          <button
            type="button"
            className="ui-datepicker__nav-button"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="ui-datepicker__nav-button"
            onClick={handleNext}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {currentView === 'date' ? (
        <div className="ui-datepicker__calendar">
          <div className="ui-datepicker__weekdays" role="row">
            {weekdays.map((wd) => (
              <span key={wd} className="ui-datepicker__weekday" role="columnheader">
                {wd}
              </span>
            ))}
          </div>
          <div className="ui-datepicker__grid" role="grid">
            {grid.map((date) => {
              const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
              const isSelected = isSameDay(date, selected);
              const isToday = isSameDay(date, today);
              const disabled = isOutsideRange(date, min, max);
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  role="gridcell"
                  className={cn(
                    'ui-datepicker__day',
                    !isCurrentMonth && 'ui-datepicker__day--muted',
                    isSelected && 'ui-datepicker__day--selected',
                    isToday && !isSelected && 'ui-datepicker__day--today',
                  )}
                  onClick={() => handleSelectDate(date)}
                  disabled={disabled}
                  aria-selected={isSelected}
                  aria-current={isToday ? 'date' : undefined}
                  tabIndex={isSelected || (!selected && isToday) ? 0 : -1}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {currentView === 'month' ? (
        <div className="ui-datepicker__months" role="grid">
          {MONTH_NAMES.map((name, idx) => {
            const isSelected = idx === visibleMonth.getMonth();
            return (
              <button
                key={name}
                type="button"
                role="gridcell"
                className={cn(
                  'ui-datepicker__month-cell',
                  isSelected && 'ui-datepicker__month-cell--selected',
                )}
                onClick={() => handleSelectMonth(idx)}
                aria-selected={isSelected}
              >
                {name}
              </button>
            );
          })}
        </div>
      ) : null}

      {currentView === 'year' ? (
        <div className="ui-datepicker__years" role="grid">
          {Array.from({ length: YEAR_PAGE_SIZE }, (_, i) => yearPageStart + i).map((year) => {
            const isSelected = year === visibleMonth.getFullYear();
            return (
              <button
                key={year}
                type="button"
                role="gridcell"
                className={cn(
                  'ui-datepicker__year-cell',
                  isSelected && 'ui-datepicker__year-cell--selected',
                )}
                onClick={() => handleSelectYear(year)}
                aria-selected={isSelected}
              >
                {year}
              </button>
            );
          })}
        </div>
      ) : null}

      {showInfo ? (
        <div className="ui-datepicker__info">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M8 7.5v3.5M8 5h.01"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <span>{infoMessage}</span>
        </div>
      ) : null}

      {showActions ? (
        <div className="ui-datepicker__actions">
          <Button size="small" variant="tertiary" onClick={onReset}>
            Reset
          </Button>
          <div className="ui-datepicker__actions-right">
            <Button size="small" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="small" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
