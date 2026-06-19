import type { HTMLAttributes } from 'react';

export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  totalSlides?: number;
  activeSlide?: number;
  defaultActiveSlide?: number;
  onSlideChange?: (slide: number) => void;
  clickable?: boolean;
  ariaLabel?: string;
}
