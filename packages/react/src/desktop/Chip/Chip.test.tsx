import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders as a toggle with aria-pressed reflecting selected', () => {
    const { rerender } = render(<Chip>Filter</Chip>);
    const chip = screen.getByRole('button', { name: 'Filter' });
    expect(chip).toHaveAttribute('aria-pressed', 'false');

    rerender(<Chip selected>Filter</Chip>);
    expect(chip).toHaveAttribute('aria-pressed', 'true');
  });

  it('fires onClick and shows badge content', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Chip onClick={onClick} badge={9}>
        Inbox
      </Chip>,
    );

    await user.click(screen.getByRole('button', { name: /inbox/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('default close trailing icon fires onTrailingIconClick without toggling chip', async () => {
    const onTrailing = vi.fn();
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Chip selected trailingIcon onTrailingIconClick={onTrailing} onClick={onClick}>
        Selected
      </Chip>,
    );

    const trailing = screen.getByRole('button', { name: '' });
    await user.click(trailing);

    expect(onTrailing).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('respects disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Chip disabled onClick={onClick}>
        Locked
      </Chip>,
    );

    await user.click(screen.getByRole('button', { name: 'Locked' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
