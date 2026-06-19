import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './Table';

describe('Table primitives', () => {
  it('renders semantic table structure', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell alignment="right">Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>PT Brankas</TableCell>
            <TableCell alignment="right">IDR 24,000,000</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(2);
  });

  it('propagates size from Table down to cells via context', () => {
    const { container } = render(
      <Table size="large">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector('.ui-table__cell')).toHaveClass('ui-table__cell--size-large');
  });

  it('marks selected row with aria-selected and selected class', () => {
    render(
      <Table>
        <TableBody>
          <TableRow selected>
            <TableCell>One</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const row = screen.getByRole('row');
    expect(row).toHaveAttribute('aria-selected', 'true');
    expect(row).toHaveClass('ui-table__row--selected');
  });

  it('sortable header fires onSort and exposes aria-sort', async () => {
    const onSort = vi.fn();
    const user = userEvent.setup();
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell sortable sortDirection="asc" onSort={onSort}>
              Name
            </TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>,
    );

    const header = screen.getByRole('columnheader');
    expect(header).toHaveAttribute('aria-sort', 'ascending');

    const trigger = within(header).getByRole('button');
    await user.click(trigger);
    expect(onSort).toHaveBeenCalledTimes(1);
  });

  it('aria-sort=none when sortable but inactive', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell sortable sortDirection={null}>
              Name
            </TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>,
    );
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'none');
  });

  it('applies sticky class to thead when Table sticky=true', () => {
    const { container } = render(
      <Table sticky>
        <TableHead>
          <TableRow>
            <TableHeaderCell>H</TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>,
    );
    expect(container.querySelector('.ui-table__head')).toHaveClass('ui-table__head--sticky');
  });
});
