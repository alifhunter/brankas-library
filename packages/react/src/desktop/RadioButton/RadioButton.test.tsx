import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RadioButton } from './RadioButton';

describe('RadioButton', () => {
  it('memanggil onChange saat dipilih', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<RadioButton name="plan" label="Plan A" onChange={onChange} />);

    await user.click(screen.getByRole('radio', { name: 'Plan A' }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('render helper text dan size small dengan benar', () => {
    const { unmount } = render(<RadioButton name="plan" label="Plan A" helperText="Helper text" />);

    expect(screen.getByText('Helper text')).toBeInTheDocument();

    unmount();
    render(<RadioButton name="plan" label="Plan A" size="small" checked readOnly />);

    expect(screen.getByRole('radio', { name: 'Plan A' })).toBeChecked();
    expect(screen.getByText('Plan A').closest('.ui-radio')).toHaveClass('ui-radio--size-small');
  });
});
