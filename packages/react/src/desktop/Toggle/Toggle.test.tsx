import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('memanggil onChange saat diubah', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Toggle label="Enable notifications" onChange={onChange} />);

    await user.click(screen.getByRole('switch', { name: 'Enable notifications' }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('render helper text dan state checked dengan benar', () => {
    const { unmount } = render(<Toggle label="Enable notifications" helperText="Helper text" />);

    expect(screen.getByText('Helper text')).toBeInTheDocument();

    unmount();
    render(<Toggle label="Enable notifications" size="small" checked readOnly />);

    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeChecked();
    expect(screen.getByText('Enable notifications').closest('.ui-toggle')).toHaveClass(
      'ui-toggle--size-small',
    );
  });
});
