'use client';

/**
 * Screen 6 — Approvals queue.
 *
 * Built to put six controls that are easy to confuse on one screen, in a
 * hierarchy where each one earns its place:
 *
 *   Tabs (default)  which queue you are in         — Pending / Approved / Rejected
 *   Tabs (chips)    which slice of that queue      — All / Instant / SKN / RTGS
 *   Chip            which risk flags to narrow by  — multi-select, additive
 *   Text field      free-text reference filter
 *   Select          filter by who requested it
 *   Button+Dropdown bulk actions on the selection
 *
 * The pairing worth reviewing is Tabs-as-chips against selection Chips. At
 * rest they are nearly the same object — same 8px/16px padding, same pill
 * radius, borders differing only by #ebebeb vs #e0e6ed. They diverge only
 * once active: a chip tab fills with the navy gradient, a selected Chip goes
 * light blue. One is single-select navigation, the other is a multi-select
 * filter, and the screen only reads correctly if you can tell them apart at
 * a glance.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  Label,
  SelectButton,
  SelectItem,
  SelectPanel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  useIsolatedToastSystem,
} from '@brankas/react/desktop';

import { ConsoleCard, ConsoleFrame } from './console-frame';
import {
  APPROVALS,
  APPROVAL_FLAG_COPY,
  REQUESTERS,
  formatDate,
  idr,
  maskedAccount,
  type ApprovalFlag,
  type ApprovalRequest,
  type ApprovalState,
} from './demo-data';

const METHOD_SLICES = ['all', 'Instant', 'SKN', 'RTGS'] as const;
const FLAGS: ApprovalFlag[] = ['high-value', 'unverified', 'expiring'];

const STATE_LABEL: Record<ApprovalState, string> = {
  approved: 'Approved',
  pending: 'Pending',
  rejected: 'Rejected',
};

const STATE_VARIANT: Record<ApprovalState, 'warning' | 'positive' | 'negative'> = {
  approved: 'positive',
  pending: 'warning',
  rejected: 'negative',
};

export function ApprovalsScreen() {
  const { toast, Toaster } = useIsolatedToastSystem();

  // Tabs (default): which queue. Single-select navigation.
  const [queue, setQueue] = useState<ApprovalState>('pending');
  // Tabs (chips): which slice of that queue. Also single-select.
  const [slice, setSlice] = useState<(typeof METHOD_SLICES)[number]>('all');
  // Chips: which risk flags. Multi-select, additive — a different job.
  const [flags, setFlags] = useState<Set<ApprovalFlag>>(new Set());

  const [reference, setReference] = useState('');
  const [requester, setRequester] = useState<string | null>(null);
  const [requesterOpen, setRequesterOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const requesterRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  useClickOutside(requesterRef, requesterOpen, () => setRequesterOpen(false));
  useClickOutside(actionsRef, actionsOpen, () => setActionsOpen(false));

  const inQueue = useMemo(() => APPROVALS.filter((r) => r.state === queue), [queue]);

  const rows = useMemo(() => {
    const needle = reference.trim().toLowerCase();
    return inQueue.filter((request) => {
      if (slice !== 'all' && request.method !== slice) return false;
      if (needle && !request.reference.toLowerCase().includes(needle)) return false;
      if (requester && request.requestedBy !== requester) return false;
      // Additive: a request matches if it carries every selected flag.
      for (const flag of flags) {
        if (!request.flags.includes(flag)) return false;
      }
      return true;
    });
  }, [inQueue, slice, reference, requester, flags]);

  // Selection belongs to a queue — carrying it across tabs would let a bulk
  // action fire against rows the user can no longer see.
  useEffect(() => {
    setSelected(new Set());
  }, [queue]);

  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const someChecked = rows.some((r) => selected.has(r.id)) && !allChecked;

  const countFor = (state: ApprovalState) => APPROVALS.filter((r) => r.state === state).length;
  const countForSlice = (value: (typeof METHOD_SLICES)[number]) =>
    value === 'all' ? inQueue.length : inQueue.filter((r) => r.method === value).length;

  const toggleFlag = (flag: ApprovalFlag) => {
    const next = new Set(flags);
    if (next.has(flag)) next.delete(flag);
    else next.add(flag);
    setFlags(next);
  };

  const runBulk = (label: string) => {
    setActionsOpen(false);
    const count = selected.size;
    setSelected(new Set());
    toast.success(`${label} — ${count} ${count === 1 ? 'payout' : 'payouts'}`, {
      close: true,
      duration: 5000,
    });
  };

  const list = (
    // Tabs panels have no layout of their own, so the sections inside one
    // stack flush unless the panel content supplies its own rhythm.
    <div className="demo-approval-body">
      {/* Row 2: the six-control bar. Chip tabs sit directly above the
          selection chips on purpose — that adjacency is the thing to judge. */}
      <div>
        <Tabs
          aria-label="Payout method"
          type="chips"
          value={slice}
          onValueChange={(value) => setSlice(value as (typeof METHOD_SLICES)[number])}
          items={METHOD_SLICES.map((value) => ({
            badge: countForSlice(value),
            label: value === 'all' ? 'All methods' : value,
            value,
          }))}
        />
      </div>

      <div className="demo-approval-bar">
        <div className="demo-approval-filters">
          <TextField
            label="Reference"
            placeholder="DIS-2026…"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
          />

          <div className="demo-pop-anchor" ref={requesterRef}>
            <SelectButton
              label="Requested by"
              placeholder="Anyone"
              open={requesterOpen}
              onClick={() => setRequesterOpen((open) => !open)}
              {...(requester ? { value: requester } : {})}
            />
            {requesterOpen ? (
              <div className="demo-pop">
                <SelectPanel width={240}>
                  <SelectItem
                    selected={requester === null}
                    onClick={() => {
                      setRequester(null);
                      setRequesterOpen(false);
                    }}
                  >
                    Anyone
                  </SelectItem>
                  {REQUESTERS.map((person) => (
                    <SelectItem
                      key={person}
                      selected={requester === person}
                      onClick={() => {
                        setRequester(person);
                        setRequesterOpen(false);
                      }}
                    >
                      {person}
                    </SelectItem>
                  ))}
                </SelectPanel>
              </div>
            ) : null}
          </div>
        </div>

        {/* Button that opens a Dropdown — an action menu, not a filter.
            Disabled until there is a selection to act on. */}
        <div className="demo-pop-anchor demo-bulk-anchor" ref={actionsRef}>
          <Button
            variant="secondary"
            size="large"
            disabled={selected.size === 0}
            onClick={() => setActionsOpen((open) => !open)}
            aria-expanded={actionsOpen}
            aria-haspopup="menu"
            trailingIcon={<span aria-hidden="true">▾</span>}
          >
            Bulk actions{selected.size > 0 ? ` (${selected.size})` : ''}
          </Button>
          {actionsOpen ? (
            <div className="demo-pop demo-pop--right">
              <Dropdown width={220}>
                <DropdownItem onClick={() => runBulk('Approved')}>Approve selected</DropdownItem>
                <DropdownItem onClick={() => runBulk('Reassigned')}>
                  Reassign to another approver
                </DropdownItem>
                <DropdownItem onClick={() => runBulk('Exported')}>Export selected</DropdownItem>
                <DropdownItem variant="danger" onClick={() => runBulk('Rejected')}>
                  Reject selected
                </DropdownItem>
              </Dropdown>
            </div>
          ) : null}
        </div>
      </div>

      {/* Chips: multi-select risk filters. Same shape as the chip tabs above,
          different job — these stack rather than replace one another. */}
      <div className="demo-flag-row">
        <span className="demo-flag-label">Narrow by risk</span>
        {FLAGS.map((flag) => (
          <Chip key={flag} selected={flags.has(flag)} onClick={() => toggleFlag(flag)}>
            {APPROVAL_FLAG_COPY[flag]}
          </Chip>
        ))}
        {flags.size > 0 ? (
          <Button variant="tertiary" size="small" onClick={() => setFlags(new Set())}>
            Clear
          </Button>
        ) : null}
      </div>

      {rows.length === 0 ? (
        <div className="demo-empty">
          <p className="demo-empty-title">Nothing in this queue matches</p>
          <p className="demo-empty-body">
            Clear a risk filter or switch method to see more requests.
          </p>
        </div>
      ) : (
        <div className="demo-table-scroll">
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableHeaderCell style={{ width: 44 }}>
                  <Checkbox
                    aria-label="Select all visible requests"
                    checked={allChecked}
                    indeterminate={someChecked}
                    onChange={() => {
                      const next = new Set(selected);
                      if (allChecked) rows.forEach((r) => next.delete(r.id));
                      else rows.forEach((r) => next.add(r.id));
                      setSelected(next);
                    }}
                  />
                </TableHeaderCell>
                <TableHeaderCell>Reference</TableHeaderCell>
                <TableHeaderCell>Beneficiary</TableHeaderCell>
                <TableHeaderCell>Requested by</TableHeaderCell>
                <TableHeaderCell>Flags</TableHeaderCell>
                <TableHeaderCell alignment="right">Amount</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((request: ApprovalRequest) => (
                <TableRow key={request.id} selected={selected.has(request.id)}>
                  <TableCell>
                    <Checkbox
                      aria-label={`Select ${request.reference}`}
                      checked={selected.has(request.id)}
                      onChange={() => {
                        const next = new Set(selected);
                        if (next.has(request.id)) next.delete(request.id);
                        else next.add(request.id);
                        setSelected(next);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="demo-mono demo-ref">{request.reference}</span>
                    <span className="demo-cell-sub">
                      {request.method} · {formatDate(request.requestedAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {request.beneficiary}
                    <span className="demo-mono demo-cell-sub">
                      {maskedAccount(request.bank, '0000'.slice(0, 4))}
                    </span>
                  </TableCell>
                  <TableCell>{request.requestedBy}</TableCell>
                  <TableCell>
                    {request.flags.length === 0 ? (
                      <span className="demo-cell-muted">—</span>
                    ) : (
                      <span className="demo-flag-cell">
                        {request.flags.map((flag) => (
                          <Label
                            key={flag}
                            variant={flag === 'unverified' ? 'negative' : 'warning'}
                          >
                            {APPROVAL_FLAG_COPY[flag]}
                          </Label>
                        ))}
                      </span>
                    )}
                  </TableCell>
                  <TableCell alignment="right">
                    <Tooltip content={`${request.method} · ${request.bank}`}>
                      <span className="demo-mono">{idr(request.amount)}</span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );

  return (
    <ConsoleFrame
      activeValue="approvals"
      breadcrumb={[
        { label: 'Disbursements', href: '#' },
        { label: 'Payouts', href: '#' },
        { label: 'Approvals' },
      ]}
      title="Approvals"
      description="Payouts waiting on a decision before funds move."
      actions={
        <div className="demo-inline">
          <Label variant={STATE_VARIANT.pending}>{countFor('pending')} pending</Label>
        </div>
      }
    >
      <Toaster position="top-right" />

      <ConsoleCard>
        {/* Row 1: default Tabs — primary navigation between queues. */}
        <Tabs
          aria-label="Approval queue"
          value={queue}
          onValueChange={(value) => setQueue(value as ApprovalState)}
          items={(['pending', 'approved', 'rejected'] as ApprovalState[]).map((state) => ({
            badge: countFor(state),
            label: STATE_LABEL[state],
            panel: queue === state ? list : undefined,
            value: state,
          }))}
        />
      </ConsoleCard>
    </ConsoleFrame>
  );
}

function useClickOutside(
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
