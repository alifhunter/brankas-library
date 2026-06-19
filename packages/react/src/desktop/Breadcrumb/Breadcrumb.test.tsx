import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('menandai item terakhir sebagai active secara default', () => {
    render(<Breadcrumb items={[{ label: 'Root' }, { label: 'Products' }]} />);

    const active = screen.getByRole('button', { name: 'Products' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active).toBeDisabled();
  });

  it('menampilkan ellipsis ketika jumlah item melewati collapseAfter', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Root' },
          { label: 'A' },
          { label: 'B' },
          { label: 'C' },
          { label: 'D' },
          { label: 'E' },
        ]}
        collapseAfter={5}
      />,
    );

    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('memanggil onItemClick saat item non-active diklik', async () => {
    const onItemClick = vi.fn();
    const user = userEvent.setup();

    render(<Breadcrumb items={[{ label: 'Root' }, { label: 'Products' }]} onItemClick={onItemClick} />);

    await user.click(screen.getByRole('button', { name: 'Root' }));
    expect(onItemClick).toHaveBeenCalledWith(0, { label: 'Root' });
  });

  it('render anchor untuk item yang memiliki href', () => {
    render(<Breadcrumb items={[{ label: 'Root', href: '/root' }, { label: 'Products' }]} />);

    expect(screen.getByRole('link', { name: 'Root' })).toHaveAttribute('href', '/root');
  });
});
