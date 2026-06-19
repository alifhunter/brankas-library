import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('render angka default untuk type number', () => {
    render(<Badge />);

    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('9')).toHaveClass('ui-badge--type-number');
  });

  it('render dot tanpa konten teks', () => {
    render(<Badge type="dot" color="blue" data-testid="badge" />);

    expect(screen.getByTestId('badge')).toHaveTextContent('');
    expect(screen.getByTestId('badge')).toHaveClass('ui-badge--type-dot');
  });

  it('render label New sebagai default untuk type new', () => {
    render(<Badge type="new" color="red" />);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('fallback warna dot ke red jika color tidak valid untuk dot', () => {
    render(<Badge type="dot" color="primary" data-testid="badge" />);

    expect(screen.getByTestId('badge')).toHaveClass('ui-badge--color-red');
  });
});
