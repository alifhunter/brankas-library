import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('does not render content until the trigger is hovered', () => {
    render(
      <Tooltip content="Helpful text">
        <button type="button">Save</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('shows on hover and hides on leave', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful text" openDelay={0} closeDelay={0}>
        <button type="button">Save</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful text'),
    );

    await user.unhover(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
  });

  it('shows on focus and hides on blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Save changes" openDelay={0} closeDelay={0}>
        <button type="button">Save</button>
      </Tooltip>,
    );

    await user.tab();
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());

    await user.tab();
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
  });

  it('exposes aria-describedby on the trigger while open', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Hint" openDelay={0}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    const btn = screen.getByRole('button');
    expect(btn).not.toHaveAttribute('aria-describedby');

    await user.hover(btn);
    await waitFor(() => {
      const tip = screen.getByRole('tooltip');
      expect(btn.getAttribute('aria-describedby')).toBe(tip.id);
    });
  });

  it('Escape closes the tooltip', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="X" openDelay={0}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
  });

  it('respects disabled', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="X" disabled openDelay={0}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('button'));
    // Wait a tick to confirm it stays closed
    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('preserves the child trigger handlers', async () => {
    const onMouseEnter = vi.fn();
    const onFocus = vi.fn();
    const user = userEvent.setup();

    render(
      <Tooltip content="X" openDelay={0}>
        <button type="button" onMouseEnter={onMouseEnter} onFocus={onFocus}>
          Trigger
        </button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('button'));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
