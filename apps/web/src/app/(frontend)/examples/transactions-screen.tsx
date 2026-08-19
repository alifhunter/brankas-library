'use client';

/**
 * Screen 2 — Transaction search.
 *
 * This is the screen the engineering review was actually about: a filter row
 * where a Select trigger (8px radius) sits directly beside a pill Reset
 * button, with removable Chips underneath showing what is applied. Everything
 * filters for real so the empty state and the result counts are reachable.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Checkbox,
  Chip,
  DatePicker,
  Label,
  Loader,
  Pagination,
  Search,
  SearchResultPanel,
  SelectButton,
  SelectItem,
  SelectPanel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextField,
  Toggle,
  Tooltip,
  type TableSortDirection,
} from '@brankas/react/desktop';

import { ConsoleCard, ConsoleFrame, ConsoleToolbar } from './console-frame';
import {
  BANKS,
  PAYOUTS,
  STATUS_COPY,
  STATUS_VARIANT,
  formatDate,
  idr,
  type Payout,
  type PayoutStatus,
} from './demo-data';

const STATUSES: PayoutStatus[] = ['settled', 'processing', 'review', 'failed'];
const PAGE_SIZE_OPTIONS = [5, 10, 25];

type SortKey = 'reference' | 'beneficiary' | 'amount';

const LARGE_PAYOUT_FLOOR = '50000000';

type QuickFilterState = {
  maxAmount: string;
  minAmount: string;
  statusFilter: Set<PayoutStatus>;
};

type QuickFilterSetters = QuickFilterState & {
  setMaxAmount: (value: string) => void;
  setMinAmount: (value: string) => void;
  setStatusFilter: (value: Set<PayoutStatus>) => void;
};

/**
 * One-click accelerators, not a second set of controls. Each one writes to a
 * filter that already exists below it and reads its selected state back from
 * that same filter, so a preset and the control it drives can never disagree.
 */
const QUICK_FILTERS: Array<{
  active: (state: QuickFilterState) => boolean;
  id: string;
  label: string;
  toggle: (state: QuickFilterSetters) => void;
}> = [
  {
    active: (s) => s.statusFilter.has('review'),
    id: 'awaiting',
    label: 'Awaiting approval',
    toggle: (s) => s.setStatusFilter(toggleIn(s.statusFilter, 'review')),
  },
  {
    active: (s) => s.statusFilter.has('failed'),
    id: 'failed',
    label: 'Failed',
    toggle: (s) => s.setStatusFilter(toggleIn(s.statusFilter, 'failed')),
  },
  {
    active: (s) => s.minAmount === LARGE_PAYOUT_FLOOR,
    id: 'large',
    label: 'Large payouts',
    toggle: (s) =>
      s.setMinAmount(s.minAmount === LARGE_PAYOUT_FLOOR ? '' : LARGE_PAYOUT_FLOOR),
  },
];

export function TransactionsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Set<PayoutStatus>>(new Set());
  const [bankFilter, setBankFilter] = useState<Set<string>>(new Set());
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  // Orthogonal to the amount range on purpose — an amount filter and a
  // "high value only" switch would have been two controls for one job.
  const [attentionOnly, setAttentionOnly] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('reference');
  const [direction, setDirection] = useState<TableSortDirection>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [busy, setBusy] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [bankQuery, setBankQuery] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const statusRef = useRef<HTMLDivElement>(null);
  const bankRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useCloseOnOutside(statusRef, statusOpen, () => setStatusOpen(false));
  useCloseOnOutside(bankRef, bankOpen, () => setBankOpen(false));
  useCloseOnOutside(dateRef, dateOpen, () => setDateOpen(false));
  useCloseOnOutside(searchRef, searchFocused, () => setSearchFocused(false));

  // Brief spinner whenever the criteria change — a real console round-trips.
  useEffect(() => {
    setBusy(true);
    const timer = setTimeout(() => setBusy(false), 350);
    return () => clearTimeout(timer);
  }, [query, statusFilter, bankFilter, minAmount, maxAmount, attentionOnly, date]);

  const min = Number(minAmount) || 0;
  const max = Number(maxAmount) || 0;
  // Only a complete, inverted range is an error. A half-filled range is just
  // an open-ended bound, which is the common case while someone is typing.
  const rangeError = min > 0 && max > 0 && min > max ? 'Max must be above min.' : undefined;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return PAYOUTS.filter((payout) => {
      if (needle && !matches(payout, needle)) return false;
      if (statusFilter.size > 0 && !statusFilter.has(payout.status)) return false;
      if (bankFilter.size > 0 && !bankFilter.has(payout.bank)) return false;
      if (attentionOnly && payout.status !== 'review' && payout.status !== 'failed') return false;
      if (!rangeError) {
        if (min > 0 && payout.amount < min) return false;
        if (max > 0 && payout.amount > max) return false;
      }
      return true;
    });
  }, [query, statusFilter, bankFilter, attentionOnly, min, max, rangeError]);

  const sorted = useMemo(() => {
    const next = [...filtered];
    next.sort((a, b) => {
      const left = a[sortKey];
      const right = b[sortKey];
      const cmp = left > right ? 1 : left < right ? -1 : 0;
      return direction === 'desc' ? -cmp : cmp;
    });
    return next;
  }, [filtered, sortKey, direction]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const suggestions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return PAYOUTS.filter((payout) => matches(payout, needle))
      .slice(0, 5)
      .map((payout) => ({
        id: payout.id,
        label: payout.reference,
        helper: `${payout.beneficiary} · ${idr(payout.amount)}`,
        onClick: () => {
          setQuery(payout.reference);
          setSearchFocused(false);
        },
      }));
  }, [query]);

  const activeFilterCount =
    statusFilter.size +
    bankFilter.size +
    (attentionOnly ? 1 : 0) +
    (min > 0 ? 1 : 0) +
    (max > 0 ? 1 : 0) +
    (date ? 1 : 0);
  const allVisibleChecked = visible.length > 0 && visible.every((p) => selected.has(p.id));

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setDirection('asc');
    }
  };

  const resetAll = () => {
    setQuery('');
    setStatusFilter(new Set());
    setBankFilter(new Set());
    setMinAmount('');
    setMaxAmount('');
    setAttentionOnly(false);
    setDate(null);
    setSelected(new Set());
    setPage(1);
  };

  return (
    <ConsoleFrame
      activeValue="transactions"
      breadcrumb={[
        { label: 'Disbursements', href: '#' },
        { label: 'Payouts', href: '#' },
        { label: 'Transactions' },
      ]}
      title="Transactions"
      description="Search every payout submitted by your organisation."
      actions={
        <div className="demo-inline">
          <Button variant="secondary" size="large">
            Download CSV
          </Button>
          <Button size="large" onClick={() => router.push('/examples/new-payout')}>
            New payout
          </Button>
        </div>
      }
    >
      <ConsoleCard>
        <ConsoleToolbar>
          <div className="demo-toolbar-search" ref={searchRef}>
            <Search
              placeholder="Search reference, beneficiary, or amount"
              value={query}
              onValueChange={(value) => {
                setQuery(value);
                setSearchFocused(true);
                setPage(1);
              }}
              onFocus={() => setSearchFocused(true)}
              showButton
              buttonLabel="Cari"
              onButtonClick={() => setSearchFocused(false)}
              onClear={() => setQuery('')}
              showShortcutHint={false}
            />
            {searchFocused && query.trim().length > 0 ? (
              <div className="demo-search-pop">
                <SearchResultPanel
                  state={suggestions.length > 0 ? 'result' : 'empty'}
                  items={suggestions}
                  emptyMessage="No payouts match that reference."
                />
              </div>
            ) : null}
          </div>

          {/* The full shape mix, in reading order: pill Chips, 8px Select
              triggers, 8px Text fields, pill Button. Two radii and two label
              positions in one row — the adjacency raised in review, with
              every control that participates in it. */}
          <div className="demo-filter-group">
            <div className="demo-quick-filters" role="group" aria-label="Quick filters">
              {QUICK_FILTERS.map((preset) => (
                <Chip
                  key={preset.id}
                  selected={preset.active({ maxAmount, minAmount, statusFilter })}
                  onClick={() => {
                    preset.toggle({
                      maxAmount,
                      minAmount,
                      setMaxAmount,
                      setMinAmount,
                      setStatusFilter,
                      statusFilter,
                    });
                    setPage(1);
                  }}
                >
                  {preset.label}
                </Chip>
              ))}
            </div>

            <div className="demo-pop-anchor" ref={statusRef}>
              <SelectButton
                label="Status"
                placeholder="Any"
                open={statusOpen}
                onClick={() => setStatusOpen((open) => !open)}
                {...(statusFilter.size > 0
                  ? { badge: statusFilter.size, value: `${statusFilter.size} selected` }
                  : {})}
              />
              {statusOpen ? (
                <div className="demo-pop">
                  <SelectPanel
                    showApplyButton
                    applyLabel="Terapkan"
                    onApply={() => setStatusOpen(false)}
                  >
                    {STATUSES.map((status) => (
                      <SelectItem
                        key={status}
                        selected={statusFilter.has(status)}
                        onClick={() => {
                          setStatusFilter(toggleIn(statusFilter, status));
                          setPage(1);
                        }}
                      >
                        {STATUS_COPY[status]}
                      </SelectItem>
                    ))}
                  </SelectPanel>
                </div>
              ) : null}
            </div>

            <div className="demo-pop-anchor" ref={bankRef}>
              <SelectButton
                label="Bank"
                placeholder="All banks"
                open={bankOpen}
                onClick={() => setBankOpen((open) => !open)}
                {...(bankFilter.size > 0
                  ? { badge: bankFilter.size, value: `${bankFilter.size} selected` }
                  : {})}
              />
              {bankOpen ? (
                <div className="demo-pop">
                  <SelectPanel
                    searchable
                    searchValue={bankQuery}
                    onSearchChange={setBankQuery}
                    searchPlaceholder="Ketik minimal 3 karakter"
                    empty={visibleBanks(bankQuery).length === 0}
                    showApplyButton
                    applyLabel="Terapkan"
                    onApply={() => setBankOpen(false)}
                  >
                    {visibleBanks(bankQuery).map((bank) => (
                      <SelectItem
                        key={bank}
                        selected={bankFilter.has(bank)}
                        onClick={() => {
                          setBankFilter(toggleIn(bankFilter, bank));
                          setPage(1);
                        }}
                      >
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectPanel>
                </div>
              ) : null}
            </div>

            <div className="demo-pop-anchor" ref={dateRef}>
              <SelectButton
                label="Date"
                placeholder="Any date"
                open={dateOpen}
                onClick={() => setDateOpen((open) => !open)}
                {...(date ? { value: formatDate(toIso(date)) } : {})}
              />
              {dateOpen ? (
                <div className="demo-pop">
                  <div className="demo-datepicker-shell">
                    <DatePicker
                      value={date}
                      onChange={setDate}
                      defaultMonth={new Date(2026, 7, 1)}
                      showActions
                      onReset={() => setDate(null)}
                      onCancel={() => setDateOpen(false)}
                      onConfirm={() => setDateOpen(false)}
                      weekStartsOn={1}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Two Text fields (8px, label above) between the Select
                triggers (8px, label inline) and the pill Reset. This is the
                densest shape mix in the console: two rounded rectangles and
                a pill in one row, with pill Chips for the applied filters
                directly beneath. */}
            <div className="demo-amount-range">
              <TextField
                label="Min amount"
                placeholder="0"
                inputMode="numeric"
                value={minAmount}
                onChange={(event) => {
                  setMinAmount(event.target.value.replace(/[^\d]/g, ''));
                  setPage(1);
                }}
                helperTextTop="IDR"
              />
              <TextField
                label="Max amount"
                placeholder="Any"
                inputMode="numeric"
                value={maxAmount}
                onChange={(event) => {
                  setMaxAmount(event.target.value.replace(/[^\d]/g, ''));
                  setPage(1);
                }}
                helperTextTop="IDR"
                {...(rangeError ? { errorMessage: rangeError } : {})}
              />
            </div>

            <Button variant="secondary" size="large" onClick={resetAll}>
              Reset
            </Button>
          </div>
        </ConsoleToolbar>

        <div className="demo-toolbar-secondary">
          <Toggle
            label="Needs attention only"
            description="Payouts that failed or are waiting on approval"
            checked={attentionOnly}
            onChange={(event) => {
              setAttentionOnly(event.target.checked);
              setPage(1);
            }}
          />
          <span className="demo-result-count">
            {busy ? (
              <Loader size={18} label="Filtering" />
            ) : (
              <>
                <strong>{sorted.length}</strong> of {PAYOUTS.length} payouts
              </>
            )}
          </span>
        </div>

        {activeFilterCount > 0 ? (
          <div className="demo-chip-row">
            {[...statusFilter].map((status) => (
              <Chip
                key={`status-${status}`}
                selected
                trailingIcon
                onTrailingIconClick={() => setStatusFilter(toggleIn(statusFilter, status))}
              >
                Status: {STATUS_COPY[status]}
              </Chip>
            ))}
            {[...bankFilter].map((bank) => (
              <Chip
                key={`bank-${bank}`}
                selected
                trailingIcon
                onTrailingIconClick={() => setBankFilter(toggleIn(bankFilter, bank))}
              >
                Bank: {bank}
              </Chip>
            ))}
            {min > 0 ? (
              <Chip selected trailingIcon onTrailingIconClick={() => setMinAmount('')}>
                From {idr(min)}
              </Chip>
            ) : null}
            {max > 0 ? (
              <Chip selected trailingIcon onTrailingIconClick={() => setMaxAmount('')}>
                Up to {idr(max)}
              </Chip>
            ) : null}
            {attentionOnly ? (
              <Chip selected trailingIcon onTrailingIconClick={() => setAttentionOnly(false)}>
                Needs attention
              </Chip>
            ) : null}
            {date ? (
              <Chip selected trailingIcon onTrailingIconClick={() => setDate(null)}>
                {formatDate(toIso(date))}
              </Chip>
            ) : null}
          </div>
        ) : null}

        {visible.length === 0 ? (
          <div className="demo-empty">
            <p className="demo-empty-title">No payouts match these filters</p>
            <p className="demo-empty-body">
              Try widening the date range or clearing the status filter.
            </p>
            <Button variant="secondary" size="large" onClick={resetAll}>
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="demo-table-scroll">
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell style={{ width: 44 }}>
                      <Checkbox
                        aria-label="Select all payouts on this page"
                        checked={allVisibleChecked}
                        indeterminate={!allVisibleChecked && visible.some((p) => selected.has(p.id))}
                        onChange={() => {
                          const next = new Set(selected);
                          if (allVisibleChecked) visible.forEach((p) => next.delete(p.id));
                          else visible.forEach((p) => next.add(p.id));
                          setSelected(next);
                        }}
                      />
                    </TableHeaderCell>
                    <TableHeaderCell
                      sortable
                      sortDirection={sortKey === 'reference' ? direction : null}
                      onSort={() => handleSort('reference')}
                    >
                      Reference
                    </TableHeaderCell>
                    <TableHeaderCell
                      sortable
                      sortDirection={sortKey === 'beneficiary' ? direction : null}
                      onSort={() => handleSort('beneficiary')}
                    >
                      Beneficiary
                    </TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell
                      alignment="right"
                      sortable
                      sortDirection={sortKey === 'amount' ? direction : null}
                      onSort={() => handleSort('amount')}
                    >
                      Amount
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visible.map((payout) => (
                    <TableRow key={payout.id} selected={selected.has(payout.id)}>
                      <TableCell>
                        <Checkbox
                          aria-label={`Select ${payout.reference}`}
                          checked={selected.has(payout.id)}
                          onChange={() => setSelected(toggleIn(selected, payout.id))}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="demo-mono demo-ref">{payout.reference}</span>
                        <span className="demo-cell-sub">{formatDate(payout.date)}</span>
                      </TableCell>
                      <TableCell>
                        {payout.beneficiary}
                        <span className="demo-cell-sub">
                          {payout.bank} · {payout.method}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Label variant={STATUS_VARIANT[payout.status]}>
                          {STATUS_COPY[payout.status]}
                        </Label>
                      </TableCell>
                      <TableCell alignment="right">
                        <Tooltip content={`${payout.method} · ${payout.bank}`}>
                          <span className="demo-mono">{idr(payout.amount)}</span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="demo-pagination-row">
              {selected.size > 0 ? (
                <span className="demo-selection-note">
                  <strong>{selected.size}</strong> selected
                  <Button variant="tertiary" size="small" onClick={() => setSelected(new Set())}>
                    Clear
                  </Button>
                </span>
              ) : (
                <span />
              )}
              <Pagination
                count={pageCount}
                page={safePage}
                onPageChange={setPage}
                rowsPerPage={pageSize}
                rowsPerPageOptions={PAGE_SIZE_OPTIONS}
                onRowsPerPageChange={(value) => {
                  setPageSize(value);
                  setPage(1);
                }}
              />
            </div>
          </>
        )}
      </ConsoleCard>
    </ConsoleFrame>
  );
}

function matches(payout: Payout, needle: string): boolean {
  return (
    payout.reference.toLowerCase().includes(needle) ||
    payout.beneficiary.toLowerCase().includes(needle) ||
    payout.bank.toLowerCase().includes(needle) ||
    String(payout.amount).includes(needle)
  );
}

function visibleBanks(query: string): string[] {
  const needle = query.trim().toLowerCase();
  return BANKS.filter((bank) => bank.toLowerCase().includes(needle));
}

function toggleIn<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function toIso(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function useCloseOnOutside(
  ref: React.RefObject<HTMLDivElement | null>,
  open: boolean,
  close: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  });
}
