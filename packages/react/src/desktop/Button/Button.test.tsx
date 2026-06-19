import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('calls onClick when pressed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Save</Button>);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button loading>Saving</Button>);

    expect(screen.getByRole('button', { name: 'Saving' })).toBeDisabled();
  });

  it('renders with leadingIcon and trailingIcon', () => {
    render(
      <Button leadingIcon={<span data-testid="left">L</span>} trailingIcon={<span data-testid="right">R</span>}>
        Hello
      </Button>,
    );

    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });

  it('hides label when iconOnly is set', () => {
    render(
      <Button iconOnly leadingIcon={<span aria-hidden="true">+</span>} aria-label="Add">
        Hidden
      </Button>,
    );

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});
