import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from './Tabs';

const items = [
  { value: 'overview', label: 'Overview', panel: <p>Overview content</p> },
  { value: 'activity', label: 'Activity', badge: 9, panel: <p>Activity content</p> },
  { value: 'settings', label: 'Settings', disabled: true, panel: <p>Settings content</p> },
];

describe('Tabs', () => {
  it('renders tablist with proper roles and ARIA', () => {
    render(<Tabs items={items} />);

    const tablist = screen.getByRole('tablist', { name: 'Tabs' });
    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[2]).toHaveAttribute('aria-disabled', 'true');
    expect(tabs[2]).toBeDisabled();
  });

  it('only the active panel is visible (others hidden but mounted)', () => {
    render(<Tabs items={items} />);

    const panels = screen.getAllByRole('tabpanel', { hidden: true });
    expect(panels).toHaveLength(3);
    expect(panels[0]).not.toHaveAttribute('hidden');
    expect(panels[1]).toHaveAttribute('hidden');
    expect(panels[2]).toHaveAttribute('hidden');
  });

  it('clicking a tab activates it and fires onValueChange', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Tabs items={items} onValueChange={onValueChange} />);

    await user.click(screen.getByRole('tab', { name: /Activity/ }));
    expect(onValueChange).toHaveBeenCalledWith('activity');
    expect(screen.getByRole('tab', { name: /Activity/ })).toHaveAttribute('aria-selected', 'true');
  });

  it('disabled tab cannot be activated by click', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Tabs items={items} onValueChange={onValueChange} />);

    await user.click(screen.getByRole('tab', { name: /Settings/ }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('ArrowRight moves and activates the next enabled tab, Home returns to first', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);

    const overview = screen.getByRole('tab', { name: /Overview/ });
    overview.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: /Activity/ })).toHaveAttribute('aria-selected', 'true');

    // Settings is disabled → ArrowRight should skip back to Overview
    await user.keyboard('{ArrowRight}');
    expect(overview).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: /Activity/ })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(overview).toHaveAttribute('aria-selected', 'true');
  });

  it('uses ArrowDown/ArrowUp for vertical orientation', async () => {
    const user = userEvent.setup();
    render(<Tabs type="vertical" items={items} />);

    const overview = screen.getByRole('tab', { name: /Overview/ });
    overview.focus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('tab', { name: /Activity/ })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders number badges via the Badge component', () => {
    render(<Tabs items={items} />);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('works as a controlled component', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <Tabs items={items} value="activity" onValueChange={onValueChange} />,
    );
    expect(screen.getByRole('tab', { name: /Activity/ })).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('tab', { name: /Overview/ }));
    expect(onValueChange).toHaveBeenCalledWith('overview');
    // Without a state update from the parent, the active tab stays
    expect(screen.getByRole('tab', { name: /Activity/ })).toHaveAttribute('aria-selected', 'true');

    rerender(<Tabs items={items} value="overview" onValueChange={onValueChange} />);
    expect(screen.getByRole('tab', { name: /Overview/ })).toHaveAttribute('aria-selected', 'true');
  });
});
