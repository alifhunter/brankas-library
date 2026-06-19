import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders the visible month and weekday headers', () => {
    render(<DatePicker defaultMonth={new Date(2025, 11, 1)} />);

    expect(screen.getByRole('button', { name: 'Dec' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2025' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Su' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Sa' })).toBeInTheDocument();
  });

  it('selects a date and fires onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<DatePicker defaultMonth={new Date(2025, 11, 1)} onChange={onChange} />);

    // 12 appears in both header (year mode pill not selected) and grid; pick the gridcell.
    const grid = screen.getByRole('grid');
    const day12 = within(grid).getByRole('gridcell', { name: '12' });

    await user.click(day12);

    expect(onChange).toHaveBeenCalledTimes(1);
    const arg = onChange.mock.calls[0]?.[0] as Date;
    expect(arg.getFullYear()).toBe(2025);
    expect(arg.getMonth()).toBe(11);
    expect(arg.getDate()).toBe(12);
    expect(day12).toHaveAttribute('aria-selected', 'true');
  });

  it('navigates months via next/prev', async () => {
    const user = userEvent.setup();

    render(<DatePicker defaultMonth={new Date(2025, 11, 1)} />);

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('button', { name: 'Jan' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2026' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByRole('button', { name: 'Dec' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2025' })).toBeInTheDocument();
  });

  it('switches to month view and selects a month', async () => {
    const user = userEvent.setup();

    render(<DatePicker defaultMonth={new Date(2025, 11, 1)} />);

    await user.click(screen.getByRole('button', { name: 'Dec' }));
    // Month grid now visible
    const monthGrid = screen.getByRole('grid');
    const february = within(monthGrid).getByRole('gridcell', { name: 'February' });
    await user.click(february);

    // back to date view
    expect(screen.getByRole('button', { name: 'Feb' })).toBeInTheDocument();
  });

  it('disables dates outside min/max', () => {
    render(
      <DatePicker
        defaultMonth={new Date(2025, 11, 1)}
        min={new Date(2025, 11, 10)}
        max={new Date(2025, 11, 20)}
      />,
    );

    const grid = screen.getByRole('grid');
    // Filter to current-month cells — overflow days from prev/next month carry the --muted class.
    const currentMonthDay = (label: string) =>
      within(grid)
        .getAllByRole('gridcell', { name: label })
        .find((el) => !el.classList.contains('ui-datepicker__day--muted')) as HTMLButtonElement;

    expect(currentMonthDay('8')).toBeDisabled();
    expect(currentMonthDay('15')).not.toBeDisabled();
    expect(currentMonthDay('25')).toBeDisabled();
  });
});
