import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Toast } from './Toast';
import { Toaster } from './Toaster';
import { clearAllToasts, toast } from './toast-store';

describe('Toast (visual)', () => {
  it('renders message and the correct type class', () => {
    const { container } = render(<Toast type="success">Saved</Toast>);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(container.querySelector('.ui-toast')).toHaveClass('ui-toast--success');
  });

  it('uses role=alert for errors and role=status otherwise', () => {
    const { rerender } = render(<Toast type="error">Failed</Toast>);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed');

    rerender(<Toast type="success">Saved</Toast>);
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });

  it('shows close button and fires onClose', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Toast close onClose={onClose}>
        Hello
      </Toast>,
    );

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders action button and fires onClick', async () => {
    const onAction = vi.fn();
    const user = userEvent.setup();
    render(
      <Toast action={{ label: 'Undo', onClick: onAction }}>
        Item deleted
      </Toast>,
    );

    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe('toast() imperative API + Toaster', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    clearAllToasts();
    vi.useRealTimers();
  });

  it('renders a toast pushed via toast()', () => {
    render(<Toaster />);

    act(() => {
      toast.success('Saved');
    });

    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('auto-dismisses after duration', async () => {
    render(<Toaster duration={1000} />);

    act(() => {
      toast('Hi');
    });
    expect(screen.getByText('Hi')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1100);
    });
    expect(screen.queryByText('Hi')).toBeNull();
  });

  it('respects per-call duration override', async () => {
    render(<Toaster duration={1000} />);

    act(() => {
      toast('Sticky', { duration: 5000 });
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(screen.getByText('Sticky')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3100);
    });
    expect(screen.queryByText('Sticky')).toBeNull();
  });

  it('does not auto-dismiss when duration is Infinity', async () => {
    render(<Toaster />);

    act(() => {
      toast('Persistent', { duration: Infinity });
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(20_000);
    });
    expect(screen.getByText('Persistent')).toBeInTheDocument();
  });

  it('dismisses on close button click via the manager', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<Toaster />);

    act(() => {
      toast.error('Oops', { duration: Infinity });
    });
    expect(screen.getByText('Oops')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Oops')).toBeNull();
  });

  it('toast.dismiss(id) removes a specific toast', () => {
    render(<Toaster duration={Infinity} />);

    let id = '';
    act(() => {
      id = toast('A');
      toast('B');
    });

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();

    act(() => {
      toast.dismiss(id);
    });

    expect(screen.queryByText('A')).toBeNull();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});
