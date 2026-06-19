import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders all pages when count fits without ellipsis', () => {
    render(<Pagination count={5} defaultPage={1} showRowsPerPage={false} />);
    for (const page of [1, 2, 3, 4, 5]) {
      expect(screen.getByRole('button', { name: `Page ${page}` })).toBeInTheDocument();
    }
    expect(screen.queryByText('…')).not.toBeInTheDocument();
  });

  it('shows ellipsis when count exceeds visible window', () => {
    render(<Pagination count={20} defaultPage={1} showRowsPerPage={false} />);
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Page 20' })).toBeInTheDocument();
  });

  it('navigates via clicking next/prev and page buttons (uncontrolled)', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination
        count={10}
        defaultPage={1}
        onPageChange={onPageChange}
        showRowsPerPage={false}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: 'Page 5' }));
    expect(onPageChange).toHaveBeenLastCalledWith(5);
  });

  it('disables prev on first page and next on last page', () => {
    const { rerender } = render(<Pagination count={5} page={1} showRowsPerPage={false} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled();

    rerender(<Pagination count={5} page={5} showRowsPerPage={false} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('rows-per-page select fires onRowsPerPageChange', async () => {
    const user = userEvent.setup();
    const onRowsPerPageChange = vi.fn();
    render(
      <Pagination
        count={5}
        defaultPage={1}
        rowsPerPage={10}
        rowsPerPageOptions={[10, 25, 50]}
        onRowsPerPageChange={onRowsPerPageChange}
      />,
    );

    await user.selectOptions(screen.getByRole('combobox', { name: /rows per page/i }), '25');
    expect(onRowsPerPageChange).toHaveBeenCalledWith(25);
  });
});
