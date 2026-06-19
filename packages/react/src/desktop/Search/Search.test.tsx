import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Search } from './Search';
import { SearchResultPanel } from './SearchResultPanel';

describe('Search', () => {
  it('fires onValueChange on each keystroke (uncontrolled)', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(<Search onValueChange={onValueChange} showShortcutHint={false} />);
    const input = screen.getByRole('searchbox');

    await user.type(input, 'abc');
    expect(onValueChange).toHaveBeenCalledTimes(3);
    expect(onValueChange).toHaveBeenLastCalledWith('abc');
  });

  it('shows the clear button only when there is a value', async () => {
    const user = userEvent.setup();
    render(<Search showShortcutHint={false} />);
    const input = screen.getByRole('searchbox');

    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();

    await user.type(input, 'hello');
    const clear = screen.getByRole('button', { name: 'Clear search' });

    await user.click(clear);
    expect(input).toHaveValue('');
  });

  it('renders the optional Cari button and fires onButtonClick', async () => {
    const onButtonClick = vi.fn();
    const user = userEvent.setup();

    render(<Search showButton onButtonClick={onButtonClick} buttonLabel="Search" showShortcutHint={false} />);
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('respects disabled', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(<Search disabled onValueChange={onValueChange} showShortcutHint={false} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeDisabled();

    await user.type(input, 'x');
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe('SearchResultPanel', () => {
  it('renders the default prompt', () => {
    render(<SearchResultPanel state="default" />);
    expect(screen.getByText('Ketik minimal 3 karakter')).toBeInTheDocument();
  });

  it('renders an empty message', () => {
    render(<SearchResultPanel state="empty" emptyMessage="Tidak ada hasil yang cocok" />);
    expect(screen.getByText('Tidak ada hasil yang cocok')).toBeInTheDocument();
  });

  it('renders result items and fires onClick', async () => {
    const onItemClick = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchResultPanel
        state="result"
        items={[
          { id: '1', label: 'John Legend', helper: '001234', onClick: onItemClick },
          { id: '2', label: 'Jane Doe', helper: '005678' },
        ]}
      />,
    );

    expect(screen.getByText('John Legend')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();

    await user.click(screen.getByText('John Legend'));
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
