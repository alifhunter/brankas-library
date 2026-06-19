import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('exposes role=progressbar with valuenow', () => {
    render(<ProgressBar value={42} aria-label="Upload" />);
    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar).toHaveAttribute('aria-valuenow', '42');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps values outside 0–100', () => {
    const { rerender } = render(<ProgressBar value={150} aria-label="Bar" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');

    rerender(<ProgressBar value={-30} aria-label="Bar" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('applies size and variant classes', () => {
    const { container, rerender } = render(<ProgressBar value={50} size="large" variant="inverse" />);
    const bar = container.querySelector('.ui-progressbar') as HTMLElement;
    expect(bar).toHaveClass('ui-progressbar--large');
    expect(bar).toHaveClass('ui-progressbar--inverse');

    rerender(<ProgressBar value={50} />);
    const bar2 = container.querySelector('.ui-progressbar') as HTMLElement;
    expect(bar2).toHaveClass('ui-progressbar--small');
    expect(bar2).toHaveClass('ui-progressbar--default');
  });

  it('renders the fill width as the value percent', () => {
    const { container } = render(<ProgressBar value={75} />);
    const fill = container.querySelector('.ui-progressbar__fill') as HTMLElement;
    expect(fill.style.width).toBe('75%');
  });
});
