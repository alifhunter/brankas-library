import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SelectButton } from './SelectButton';
import { SelectItem } from './SelectItem';
import { SelectPanel } from './SelectPanel';

describe('SelectButton', () => {
  it('shows the placeholder when no value is set', () => {
    render(<SelectButton placeholder="Choose one" />);
    expect(screen.getByRole('button')).toHaveTextContent('Choose one');
  });

  it('shows the value and badge when provided', () => {
    render(<SelectButton value="Indonesia" badge={9} />);
    expect(screen.getByRole('button')).toHaveTextContent('Indonesia');
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('reflects open state via aria-expanded and chevron rotation class', () => {
    const { container, rerender } = render(<SelectButton placeholder="P" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-expanded', 'false');

    rerender(<SelectButton placeholder="P" open />);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('.ui-select-button')).toHaveClass('ui-select-button--open');
  });

  it('fires onClick and respects disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(<SelectButton placeholder="X" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<SelectButton placeholder="X" onClick={onClick} disabled />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('SelectPanel + SelectItem', () => {
  it('renders items as options with proper roles', () => {
    render(
      <SelectPanel>
        <SelectItem>First</SelectItem>
        <SelectItem selected>Second</SelectItem>
      </SelectPanel>,
    );

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('fires onClick on item activation (click and Enter)', async () => {
    const onPick = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectPanel>
        <SelectItem onClick={onPick}>Pick me</SelectItem>
      </SelectPanel>,
    );

    const item = screen.getByRole('option', { name: 'Pick me' });
    await user.click(item);
    expect(onPick).toHaveBeenCalledTimes(1);

    item.focus();
    await user.keyboard('{Enter}');
    expect(onPick).toHaveBeenCalledTimes(2);
  });

  it('search input fires onSearchChange and updates the value when uncontrolled', async () => {
    const onSearchChange = vi.fn();
    const user = userEvent.setup();

    render(<SelectPanel searchable onSearchChange={onSearchChange} />);
    const search = screen.getByRole('searchbox');
    await user.type(search, 'abc');
    expect(onSearchChange).toHaveBeenLastCalledWith('abc');
    expect(search).toHaveValue('abc');
  });

  it('renders empty state and hides the apply button', () => {
    render(
      <SelectPanel empty showApplyButton emptyMessage="Nothing yet">
        <SelectItem>Hidden</SelectItem>
      </SelectPanel>,
    );

    expect(screen.getByText('Nothing yet')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /terapkan/i })).toBeNull();
  });

  it('apply button fires onApply', async () => {
    const onApply = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectPanel showApplyButton onApply={onApply} applyLabel="Apply">
        <SelectItem>One</SelectItem>
      </SelectPanel>,
    );

    await user.click(screen.getByRole('button', { name: 'Apply' }));
    expect(onApply).toHaveBeenCalledTimes(1);
  });
});
