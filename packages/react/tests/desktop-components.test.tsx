import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Accordion,
  Button,
  Checkbox,
  Dialog,
  Search,
  SearchResultPanel,
  TextField,
  Toggle,
} from '../src/desktop/index.js';

describe('desktop component behavior', () => {
  it('toggles accordion content and announces expanded state', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Accordion onOpenChange={onOpenChange} title="Account details">
        Expanded account content
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: /Account details/ });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('keeps native form controls operable through their labels', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Checkbox label="Accept terms" />
        <Toggle label="Enable notifications" />
      </>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    const toggle = screen.getByRole('switch', { name: 'Enable notifications' });

    expect(checkbox).not.toBeChecked();
    expect(toggle).not.toBeChecked();

    await user.click(screen.getByText('Accept terms'));
    await user.click(screen.getByText('Enable notifications'));

    expect(checkbox).toBeChecked();
    expect(toggle).toBeChecked();
  });

  it('exposes disabled button state through the native button element', () => {
    render(<Button disabled>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('calls dialog onOpenChange when the close button is pressed', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(<Dialog open onOpenChange={onOpenChange} title="Confirm transfer" />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('desktop component key states', () => {
  it('renders search filled and result states from props', () => {
    render(
      <>
        <Search defaultValue="Sinarmas Terang Silau" />
        <SearchResultPanel
          state="result"
          items={[
            { id: '1', label: 'John Legend', helper: '001234' },
            { id: '2', label: 'John Legend', helper: '001234' },
            { id: '3', label: 'John Legend', helper: '001234' },
          ]}
        />
      </>,
    );

    expect(screen.getByDisplayValue('Sinarmas Terang Silau')).toBeInTheDocument();
    expect(screen.getByText('untuk mencari')).toBeInTheDocument();
    expect(screen.getAllByText('John Legend')).toHaveLength(3);
  });

  it('renders text field error message and counter for error-filled state', () => {
    render(
      <TextField
        label="Email"
        counterText="0/250"
        errorMessage="Email is required"
        state="error-filled"
        value="Filled"
        readOnly
      />,
    );

    expect(screen.getByDisplayValue('Filled')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('0/250')).toBeInTheDocument();
  });

});
