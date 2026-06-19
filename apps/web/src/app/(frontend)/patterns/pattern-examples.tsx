'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  ProgressIndicator,
  Search,
  SearchResultPanel,
  SelectButton,
  SelectItem,
  SelectPanel,
  Skeleton,
  StatusLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Toast,
  type SearchResultPanelState,
  type TableSortDirection,
  useIsolatedToastSystem,
} from '@brankas/react/desktop';

/* ---------- 1. Multi-step flow ---------- */

export function MultiStepFlowRecipe() {
  const steps = [
    { label: 'Account info' },
    { label: 'Identity check' },
    { label: 'Review & submit' },
  ];
  const [step, setStep] = useState(1);

  return (
    <div className="pattern-recipe-body">
      <ProgressIndicator steps={steps} currentStep={step} onStepClick={setStep} />
      <div className="pattern-recipe-canvas">
        Page {step} of {steps.length} · {steps[step - 1]?.label}
      </div>
      <div className="pattern-recipe-actions">
        <Button
          variant="secondary"
          size="large"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          size="large"
          onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
          disabled={step === steps.length}
        >
          {step === steps.length ? 'Submit' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}

/* ---------- 2. Undo toast ---------- */

export function UndoToastRecipe() {
  const { toast, Toaster } = useIsolatedToastSystem();

  return (
    <div className="pattern-recipe-body">
      <Toaster position="top-right" />
      <Button
        variant="danger-primary"
        onClick={() =>
          toast('Item moved to trash', {
            close: true,
            duration: 6000,
            action: {
              label: 'Undo',
              onClick: () => toast.success('Restored', { duration: 2500 }),
            },
          })
        }
      >
        Delete item
      </Button>
      <p className="pattern-recipe-hint">
        Click delete → toast slides in with an Undo action; click Undo within 6s to restore.
      </p>
    </div>
  );
}

/* ---------- 3. Searchable multi-select ---------- */

const COUNTRIES = [
  'Indonesia',
  'Singapore',
  'Malaysia',
  'Philippines',
  'Thailand',
  'Vietnam',
  'Cambodia',
  'Laos',
];

export function SearchableMultiSelectRecipe() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState<Set<string>>(new Set());
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const filtered = useMemo(
    () => COUNTRIES.filter((c) => c.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggle = (c: string) =>
    setDraft((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });

  const handleOpen = () => {
    setDraft(new Set(applied));
    setQuery('');
    setOpen(true);
  };

  return (
    <div className="pattern-recipe-body">
      <div ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
        <SelectButton
          label="Country"
          value={applied.size === 0 ? undefined : `${applied.size} selected`}
          placeholder="All countries"
          {...(applied.size > 0 ? { badge: applied.size } : {})}
          open={open}
          onClick={() => (open ? setOpen(false) : handleOpen())}
        />
        {open ? (
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 10 }}>
            <SelectPanel
              searchable
              searchValue={query}
              onSearchChange={setQuery}
              showApplyButton
              applyLabel="Apply"
              empty={filtered.length === 0}
              onApply={() => {
                setApplied(new Set(draft));
                setOpen(false);
              }}
            >
              {filtered.map((c) => (
                <SelectItem key={c} selected={draft.has(c)} onClick={() => toggle(c)}>
                  {c}
                </SelectItem>
              ))}
            </SelectPanel>
          </div>
        ) : null}
      </div>
      <p className="pattern-recipe-hint">
        Open the menu, search/check countries, then Apply to commit. The badge on the trigger shows
        the applied count.
      </p>
    </div>
  );
}

/* ---------- 4. Sortable + selectable table ---------- */

type TableRowData = {
  id: string;
  customer: string;
  status: 'Paid' | 'Pending' | 'Failed';
  amount: number;
};

const TABLE_ROWS: TableRowData[] = [
  { id: 'TRX-001', customer: 'PT Brankas Demo', status: 'Paid', amount: 24_000_000 },
  { id: 'TRX-002', customer: 'PT Sinarmas', status: 'Pending', amount: 18_500_000 },
  { id: 'TRX-003', customer: 'PT Mandiri', status: 'Failed', amount: 9_300_000 },
  { id: 'TRX-004', customer: 'PT Permata', status: 'Paid', amount: 41_200_000 },
];

const idr = (n: number) => `IDR ${n.toLocaleString('id-ID')}`;
const tone: Record<TableRowData['status'], 'success' | 'warning' | 'error'> = {
  Paid: 'success',
  Pending: 'warning',
  Failed: 'error',
};

export function SortableTableRecipe() {
  const [sortKey, setSortKey] = useState<keyof TableRowData>('id');
  const [direction, setDirection] = useState<TableSortDirection>('asc');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sortedRows = useMemo(() => {
    const next = [...TABLE_ROWS];
    next.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return direction === 'desc' ? -cmp : cmp;
    });
    return next;
  }, [sortKey, direction]);

  const handleSort = (key: keyof TableRowData) => {
    if (sortKey === key) {
      setDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setDirection('asc');
    }
  };

  const sortFor = (key: keyof TableRowData): TableSortDirection =>
    sortKey === key ? direction : null;

  const allChecked = selected.size === TABLE_ROWS.length;
  const someChecked = selected.size > 0 && !allChecked;

  return (
    <div className="pattern-recipe-body">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell style={{ width: 40 }}>
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked}
                onChange={() =>
                  setSelected(allChecked ? new Set() : new Set(TABLE_ROWS.map((r) => r.id)))
                }
                aria-label="Select all rows"
              />
            </TableHeaderCell>
            <TableHeaderCell
              sortable
              sortDirection={sortFor('id')}
              onSort={() => handleSort('id')}
            >
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
            <TableRow key={row.id} selected={selected.has(row.id)}>
              <TableCell>
                <Checkbox
                  checked={selected.has(row.id)}
                  onChange={() =>
                    setSelected((prev) => {
                      const next = new Set(prev);
                      if (next.has(row.id)) next.delete(row.id);
                      else next.add(row.id);
                      return next;
                    })
                  }
                  aria-label={`Select ${row.id}`}
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>
                <StatusLabel tone={tone[row.status]}>{row.status}</StatusLabel>
              </TableCell>
              <TableCell alignment="right">{idr(row.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="pattern-recipe-hint">
        Click column headers to sort, check the select-all box to select all rows, or click
        individual checkboxes for bulk-action selection.
      </p>
    </div>
  );
}

/* ---------- 5. Live search results ---------- */

const PEOPLE = [
  { id: '1', label: 'John Legend', helper: '001234' },
  { id: '2', label: 'Johnny Cash', helper: '001235' },
  { id: '3', label: 'John Doe', helper: '001236' },
  { id: '4', label: 'Jane Doe', helper: '001237' },
  { id: '5', label: 'Maria Garcia', helper: '001238' },
];

export function LiveSearchRecipe() {
  const [value, setValue] = useState('');
  const [state, setState] = useState<SearchResultPanelState>('default');
  const [results, setResults] = useState<typeof PEOPLE>([]);

  const handleChange = (next: string) => {
    setValue(next);
    if (next.length === 0) {
      setState('default');
      setResults([]);
      return;
    }
    if (next.length < 3) {
      setState('default');
      return;
    }
    setState('loading');
    window.setTimeout(() => {
      const matching = PEOPLE.filter((p) =>
        p.label.toLowerCase().includes(next.toLowerCase()),
      );
      setResults(matching);
      setState(matching.length > 0 ? 'result' : 'empty');
    }, 400);
  };

  return (
    <div className="pattern-recipe-body">
      <Search value={value} onValueChange={handleChange} />
      <SearchResultPanel
        state={state}
        items={results.map((r) => ({ ...r, onClick: () => setValue(r.label) }))}
      />
      <p className="pattern-recipe-hint">
        Type 3+ chars to trigger the loading skeleton, then results or empty state appear.
      </p>
    </div>
  );
}

/* ---------- 6. Card skeleton placeholder ---------- */

export function CardSkeletonRecipe() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setLoading((v) => !v), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pattern-recipe-body">
      <div className="pattern-card-mock">
        {loading ? (
          <>
            <Skeleton shape="circle" width={40} />
            <div className="pattern-card-mock__lines">
              <Skeleton width="60%" height={14} />
              <Skeleton width="40%" height={12} />
            </div>
          </>
        ) : (
          <>
            <span className="pattern-avatar">JL</span>
            <div className="pattern-card-mock__lines">
              <strong>John Legend</strong>
              <span>Member since 2024</span>
            </div>
          </>
        )}
      </div>
      <p className="pattern-recipe-hint">
        Compose Skeleton shapes to mirror the final card. The mock toggles every 2.2s.
      </p>
    </div>
  );
}
