import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProgressIndicator } from './ProgressIndicator';

const steps = [{ label: 'Details' }, { label: 'Review' }, { label: 'Confirm' }];

describe('ProgressIndicator', () => {
  it('marks the current step with aria-current=step', () => {
    render(<ProgressIndicator steps={steps} currentStep={2} />);

    const items = screen.getAllByRole('listitem');
    expect(items[0]).not.toHaveAttribute('aria-current');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[2]).not.toHaveAttribute('aria-current');
  });

  it('applies completed/current/upcoming classes per position', () => {
    const { container } = render(<ProgressIndicator steps={steps} currentStep={2} />);
    const items = container.querySelectorAll('.ui-progress-indicator__step');
    expect(items[0]).toHaveClass('ui-progress-indicator__step--completed');
    expect(items[1]).toHaveClass('ui-progress-indicator__step--current');
    expect(items[2]).toHaveClass('ui-progress-indicator__step--upcoming');
  });

  it('fires onStepClick only for completed/current steps', async () => {
    const onStepClick = vi.fn();
    const user = userEvent.setup();
    render(<ProgressIndicator steps={steps} currentStep={2} onStepClick={onStepClick} />);

    // Completed step is clickable
    await user.click(screen.getByRole('button', { name: /Details/ }));
    expect(onStepClick).toHaveBeenLastCalledWith(1);

    // Current step is clickable
    await user.click(screen.getByRole('button', { name: /Review/ }));
    expect(onStepClick).toHaveBeenLastCalledWith(2);

    // Upcoming step has no button — query returns null
    expect(screen.queryByRole('button', { name: /Confirm/ })).toBeNull();
  });

  it('honors an explicit step.status override', () => {
    const customSteps = [
      { label: 'A', status: 'completed' as const },
      { label: 'B', status: 'current' as const },
      { label: 'C', status: 'upcoming' as const },
    ];
    const { container } = render(<ProgressIndicator steps={customSteps} currentStep={1} />);
    const items = container.querySelectorAll('.ui-progress-indicator__step');
    expect(items[0]).toHaveClass('ui-progress-indicator__step--completed');
    expect(items[1]).toHaveClass('ui-progress-indicator__step--current');
    expect(items[2]).toHaveClass('ui-progress-indicator__step--upcoming');
  });
});
