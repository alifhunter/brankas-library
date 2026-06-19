import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Sidebar } from './Sidebar';
import type { SidebarMenuItem } from './Sidebar.types';

const items: SidebarMenuItem[] = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'transfers', label: 'Transfers' },
  { value: 'reports', label: 'Reports' },
  { value: 'settings', label: 'Settings', disabled: true },
];

const nested: SidebarMenuItem[] = [
  { value: 'dashboard', label: 'Dashboard' },
  {
    value: 'payments',
    label: 'Payments',
    children: [
      {
        value: 'transfers',
        label: 'Transfers',
        children: [
          { value: 'single', label: 'Single transfer' },
          { value: 'bulk', label: 'Bulk transfer' },
        ],
      },
      { value: 'payroll', label: 'Payroll' },
    ],
  },
];

describe('Sidebar', () => {
  it('renders a navigation landmark with one control per item', () => {
    render(<Sidebar items={items} aria-label="Main" />);
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('marks the first enabled item active by default via aria-current', () => {
    render(<Sidebar items={items} />);
    expect(screen.getByRole('button', { name: /Dashboard/ })).toHaveAttribute('aria-current', 'page');
  });

  it('honours defaultActiveValue', () => {
    render(<Sidebar items={items} defaultActiveValue="reports" />);
    expect(screen.getByRole('button', { name: /Reports/ })).toHaveAttribute('aria-current', 'page');
  });

  it('clicking an item activates it and fires onActiveChange', async () => {
    const onActiveChange = vi.fn();
    const user = userEvent.setup();
    render(<Sidebar items={items} onActiveChange={onActiveChange} />);

    await user.click(screen.getByRole('button', { name: /Transfers/ }));
    expect(onActiveChange).toHaveBeenCalledWith('transfers');
    expect(screen.getByRole('button', { name: /Transfers/ })).toHaveAttribute('aria-current', 'page');
  });

  it('disabled item cannot be activated', async () => {
    const onActiveChange = vi.fn();
    const user = userEvent.setup();
    render(<Sidebar items={items} onActiveChange={onActiveChange} />);

    const settings = screen.getByRole('button', { name: /Settings/ });
    expect(settings).toBeDisabled();
    await user.click(settings);
    expect(onActiveChange).not.toHaveBeenCalled();
  });

  it('renders items with href as links', () => {
    render(<Sidebar items={items.map((it) => ({ ...it, href: `/${it.value}` }))} />);
    const link = screen.getByRole('link', { name: /Dashboard/ });
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('ArrowDown/ArrowUp move focus, skipping disabled items', async () => {
    const user = userEvent.setup();
    render(<Sidebar items={items} />);

    const dashboard = screen.getByRole('button', { name: /Dashboard/ });
    dashboard.focus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: /Transfers/ })).toHaveFocus();

    await user.keyboard('{End}');
    // Settings is disabled → End lands on the last enabled item (Reports)
    expect(screen.getByRole('button', { name: /Reports/ })).toHaveFocus();

    await user.keyboard('{Home}');
    expect(dashboard).toHaveFocus();
  });

  it('works as a controlled component', async () => {
    const onActiveChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <Sidebar items={items} activeValue="transfers" onActiveChange={onActiveChange} />,
    );
    expect(screen.getByRole('button', { name: /Transfers/ })).toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: /Reports/ }));
    expect(onActiveChange).toHaveBeenCalledWith('reports');
    // Parent didn't update the prop → active stays on Transfers
    expect(screen.getByRole('button', { name: /Transfers/ })).toHaveAttribute('aria-current', 'page');

    rerender(<Sidebar items={items} activeValue="reports" onActiveChange={onActiveChange} />);
    expect(screen.getByRole('button', { name: /Reports/ })).toHaveAttribute('aria-current', 'page');
  });

  it('renders the collapse control only when requested and toggles collapsed state', async () => {
    const onCollapsedChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<Sidebar items={items} />);
    expect(screen.queryByRole('button', { name: /Collapse sidebar/ })).not.toBeInTheDocument();

    rerender(<Sidebar items={items} showCollapseControl onCollapsedChange={onCollapsedChange} />);
    const collapse = screen.getByRole('button', { name: 'Collapse sidebar' });
    expect(collapse).toHaveAttribute('aria-expanded', 'true');

    await user.click(collapse);
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  describe('nested menus', () => {
    it('renders groups with aria-expanded and keeps collapsed children unmounted', () => {
      render(<Sidebar items={nested} />);
      const payments = screen.getByRole('button', { name: /Payments/ });
      expect(payments).toHaveAttribute('aria-expanded', 'false');
      // Collapsed → nested items are not rendered
      expect(screen.queryByRole('button', { name: /Payroll/ })).not.toBeInTheDocument();
    });

    it('clicking a parent toggles its submenu without changing the active item', async () => {
      const onActiveChange = vi.fn();
      const user = userEvent.setup();
      render(<Sidebar items={nested} onActiveChange={onActiveChange} />);

      await user.click(screen.getByRole('button', { name: /Payments/ }));
      expect(onActiveChange).not.toHaveBeenCalled();
      expect(screen.getByRole('button', { name: /Payments/ })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(screen.getByRole('button', { name: /Payroll/ })).toBeInTheDocument();
    });

    it('auto-expands the ancestors of the active item', () => {
      render(<Sidebar items={nested} defaultActiveValue="single" />);
      // Both the parent and child groups should be open, revealing the active grandchild
      expect(screen.getByRole('button', { name: /Payments/ })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(screen.getByRole('button', { name: /^Transfers/ })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(screen.getByRole('button', { name: /Single transfer/ })).toHaveAttribute(
        'aria-current',
        'page',
      );
    });

    it('highlights the active item ancestors, but keeps aria-current on the leaf only', () => {
      render(<Sidebar items={nested} defaultActiveValue="single" />);

      const payments = screen.getByRole('button', { name: /Payments/ });
      const transfers = screen.getByRole('button', { name: /^Transfers/ });
      const single = screen.getByRole('button', { name: /Single transfer/ });
      const payroll = screen.getByRole('button', { name: /Payroll/ });

      // Parent + child ancestors carry the selected styling…
      expect(payments).toHaveClass('ui-sidebar__item--active');
      expect(transfers).toHaveClass('ui-sidebar__item--active');
      expect(single).toHaveClass('ui-sidebar__item--active');
      // …but a sibling off the active path does not.
      expect(payroll).not.toHaveClass('ui-sidebar__item--active');

      // aria-current marks only the actual active leaf.
      expect(single).toHaveAttribute('aria-current', 'page');
      expect(payments).not.toHaveAttribute('aria-current');
      expect(transfers).not.toHaveAttribute('aria-current');
    });

    it('activating a grandchild leaf fires onActiveChange', async () => {
      const onActiveChange = vi.fn();
      const user = userEvent.setup();
      render(<Sidebar items={nested} defaultActiveValue="single" onActiveChange={onActiveChange} />);

      await user.click(screen.getByRole('button', { name: /Bulk transfer/ }));
      expect(onActiveChange).toHaveBeenCalledWith('bulk');
    });

    it('ArrowRight expands and ArrowLeft collapses the focused group', async () => {
      const user = userEvent.setup();
      render(<Sidebar items={nested} />);

      const payments = screen.getByRole('button', { name: /Payments/ });
      payments.focus();

      await user.keyboard('{ArrowRight}');
      expect(payments).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('button', { name: /Payroll/ })).toBeInTheDocument();

      await user.keyboard('{ArrowLeft}');
      expect(payments).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('button', { name: /Payroll/ })).not.toBeInTheDocument();
    });
  });
});
