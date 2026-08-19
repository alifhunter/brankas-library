'use client';

/**
 * Screen 4 — New payout (stepper flow).
 *
 * The multi-step form the "New payout" button has been promising since the
 * overview screen. ProgressIndicator drives four steps with a running summary
 * beside them, real per-step validation that blocks Continue, a discard
 * confirmation, and a terminal success state.
 *
 * Field widths are the layout's job now, so the form column caps itself at
 * `--size-field-max` rather than relying on a component to stop growing.
 */

import { useMemo, useRef, useState, useEffect } from 'react';
import {
  Banner,
  Button,
  Checkbox,
  DatePicker,
  Dialog,
  Label,
  ProgressIndicator,
  RadioButton,
  Search,
  SearchResultPanel,
  SelectButton,
  SelectItem,
  SelectPanel,
  TextArea,
  TextField,
  Toggle,
  Tooltip,
  useIsolatedToastSystem,
} from '@brankas/react/desktop';

import { ConsoleCard, ConsoleFrame } from './console-frame';
import {
  BENEFICIARIES,
  formatDate,
  idr,
  maskedAccount,
  type Beneficiary,
} from './demo-data';

const STEPS = [
  { label: 'Amount' },
  { label: 'Beneficiary' },
  { label: 'Schedule' },
  { label: 'Review' },
];

const SOURCE_ACCOUNTS = [
  { balance: 812_400_000, id: 'op', label: 'Operational · BSIM ••••8801' },
  { balance: 219_050_000, id: 'payroll', label: 'Payroll · BSIM ••••4417' },
  { balance: 43_900_000, id: 'escrow', label: 'Escrow · BSIM ••••9930' },
];

const METHODS = [
  { description: 'Arrives in seconds. Up to IDR 100,000,000.', id: 'Instant', label: 'Instant' },
  { description: 'Same business day. No upper limit.', id: 'SKN', label: 'SKN' },
  { description: 'High value, settles within 2 hours.', id: 'RTGS', label: 'RTGS' },
] as const;

type Method = (typeof METHODS)[number]['id'];

export function NewPayoutScreen() {
  const { toast, Toaster } = useIsolatedToastSystem();

  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  // Step 1
  const [sourceId, setSourceId] = useState('op');
  const [sourceOpen, setSourceOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<Method>('Instant');

  // Step 2
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [payee, setPayee] = useState<Beneficiary | null>(null);

  // Step 3
  const [scheduled, setScheduled] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [notify, setNotify] = useState(true);
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const sourceRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useClickOutside(sourceRef, sourceOpen, () => setSourceOpen(false));
  useClickOutside(searchRef, searchOpen, () => setSearchOpen(false));
  useClickOutside(dateRef, dateOpen, () => setDateOpen(false));

  const source = SOURCE_ACCOUNTS.find((a) => a.id === sourceId) ?? SOURCE_ACCOUNTS[0]!;
  const amountValue = Number(amount.replace(/[^\d]/g, '')) || 0;

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return BENEFICIARIES.filter(
      (b) => b.name.toLowerCase().includes(needle) || b.bank.toLowerCase().includes(needle),
    ).slice(0, 5);
  }, [query]);

  // Validation is per step so Continue can block, and errors only appear
  // after the user tries to advance rather than while they are still typing.
  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (step === 1) {
      if (amountValue <= 0) next['amount'] = 'Enter an amount to send.';
      else if (amountValue > source.balance) {
        next['amount'] = `Exceeds the ${idr(source.balance)} available in this account.`;
      } else if (method === 'Instant' && amountValue > 100_000_000) {
        next['amount'] = 'Instant payouts are capped at IDR 100,000,000. Use SKN or RTGS.';
      }
    }
    if (step === 2 && !payee) next['payee'] = 'Choose who you are paying.';
    if (step === 3 && scheduled && !date) next['date'] = 'Pick a date for the scheduled payout.';
    if (step === 4 && !confirmed) next['confirm'] = 'Confirm the details before submitting.';
    return next;
  }, [step, amountValue, source.balance, method, payee, scheduled, date, confirmed]);

  const stepValid = Object.keys(errors).length === 0;

  const advance = () => {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step === STEPS.length) {
      setDone(true);
      toast.success('Payout submitted for approval', { close: true, duration: 6000 });
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setShowErrors(false);
    if (step === 1) setDiscardOpen(true);
    else setStep((s) => s - 1);
  };

  const reset = () => {
    setStep(1);
    setDone(false);
    setShowErrors(false);
    setAmount('');
    setPayee(null);
    setQuery('');
    setScheduled(false);
    setDate(null);
    setNote('');
    setConfirmed(false);
  };

  // Hoisted so each is a single narrowable const — calling a helper twice in
  // one conditional spread defeats narrowing under exactOptionalPropertyTypes.
  const amountError = showErrors ? errors['amount'] : undefined;
  const payeeError = showErrors ? errors['payee'] : undefined;
  const dateError = showErrors ? errors['date'] : undefined;
  const confirmError = showErrors ? errors['confirm'] : undefined;

  if (done) {
    return (
      <ConsoleFrame
        activeValue="new-payout"
        breadcrumb={[
          { label: 'Disbursements', href: '#' },
          { label: 'Payouts', href: '#' },
          { label: 'New payout' },
        ]}
        title="Payout submitted"
        description="One approval is required before funds move."
      >
        <Toaster position="top-right" />
        <ConsoleCard className="demo-success-card">
          <span className="demo-success-mark" aria-hidden="true">
            ✓
          </span>
          <h3>{idr(amountValue)} queued</h3>
          <p>
            {payee?.name} · {payee ? maskedAccount(payee.bank, payee.accountNumber) : null}
          </p>
          <Label variant="warning">Waiting for approval</Label>
          <dl className="demo-detail-list demo-success-detail">
            <div>
              <dt>Reference</dt>
              <dd className="demo-mono">DIS-20260810-0042</dd>
            </div>
            <div>
              <dt>From</dt>
              <dd>{source.label}</dd>
            </div>
            <div>
              <dt>Method</dt>
              <dd>{method}</dd>
            </div>
            <div>
              <dt>{scheduled ? 'Scheduled for' : 'Sending'}</dt>
              <dd>{scheduled && date ? formatDate(toIso(date)) : 'As soon as approved'}</dd>
            </div>
          </dl>
          <div className="demo-inline">
            <Button size="large" onClick={reset}>
              Create another payout
            </Button>
            <Button variant="secondary" size="large">
              View in transactions
            </Button>
          </div>
        </ConsoleCard>
      </ConsoleFrame>
    );
  }

  return (
    <ConsoleFrame
      activeValue="new-payout"
      breadcrumb={[
        { label: 'Disbursements', href: '#' },
        { label: 'Payouts', href: '#' },
        { label: 'New payout' },
      ]}
      title="New payout"
      description="Four steps. Nothing moves until an approver signs off."
    >
      <Toaster position="top-right" />

      <div className="demo-stepper-row">
        <ProgressIndicator
          steps={STEPS}
          currentStep={step}
          // Only completed steps are clickable — jumping ahead would skip
          // the validation that gates each Continue.
          onStepClick={(next) => {
            if (next < step) {
              setShowErrors(false);
              setStep(next);
            }
          }}
        />
      </div>

      <div className="demo-stepper-layout">
        <ConsoleCard className="demo-form-card">
          {step === 1 ? (
            <div className="demo-form demo-form--narrow">
              <h3 className="demo-step-title">Where is the money coming from?</h3>

              <div className="demo-pop-anchor" ref={sourceRef}>
                <SelectButton
                  label="Source account"
                  value={source.label}
                  open={sourceOpen}
                  onClick={() => setSourceOpen((o) => !o)}
                  helperText={`${idr(source.balance)} available`}
                />
                {sourceOpen ? (
                  <div className="demo-pop">
                    <SelectPanel width={320}>
                      {SOURCE_ACCOUNTS.map((account) => (
                        <SelectItem
                          key={account.id}
                          selected={account.id === sourceId}
                          onClick={() => {
                            setSourceId(account.id);
                            setSourceOpen(false);
                          }}
                        >
                          {account.label}
                        </SelectItem>
                      ))}
                    </SelectPanel>
                  </div>
                ) : null}
              </div>

              <TextField
                label="Amount"
                placeholder="0"
                inputMode="numeric"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                helperTextTop="IDR"
                {...(amountValue > 0 ? { helperText: idr(amountValue) } : {})}
                {...(amountError ? { errorMessage: amountError } : {})}
              />

              <fieldset className="demo-fieldset">
                <legend>
                  Method
                  <Tooltip content="Instant clears in seconds but caps at IDR 100,000,000.">
                    <span className="demo-info" tabIndex={0} role="button" aria-label="Method help">
                      ?
                    </span>
                  </Tooltip>
                </legend>
                {METHODS.map((option) => (
                  <RadioButton
                    key={option.id}
                    name="payout-method"
                    label={option.label}
                    description={option.description}
                    checked={method === option.id}
                    onChange={() => setMethod(option.id)}
                  />
                ))}
              </fieldset>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="demo-form demo-form--narrow">
              <h3 className="demo-step-title">Who are you paying?</h3>

              <div className="demo-pop-anchor" ref={searchRef}>
                <Search
                  placeholder="Search saved beneficiaries"
                  value={query}
                  onValueChange={(value) => {
                    setQuery(value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onClear={() => setQuery('')}
                  showShortcutHint={false}
                />
                {searchOpen && query.trim().length > 0 ? (
                  <div className="demo-search-pop">
                    <SearchResultPanel
                      state={matches.length > 0 ? 'result' : 'empty'}
                      emptyMessage="No saved beneficiary matches that name."
                      items={matches.map((b) => ({
                        id: b.id,
                        label: b.name,
                        helper: maskedAccount(b.bank, b.accountNumber),
                        onClick: () => {
                          setPayee(b);
                          setQuery(b.name);
                          setSearchOpen(false);
                        },
                      }))}
                    />
                  </div>
                ) : null}
              </div>

              {payee ? (
                <div className="demo-payee-card">
                  <div>
                    <strong>{payee.name}</strong>
                    <span className="demo-mono demo-cell-sub">
                      {maskedAccount(payee.bank, payee.accountNumber)}
                    </span>
                  </div>
                  <Label
                    variant={payee.verified === 'verified' ? 'positive' : 'warning'}
                  >
                    {payee.verified === 'verified' ? 'Verified' : 'Pending review'}
                  </Label>
                </div>
              ) : (
                <p className="demo-field-error">{payeeError ?? ''}</p>
              )}

              {payee && payee.verified !== 'verified' ? (
                <Banner
                  variant="section"
                  intent="warning"
                  message="This beneficiary is still being verified. The payout will queue until verification clears."
                  showIcon
                />
              ) : null}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="demo-form demo-form--narrow">
              <h3 className="demo-step-title">When should it go out?</h3>

              <Toggle
                label="Schedule for later"
                description="Otherwise the payout is sent as soon as it is approved."
                checked={scheduled}
                onChange={(event) => setScheduled(event.target.checked)}
              />

              {scheduled ? (
                <div className="demo-pop-anchor" ref={dateRef}>
                  <SelectButton
                    label="Send on"
                    placeholder="Pick a date"
                    open={dateOpen}
                    onClick={() => setDateOpen((o) => !o)}
                    {...(date ? { value: formatDate(toIso(date)) } : {})}
                    {...(dateError ? { helperText: dateError } : {})}
                  />
                  {dateOpen ? (
                    <div className="demo-pop">
                      <div className="demo-datepicker-shell">
                        <DatePicker
                          value={date}
                          onChange={setDate}
                          defaultMonth={new Date(2026, 7, 1)}
                          min={new Date(2026, 7, 10)}
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
              ) : null}

              <Toggle
                label="Notify the beneficiary"
                description="Sends a payment advice by email once funds are released."
                checked={notify}
                onChange={(event) => setNotify(event.target.checked)}
              />

              <TextArea
                label="Payment reference"
                placeholder="Invoice number or contract reference"
                helperText="Appears on the beneficiary's bank statement."
                counterText={`${note.length}/140`}
                maxLength={140}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
          ) : null}

          {step === 4 ? (
            <div className="demo-form demo-form--narrow">
              <h3 className="demo-step-title">Check before you submit</h3>

              <Banner
                variant="section"
                intent="informational"
                message="Submitting sends this payout for approval. It does not move funds yet."
                showIcon
              />

              <dl className="demo-detail-list">
                <div>
                  <dt>Amount</dt>
                  <dd className="demo-mono demo-review-amount">{idr(amountValue)}</dd>
                </div>
                <div>
                  <dt>From</dt>
                  <dd>{source.label}</dd>
                </div>
                <div>
                  <dt>To</dt>
                  <dd>
                    {payee?.name}
                    <span className="demo-mono demo-cell-sub">
                      {payee ? maskedAccount(payee.bank, payee.accountNumber) : null}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>Method</dt>
                  <dd>{method}</dd>
                </div>
                <div>
                  <dt>{scheduled ? 'Scheduled for' : 'Sending'}</dt>
                  <dd>{scheduled && date ? formatDate(toIso(date)) : 'As soon as approved'}</dd>
                </div>
                <div>
                  <dt>Reference</dt>
                  <dd>{note || '—'}</dd>
                </div>
              </dl>

              <Checkbox
                label="I confirm the beneficiary and amount are correct"
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
                {...(confirmError ? { errorMessage: confirmError, error: true } : {})}
              />
            </div>
          ) : null}

          <div className="demo-step-actions">
            <Button variant="secondary" size="large" onClick={goBack}>
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button size="large" onClick={advance}>
              {step === STEPS.length ? 'Submit for approval' : 'Continue'}
            </Button>
          </div>
        </ConsoleCard>

        <ConsoleCard className="demo-summary-card" title="Summary">
          <dl className="demo-detail-list">
            <div>
              <dt>Amount</dt>
              <dd className="demo-mono">{amountValue > 0 ? idr(amountValue) : '—'}</dd>
            </div>
            <div>
              <dt>From</dt>
              <dd>{source.label}</dd>
            </div>
            <div>
              <dt>To</dt>
              <dd>{payee?.name ?? '—'}</dd>
            </div>
            <div>
              <dt>Method</dt>
              <dd>{method}</dd>
            </div>
          </dl>
          <p className="demo-limit-note">
            Step {step} of {STEPS.length} · {STEPS[step - 1]?.label}
          </p>
        </ConsoleCard>
      </div>

      <Dialog
        open={discardOpen}
        onOpenChange={setDiscardOpen}
        type="destructive"
        size="small"
        title="Discard this payout?"
        description="Nothing has been submitted. The details you entered will be lost."
        showSecondaryAction
        primaryActionLabel="Discard"
        secondaryActionLabel="Keep editing"
        onPrimaryAction={() => {
          setDiscardOpen(false);
          reset();
        }}
        onSecondaryAction={() => setDiscardOpen(false)}
      />
    </ConsoleFrame>
  );
}

function toIso(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
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
