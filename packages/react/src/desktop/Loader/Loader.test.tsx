import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loader } from './Loader';

describe('Loader', () => {
  it('renders with role=status and a default label', () => {
    render(<Loader />);
    const loader = screen.getByRole('status', { name: 'Loading' });
    expect(loader).toBeInTheDocument();
  });

  it('uses a custom label', () => {
    render(<Loader label="Importing transactions" />);
    expect(screen.getByRole('status', { name: 'Importing transactions' })).toBeInTheDocument();
  });

  it('respects the size prop', () => {
    const { container } = render(<Loader size={32} />);
    const root = container.querySelector('.ui-loader') as HTMLElement;
    expect(root.style.width).toBe('32px');
    expect(root.style.height).toBe('32px');
  });

  it('applies inverse color', () => {
    const { container } = render(<Loader inverse />);
    const root = container.querySelector('.ui-loader') as HTMLElement;
    expect(root.style.color).toContain('--color-icon-inverse');
  });

  it('applies a custom color override', () => {
    const { container } = render(<Loader color="#ff0044" />);
    const root = container.querySelector('.ui-loader') as HTMLElement;
    expect(root.style.color).toBe('rgb(255, 0, 68)');
  });
});
