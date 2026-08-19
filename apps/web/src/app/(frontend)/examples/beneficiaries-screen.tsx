'use client';

/**
 * Screen 3 — Beneficiary directory.
 *
 * A list view with tabs, bulk selection and pagination, plus the "add
 * beneficiary" flow behind a data-entry Dialog. The dialog is where the form
 * components earn their place — ProgressIndicator, TextField, RadioButton,
 * TextArea and FileUpload in one multi-step flow that ends in a Toast.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Avatar,
  Banner,
  Button,
  Checkbox,
  Dialog,
  FileUpload,
  Label,
  Pagination,
  ProgressIndicator,
  RadioButton,
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
  TextArea,
  TextField,
  Tooltip,
  useIsolatedToastSystem,
  type FileUploadItem,
} from '@brankas/react/desktop';

import { ConsoleCard, ConsoleFrame } from './console-frame';
import {
  BANKS,
  BENEFICIARIES,
  formatDate,
  idr,
  maskedAccount,
  type Beneficiary,
} from './demo-data';

const VERIFICATION_COPY: Record<Beneficiary['verified'], string> = {
  pending: 'Pending review',
  unverified: 'Not verified',
  verified: 'Verified',
};

const VERIFICATION_VARIANT: Record<
  Beneficiary['verified'],
  'positive' | 'warning' | 'neutral'
> = {
  pending: 'warning',
  unverified: 'neutral',
  verified: 'positive',
};

const STEPS = [
  { label: 'Account details' },
  { label: 'Verification' },
  { label: 'Review' },
];

export function BeneficiariesScreen() {
  const { toast, Toaster } = useIsolatedToastSystem();

  const [tab, setTab] = useState('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState<string>('BCA');
  const [accountType, setAccountType] = useState<'business' | 'individual'>('business');
  const [note, setNote] = useState('');
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [bankOpen, setBankOpen] = useState(false);
  const bankRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bankOpen) return;
    const handler = (event: MouseEvent) => {
      if (!bankRef.current?.contains(event.target as Node)) setBankOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [bankOpen]);

  const rows = useMemo(() => {
    if (tab === 'all') return BENEFICIARIES;
    if (tab === 'verified') return BENEFICIARIES.filter((b) => b.verified === 'verified');
    return BENEFICIARIES.filter((b) => b.verified !== 'verified');
  }, [tab]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = rows.slice((safePage - 1) * pageSize, safePage * pageSize);
  const allVisibleChecked = visible.length > 0 && visible.every((b) => selected.has(b.id));

  const pendingCount = BENEFICIARIES.filter((b) => b.verified !== 'verified').length;

  const nameError = step === 1 && name.trim().length > 0 && name.trim().length < 3;

  const resetDialog = () => {
    setStep(1);
    setName('');
    setAccount('');
    setBank('BCA');
    setBankOpen(false);
    setAccountType('business');
    setNote('');
    setFiles([]);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    resetDialog();
  };

  const submit = () => {
    closeDialog();
    toast.success(`${name || 'Beneficiary'} added — verification usually takes 1 business day`, {
      close: true,
      duration: 6000,
      action: { label: 'View', onClick: () => undefined },
    });
  };

  const renderList = () => (
    <>
      {visible.length === 0 ? (
        <div className="demo-empty">
          <p className="demo-empty-title">Nothing here yet</p>
          <p className="demo-empty-body">
            Beneficiaries you add will appear here once their account is confirmed.
          </p>
          <Button size="large" onClick={() => setDialogOpen(true)}>
            Add beneficiary
          </Button>
        </div>
      ) : (
        <>
          <div className="demo-table-scroll">
            <Table size="large">
              <TableHead>
                <TableRow>
                  <TableHeaderCell style={{ width: 44 }}>
                    <Checkbox
                      aria-label="Select all beneficiaries on this page"
                      checked={allVisibleChecked}
                      indeterminate={!allVisibleChecked && visible.some((b) => selected.has(b.id))}
                      onChange={() => {
                        const next = new Set(selected);
                        if (allVisibleChecked) visible.forEach((b) => next.delete(b.id));
                        else visible.forEach((b) => next.add(b.id));
                        setSelected(next);
                      }}
                    />
                  </TableHeaderCell>
                  <TableHeaderCell>Beneficiary</TableHeaderCell>
                  <TableHeaderCell>Destination</TableHeaderCell>
                  <TableHeaderCell>Verification</TableHeaderCell>
                  <TableHeaderCell>Last paid</TableHeaderCell>
                  <TableHeaderCell alignment="right">Total paid</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visible.map((person) => (
                  <TableRow key={person.id} selected={selected.has(person.id)}>
                    <TableCell>
                      <Checkbox
                        aria-label={`Select ${person.name}`}
                        checked={selected.has(person.id)}
                        onChange={() => {
                          const next = new Set(selected);
                          if (next.has(person.id)) next.delete(person.id);
                          else next.add(person.id);
                          setSelected(next);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <span className="demo-person">
                        <Avatar type="initial" initials={person.initials} size="small" />
                        <span>
                          {person.name}
                          <span className="demo-cell-sub">
                            {person.type === 'business' ? 'Business' : 'Individual'}
                          </span>
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="demo-mono">
                        {maskedAccount(person.bank, person.accountNumber)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Label variant={VERIFICATION_VARIANT[person.verified]}>
                        {VERIFICATION_COPY[person.verified]}
                      </Label>
                    </TableCell>
                    <TableCell>
                      {person.lastPaid ? (
                        formatDate(person.lastPaid)
                      ) : (
                        <span className="demo-cell-muted">Never</span>
                      )}
                    </TableCell>
                    <TableCell alignment="right">
                      <span className="demo-mono">{idr(person.totalPaid)}</span>
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
                <Button variant="secondary" size="small">
                  Pay selected
                </Button>
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
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={(value) => {
                setPageSize(value);
                setPage(1);
              }}
            />
          </div>
        </>
      )}
    </>
  );

  return (
    <ConsoleFrame
      activeValue="beneficiaries"
      breadcrumb={[
        { label: 'Disbursements', href: '#' },
        { label: 'Payouts', href: '#' },
        { label: 'Beneficiaries' },
      ]}
      title="Beneficiaries"
      description="Accounts your organisation is allowed to pay."
      actions={
        <div className="demo-inline">
          <Tooltip content="Import up to 500 accounts from a CSV">
            <Button variant="secondary" size="large">
              Import CSV
            </Button>
          </Tooltip>
          <Button size="large" onClick={() => setDialogOpen(true)}>
            Add beneficiary
          </Button>
        </div>
      }
    >
      <Toaster position="top-right" />

      {pendingCount > 0 ? (
        <Banner
          variant="section"
          intent="informational"
          message={`${pendingCount} beneficiaries are waiting on verification. They cannot receive payouts until confirmed.`}
          showIcon
        />
      ) : null}

      <ConsoleCard>
        <Tabs
          aria-label="Beneficiary verification state"
          // Only the active tab gets a panel. All three render the same list
          // from filtered data, and Tabs keeps every panel mounted — passing
          // all three would put three copies of every row checkbox in the DOM.
          items={[
            {
              label: 'All',
              value: 'all',
              badge: BENEFICIARIES.length,
              ...(tab === 'all' ? { panel: renderList() } : {}),
            },
            {
              label: 'Verified',
              value: 'verified',
              badge: BENEFICIARIES.filter((b) => b.verified === 'verified').length,
              ...(tab === 'verified' ? { panel: renderList() } : {}),
            },
            {
              label: 'Needs attention',
              value: 'attention',
              badge: pendingCount,
              ...(tab === 'attention' ? { panel: renderList() } : {}),
            },
          ]}
          value={tab}
          onValueChange={(value) => {
            setTab(value);
            setPage(1);
          }}
        />
      </ConsoleCard>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => (open ? setDialogOpen(true) : closeDialog())}
        type="data-entry"
        size="medium"
        title="Add beneficiary"
        subtitle="Payouts can only be sent to accounts saved here."
        primaryActionLabel={step === STEPS.length ? 'Add beneficiary' : 'Continue'}
        secondaryActionLabel={step === 1 ? 'Cancel' : 'Back'}
        showSecondaryAction
        onPrimaryAction={() => (step === STEPS.length ? submit() : setStep((s) => s + 1))}
        onSecondaryAction={() => (step === 1 ? closeDialog() : setStep((s) => s - 1))}
      >
        <div className="demo-dialog-body">
          <ProgressIndicator
            steps={STEPS}
            currentStep={step}
            onStepClick={(next) => setStep(next)}
          />

          {step === 1 ? (
            <div className="demo-form">
              <TextField
                label="Beneficiary name"
                placeholder="PT Sumber Pangan Jaya"
                value={name}
                onChange={(event) => setName(event.target.value)}
                helperText="Must match the name registered on the bank account."
                {...(nameError ? { errorMessage: 'Enter at least 3 characters.' } : {})}
              />

              <div className="demo-form-row">
                <TextField
                  label="Account number"
                  placeholder="1234567890"
                  inputMode="numeric"
                  value={account}
                  onChange={(event) => setAccount(event.target.value)}
                />
                {/* TextField (8px) beside a Select trigger (8px) — the pair
                    that should match, and does. */}
                <div className="demo-pop-anchor demo-field-select" ref={bankRef}>
                  <SelectButton
                    label="Bank"
                    value={bank}
                    open={bankOpen}
                    onClick={() => setBankOpen((open) => !open)}
                  />
                  {bankOpen ? (
                    <div className="demo-pop">
                      <SelectPanel>
                        {BANKS.map((option) => (
                          <SelectItem
                            key={option}
                            selected={bank === option}
                            onClick={() => {
                              setBank(option);
                              setBankOpen(false);
                            }}
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectPanel>
                    </div>
                  ) : null}
                </div>
              </div>

              <fieldset className="demo-fieldset">
                <legend>Account type</legend>
                <RadioButton
                  name="account-type"
                  label="Business"
                  description="Registered company or CV"
                  checked={accountType === 'business'}
                  onChange={() => setAccountType('business')}
                />
                <RadioButton
                  name="account-type"
                  label="Individual"
                  description="Personal account, requires an ID document"
                  checked={accountType === 'individual'}
                  onChange={() => setAccountType('individual')}
                />
              </fieldset>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="demo-form">
              <FileUpload
                variant="dropzone"
                title="Upload supporting document"
                description="Company deed for businesses, or KTP for individuals. PDF or JPG, max 5MB."
                accept=".pdf,.jpg,.jpeg,.png"
                files={files}
                onChange={(picked) =>
                  setFiles(
                    picked.map((file) => ({
                      name: file.name,
                      meta: `${Math.max(1, Math.round(file.size / 1024))}KB`,
                      status: 'done' as const,
                    })),
                  )
                }
                onRemoveFile={(index) => setFiles((prev) => prev.filter((_, i) => i !== index))}
                helperText="We only use this to confirm account ownership."
              />

              <TextArea
                label="Internal note"
                placeholder="Which team or contract this beneficiary belongs to"
                helperText="Visible to your organisation only."
                counterText={`${note.length}/250`}
                maxLength={250}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="demo-review">
              <Banner
                variant="section"
                intent="informational"
                message="Verification usually completes within one business day. You can save the beneficiary now and pay once it clears."
                showIcon
              />
              <dl className="demo-detail-list">
                <div>
                  <dt>Name</dt>
                  <dd>{name || '—'}</dd>
                </div>
                <div>
                  <dt>Destination</dt>
                  <dd className="demo-mono">
                    {account ? maskedAccount(bank, account.slice(-4)) : `${bank} ••••————`}
                  </dd>
                </div>
                <div>
                  <dt>Type</dt>
                  <dd>{accountType === 'business' ? 'Business' : 'Individual'}</dd>
                </div>
                <div>
                  <dt>Document</dt>
                  <dd>{files[0]?.name ?? 'Not attached'}</dd>
                </div>
                <div>
                  <dt>Note</dt>
                  <dd>{note || '—'}</dd>
                </div>
              </dl>
            </div>
          ) : null}
        </div>
      </Dialog>
    </ConsoleFrame>
  );
}
