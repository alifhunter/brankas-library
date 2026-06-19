import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('associates the label with the textarea', () => {
    render(<TextArea label="Notes" placeholder="Type here" />);
    const ta = screen.getByLabelText('Notes');
    expect(ta).toBeInTheDocument();
    expect(ta).toHaveAttribute('placeholder', 'Type here');
  });

  it('fires onChange and forwards the value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TextArea label="Notes" onChange={onChange} />);

    await user.type(screen.getByLabelText('Notes'), 'hi');
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByLabelText('Notes')).toHaveValue('hi');
  });

  it('renders helper text below by default and counter beside it', () => {
    render(
      <TextArea
        label="Notes"
        helperText="Below helper"
        counterText="0/250"
      />,
    );
    expect(screen.getByText('Below helper')).toBeInTheDocument();
    expect(screen.getByText('0/250')).toBeInTheDocument();
  });

  it('places helper text above when helperPosition="above"', () => {
    const { container } = render(
      <TextArea label="Notes" helperPosition="above" helperText="Above helper" counterText="0/250" />,
    );
    expect(container.querySelector('.ui-textarea')).toHaveClass('ui-textarea--helper-above');
    expect(screen.getByText('Above helper').closest('.ui-textarea__title-group')).not.toBeNull();
  });

  it('renders error state with icon and message, sets aria-invalid', () => {
    render(
      <TextArea
        label="Notes"
        errorMessage="Required"
        counterText="0/250"
      />,
    );
    const ta = screen.getByLabelText('Notes');
    expect(ta).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('respects disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TextArea label="Notes" disabled onChange={onChange} />);

    const ta = screen.getByLabelText('Notes');
    expect(ta).toBeDisabled();

    await user.type(ta, 'x');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows a required asterisk in the label', () => {
    render(<TextArea label="Notes" required />);
    expect(screen.getByLabelText(/Notes/)).toBeRequired();
    expect(screen.getByText(/\*/)).toBeInTheDocument();
  });
});
