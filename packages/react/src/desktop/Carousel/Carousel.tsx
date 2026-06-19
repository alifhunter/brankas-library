import { useMemo, useState } from 'react';
import { cn } from '../../lib/cn.js';
import type { CarouselProps } from './Carousel.types';
import './Carousel.css';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function Carousel({
  totalSlides = 5,
  activeSlide,
  defaultActiveSlide = 1,
  onSlideChange,
  clickable = true,
  ariaLabel = 'Carousel navigation',
  className,
  ...props
}: CarouselProps) {
  const normalizedTotalSlides = clamp(Math.round(totalSlides), 1, 7);
  const [uncontrolledSlide, setUncontrolledSlide] = useState(() =>
    clamp(Math.round(defaultActiveSlide), 1, normalizedTotalSlides),
  );

  const effectiveSlide = clamp(
    Math.round(activeSlide ?? uncontrolledSlide),
    1,
    normalizedTotalSlides,
  );

  const dots = useMemo(
    () => Array.from({ length: normalizedTotalSlides }, (_, index) => index + 1),
    [normalizedTotalSlides],
  );

  const setSlide = (nextSlide: number) => {
    const normalizedSlide = clamp(nextSlide, 1, normalizedTotalSlides);

    if (activeSlide === undefined) {
      setUncontrolledSlide(normalizedSlide);
    }

    onSlideChange?.(normalizedSlide);
  };

  return (
    <div
      className={cn('ui-carousel', className)}
      role="group"
      aria-label={ariaLabel}
      {...props}
    >
      {dots.map((slideNumber) => {
        const isActive = slideNumber === effectiveSlide;

        return (
          <button
            key={slideNumber}
            type="button"
            className={cn('ui-carousel__dot', isActive && 'ui-carousel__dot--active')}
            aria-label={`Go to slide ${slideNumber}`}
            aria-current={isActive ? 'true' : undefined}
            aria-pressed={isActive}
            disabled={!clickable}
            onClick={() => setSlide(slideNumber)}
          />
        );
      })}
    </div>
  );
}
