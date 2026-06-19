import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Coachmark } from './Coachmark';

describe('Coachmark', () => {
  it('renders title and body content', () => {
    render(<Coachmark title="Review">Use this for guided steps.</Coachmark>);

    expect(screen.getByRole('dialog', { name: 'Review' })).toBeInTheDocument();
    expect(screen.getByText('Use this for guided steps.')).toBeInTheDocument();
  });

  it('fires onDismiss when the close button is clicked', async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(<Coachmark onDismiss={onDismiss}>Body</Coachmark>);

    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('hides the close button when close=false', () => {
    render(<Coachmark close={false}>Body</Coachmark>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).toBeNull();
  });

  it('renders config dots and default action buttons', async () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    const user = userEvent.setup();

    render(
      <Coachmark
        config
        totalSteps={3}
        currentStep={2}
        onPrimaryAction={onPrimary}
        onSecondaryAction={onSecondary}
      >
        Body
      </Coachmark>,
    );

    await user.click(screen.getByRole('button', { name: 'Button 1' }));
    await user.click(screen.getByRole('button', { name: 'Button 2' }));
    expect(onSecondary).toHaveBeenCalledTimes(1);
    expect(onPrimary).toHaveBeenCalledTimes(1);
  });

  it('applies the position class', () => {
    const { container } = render(<Coachmark position="bottom-right">Body</Coachmark>);
    expect(container.querySelector('.ui-coachmark')).toHaveClass('ui-coachmark--bottom-right');
  });
});
