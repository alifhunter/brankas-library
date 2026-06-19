import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('defaults to the rectangle shape with 485×24', () => {
    const { container } = render(<Skeleton />);
    const el = container.querySelector('.ui-skeleton') as HTMLElement;
    expect(el).toHaveClass('ui-skeleton--rectangle');
    expect(el.style.width).toBe('485px');
    expect(el.style.height).toBe('24px');
    expect(el.style.borderRadius).toBe('4px');
  });

  it('renders a circle with equal width/height and 50% radius', () => {
    const { container } = render(<Skeleton shape="circle" width={40} />);
    const el = container.querySelector('.ui-skeleton') as HTMLElement;
    expect(el).toHaveClass('ui-skeleton--circle');
    expect(el.style.width).toBe('40px');
    expect(el.style.height).toBe('40px');
    expect(el.style.borderRadius).toBe('50%');
  });

  it('accepts CSS string sizes and custom radius', () => {
    const { container } = render(
      <Skeleton width="100%" height="2rem" radius="8px" />,
    );
    const el = container.querySelector('.ui-skeleton') as HTMLElement;
    expect(el.style.width).toBe('100%');
    expect(el.style.height).toBe('2rem');
    expect(el.style.borderRadius).toBe('8px');
  });

  it('honors animated=false by dropping the animation class', () => {
    const { container } = render(<Skeleton animated={false} />);
    expect(container.querySelector('.ui-skeleton')).not.toHaveClass('ui-skeleton--animated');
  });

  it('is announced as decorative via aria-hidden', () => {
    const { container } = render(<Skeleton aria-label="ignored" />);
    expect(container.querySelector('.ui-skeleton')).toHaveAttribute('aria-hidden', 'true');
  });
});
