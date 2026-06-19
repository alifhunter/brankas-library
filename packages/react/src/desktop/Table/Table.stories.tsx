import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../Checkbox/Checkbox';
import { StatusLabel } from '../Label/StatusLabel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './Table';
import type { TableSortDirection } from './Table.types';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=282-58763';

const meta = {
  title: 'Desktop UI/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    size: 'medium',
    sticky: false,
    zebra: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Compositional table primitives that render as semantic `<table>` markup. Compose `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell`. Supports sortable headers, selected rows, sticky header, and zebra striping.',
      },
    },
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_ROWS = [
  { id: 'TRX-001', customer: 'PT Brankas Demo', status: 'Paid', amount: 24_000_000 },
  { id: 'TRX-002', customer: 'PT Sinarmas', status: 'Pending', amount: 18_500_000 },
  { id: 'TRX-003', customer: 'PT Mandiri', status: 'Failed', amount: 9_300_000 },
  { id: 'TRX-004', customer: 'PT Permata', status: 'Paid', amount: 41_200_000 },
];

const idr = (n: number) => `IDR ${n.toLocaleString('id-ID')}`;

const statusTone: Record<string, 'positive' | 'warning' | 'negative'> = {
  Paid: 'positive',
  Pending: 'warning',
  Failed: 'negative',
};

const renderSampleTable: NonNullable<Story['render']> = (args) => (
  <Table {...args}>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Reference</TableHeaderCell>
        <TableHeaderCell>Customer</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell alignment="right">Amount</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {SAMPLE_ROWS.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.customer}</TableCell>
          <TableCell>
            <StatusLabel
              tone={
                statusTone[row.status] === 'positive'
                  ? 'success'
                  : statusTone[row.status] === 'warning'
                    ? 'warning'
                    : 'error'
              }
            >
              {row.status}
            </StatusLabel>
          </TableCell>
          <TableCell alignment="right">{idr(row.amount)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const Default: Story = {
  render: renderSampleTable,
};

export const Small: Story = {
  args: { size: 'small' },
  render: renderSampleTable,
};

export const Large: Story = {
  args: { size: 'large' },
  render: renderSampleTable,
};

export const Zebra: Story = {
  args: { zebra: true },
  render: renderSampleTable,
};

/* ---------- Pattern: sortable headers ---------- */

type SortKey = 'id' | 'customer' | 'amount';

function SortablePattern() {
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [direction, setDirection] = useState<TableSortDirection>('asc');

  const sortedRows = useMemo(() => {
    const next = [...SAMPLE_ROWS];
    next.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return direction === 'desc' ? -cmp : cmp;
    });
    return next;
  }, [sortKey, direction]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setDirection('asc');
    }
  };

  const sortFor = (key: SortKey): TableSortDirection => (sortKey === key ? direction : null);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell sortable sortDirection={sortFor('id')} onSort={() => handleSort('id')}>
            Reference
          </TableHeaderCell>
          <TableHeaderCell
            sortable
            sortDirection={sortFor('customer')}
            onSort={() => handleSort('customer')}
          >
            Customer
          </TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell
            alignment="right"
            sortable
            sortDirection={sortFor('amount')}
            onSort={() => handleSort('amount')}
          >
            Amount
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedRows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.customer}</TableCell>
            <TableCell>
              <StatusLabel
                tone={
                  statusTone[row.status] === 'positive'
                    ? 'success'
                    : statusTone[row.status] === 'warning'
                      ? 'warning'
                      : 'error'
                }
              >
                {row.status}
              </StatusLabel>
            </TableCell>
            <TableCell alignment="right">{idr(row.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const SortableHeaders: Story = {
  name: 'Pattern · Sortable headers',
  render: () => <SortablePattern />,
  parameters: { controls: { disable: true } },
};

/* ---------- Pattern: selectable rows ---------- */

function SelectableRowsPattern() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allChecked = selected.size === SAMPLE_ROWS.length;
  const someChecked = selected.size > 0 && !allChecked;

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allChecked) setSelected(new Set());
    else setSelected(new Set(SAMPLE_ROWS.map((r) => r.id)));
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <output style={{ fontFamily: 'monospace', fontSize: 13 }}>
        Selected: {selected.size === 0 ? '—' : Array.from(selected).join(', ')}
      </output>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell style={{ width: 40 }}>
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked}
                onChange={toggleAll}
                aria-label="Select all rows"
              />
            </TableHeaderCell>
            <TableHeaderCell>Reference</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell alignment="right">Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {SAMPLE_ROWS.map((row) => (
            <TableRow key={row.id} selected={selected.has(row.id)}>
              <TableCell>
                <Checkbox
                  checked={selected.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                  aria-label={`Select ${row.id}`}
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell alignment="right">{idr(row.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const SelectableRows: Story = {
  name: 'Pattern · Selectable rows',
  render: () => <SelectableRowsPattern />,
  parameters: { controls: { disable: true } },
};

/* ---------- Pattern: sticky header ---------- */

const LONG_ROWS = Array.from({ length: 25 }, (_, i) => ({
  id: `TRX-${String(i + 1).padStart(3, '0')}`,
  customer: `Customer ${i + 1}`,
  status: i % 3 === 0 ? 'Paid' : i % 3 === 1 ? 'Pending' : 'Failed',
  amount: Math.round(5_000_000 + Math.random() * 50_000_000),
}));

export const StickyHeader: Story = {
  name: 'Pattern · Sticky header',
  render: () => (
    <div
      style={{
        height: 320,
        overflow: 'auto',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 8,
      }}
    >
      <Table sticky>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Reference</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell alignment="right">Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {LONG_ROWS.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>
                <StatusLabel
                  tone={
                    statusTone[row.status] === 'positive'
                      ? 'success'
                      : statusTone[row.status] === 'warning'
                        ? 'warning'
                        : 'error'
                  }
                >
                  {row.status}
                </StatusLabel>
              </TableCell>
              <TableCell alignment="right">{idr(row.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ---------- Just the cell atom showcase (matches Figma frame literally) ---------- */

export const CellAtomGrid: Story = {
  name: 'Cell · Atom grid',
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Table key={size} size={size}>
          <TableHead>
            <TableRow>
              <TableHeaderCell style={{ width: 200 }}>Left</TableHeaderCell>
              <TableHeaderCell style={{ width: 200 }} alignment="center">
                Center
              </TableHeaderCell>
              <TableHeaderCell style={{ width: 200 }} alignment="right">
                Right
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Text row</TableCell>
              <TableCell alignment="center">Text row</TableCell>
              <TableCell alignment="right">Text row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
