import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Dropdown } from './Dropdown';
import { DropdownItem } from './DropdownItem';

describe('Dropdown', () => {
  it('renders items as menuitems and fires onClick', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Dropdown>
        <DropdownItem onClick={onClick}>First</DropdownItem>
        <DropdownItem>Second</DropdownItem>
      </Dropdown>,
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);

    await user.click(screen.getByRole('menuitem', { name: 'First' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when item is disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Dropdown>
        <DropdownItem disabled onClick={onClick}>
          Locked
        </DropdownItem>
      </Dropdown>,
    );

    const item = screen.getByRole('menuitem', { name: 'Locked' });
    expect(item).toHaveAttribute('aria-disabled', 'true');

    await user.click(item);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies danger variant class', () => {
    render(
      <Dropdown>
        <DropdownItem variant="danger">Delete</DropdownItem>
      </Dropdown>,
    );
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveClass(
      'ui-dropdown__item--danger',
    );
  });

  it('fires onClick on Enter/Space keyboard activation', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Dropdown>
        <DropdownItem onClick={onClick}>Pick me</DropdownItem>
      </Dropdown>,
    );

    const item = screen.getByRole('menuitem', { name: 'Pick me' });
    item.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);

    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
