import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles checked state on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox label="Subscribe" onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Subscribe' });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it('renders helper text and respects disabled state', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox label="Agree" helperText="Required" disabled onChange={onChange} />);

    expect(screen.getByText('Required')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox', { name: 'Agree' });
    expect(checkbox).toBeDisabled();

    await user.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('exposes indeterminate state and aria-checked=mixed', () => {
    render(<Checkbox label="Select all" indeterminate />);

    const checkbox = screen.getByRole('checkbox', { name: 'Select all' });
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    expect((checkbox as HTMLInputElement).indeterminate).toBe(true);
  });

  it('shows error message and sets aria-invalid', () => {
    render(<Checkbox label="Terms" error errorMessage="You must accept the terms" />);

    expect(screen.getByText('You must accept the terms')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Terms' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});
