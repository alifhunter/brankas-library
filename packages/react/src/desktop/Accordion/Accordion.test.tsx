import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('membuka dan menutup konten saat trigger ditekan', async () => {
    const user = userEvent.setup();

    render(<Accordion title="Transfer details" />);

    const trigger = screen.getByRole('button', { name: 'Transfer details' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region')).toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('menampilkan placeholder bawaan saat terbuka tanpa children', () => {
    render(<Accordion title="Transfer details" defaultOpen />);

    expect(screen.getByText('Placeholder Content')).toBeInTheDocument();
    expect(screen.getByText('replace with a local component')).toBeInTheDocument();
  });

  it('memanggil onOpenChange saat state berubah', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(<Accordion title="Transfer details" onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: 'Transfer details' }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('memanggil action button callback tanpa men-toggle accordion', async () => {
    const onActionClick = vi.fn();
    const user = userEvent.setup();

    render(<Accordion title="Transfer details" actionLabel="Button" onActionClick={onActionClick} />);

    await user.click(screen.getByRole('button', { name: 'Button' }));

    expect(onActionClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });
});
