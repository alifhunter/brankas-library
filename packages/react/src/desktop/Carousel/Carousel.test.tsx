import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Carousel } from './Carousel';

describe('Carousel', () => {
  it('render jumlah dot sesuai totalSlides', () => {
    render(<Carousel totalSlides={5} />);

    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('membatasi jumlah dot maksimal 7 dan minimal 1', () => {
    const { rerender } = render(<Carousel totalSlides={9} />);
    expect(screen.getAllByRole('button')).toHaveLength(7);

    rerender(<Carousel totalSlides={0} />);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('mengubah active dot saat diklik pada mode uncontrolled', async () => {
    const user = userEvent.setup();

    render(<Carousel totalSlides={5} defaultActiveSlide={1} />);

    const dot2 = screen.getByRole('button', { name: 'Go to slide 2' });
    await user.click(dot2);

    expect(dot2).toHaveClass('ui-carousel__dot--active');
  });

  it('memanggil onSlideChange saat dot diklik', async () => {
    const onSlideChange = vi.fn();
    const user = userEvent.setup();

    render(<Carousel totalSlides={5} onSlideChange={onSlideChange} />);

    await user.click(screen.getByRole('button', { name: 'Go to slide 4' }));
    expect(onSlideChange).toHaveBeenCalledWith(4);
  });
});
