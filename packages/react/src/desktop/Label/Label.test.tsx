import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Label } from './Label';
import { StatusLabel } from './StatusLabel';

describe('Label', () => {
  it('renders content with default neutral variant', () => {
    render(<Label>Label text</Label>);
    const label = screen.getByText('Label text').closest('.ui-label');
    expect(label).toHaveClass('ui-label--neutral');
  });

  it('applies the requested variant class', () => {
    render(<Label variant="warning">Warn</Label>);
    expect(screen.getByText('Warn').closest('.ui-label')).toHaveClass('ui-label--warning');
  });

  it('hides the icon when icon=false', () => {
    const { container } = render(
      <Label variant="positive" icon={false}>
        Done
      </Label>,
    );
    expect(container.querySelector('.ui-label__icon')).toBeNull();
  });

  it('exposes button semantics when onClick is set', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Label variant="information" onClick={onClick}>
        Tag
      </Label>,
    );
    const tag = screen.getByRole('button', { name: 'Tag' });
    await user.click(tag);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('StatusLabel (legacy)', () => {
  it('maps tone="success" to variant="positive"', () => {
    render(<StatusLabel tone="success">Active</StatusLabel>);
    expect(screen.getByText('Active').closest('.ui-label')).toHaveClass('ui-label--positive');
  });

  it('maps tone="error" to variant="negative"', () => {
    render(<StatusLabel tone="error">Failed</StatusLabel>);
    expect(screen.getByText('Failed').closest('.ui-label')).toHaveClass('ui-label--negative');
  });
});
