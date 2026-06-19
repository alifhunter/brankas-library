import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('menutup dialog ketika ESC ditekan', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog open onOpenChange={onOpenChange} title="Review transfer">
        Content
      </Dialog>,
    );

    await user.keyboard('{Escape}');

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('tidak menutup dialog lewat ESC jika closeOnEsc=false', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog open onOpenChange={onOpenChange} title="Review transfer" closeOnEsc={false}>
        Content
      </Dialog>,
    );

    await user.keyboard('{Escape}');

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('focus berpindah ke dalam dialog saat dialog dibuka', async () => {
    render(
      <Dialog open onOpenChange={() => {}} title="Review transfer">
        Content
      </Dialog>,
    );

    expect(await screen.findByRole('button', { name: 'Close dialog' })).toHaveFocus();
  });

  it('menutup dialog ketika overlay diklik', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Dialog open onOpenChange={onOpenChange} title="Review transfer">
        Content
      </Dialog>,
    );

    await user.click(screen.getByTestId('dialog-backdrop'));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
