'use client';

/**
 * Screen 5 — Payout settings (single-page form).
 *
 * The counterpart to the stepper: one long sectioned form rather than a
 * guided flow. It covers what a stepper deliberately hides — many fields on
 * screen at once, mixed control types in a two-column grid, live inline
 * validation, a dirty-state bar, and a destructive action parked at the
 * bottom behind a confirmation.
 *
 * Form columns cap at `--size-field-max`. Components fill their container, so
 * without that cap these fields would run the full width of the page.
 */

import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  Banner,
  Button,
  Checkbox,
  Dialog,
  FileUpload,
  Label,
  RadioButton,
  SelectButton,
  SelectItem,
  SelectPanel,
  TextArea,
  TextField,
  Toggle,
  Tooltip,
  useIsolatedToastSystem,
  type FileUploadItem,
} from '@brankas/react/desktop';

import { ConsoleCard, ConsoleFrame } from './console-frame';
import { idr } from './demo-data';

const APPROVAL_MODES = [
  {
    description: 'Any single approver can release a payout.',
    id: 'single',
    label: 'Single approval',
  },
  {
    description: 'Two different approvers are required. Recommended above IDR 100,000,000.',
    id: 'dual',
    label: 'Dual approval',
  },
  {
    description: 'Payouts release automatically. Only available under IDR 10,000,000.',
    id: 'auto',
    label: 'Automatic',
  },
] as const;

const TIMEZONES = ['Asia/Jakarta (WIB)', 'Asia/Makassar (WITA)', 'Asia/Jayapura (WIT)'];

type ApprovalMode = (typeof APPROVAL_MODES)[number]['id'];

export function SettingsScreen() {
  const { toast, Toaster } = useIsolatedToastSystem();

  const initial = {
    approval: 'dual' as ApprovalMode,
    dailyLimit: '750000000',
    legalName: 'PT Sinar Niaga Sejahtera',
    npwp: '01.234.567.8-901.000',
    payoutEmail: 'finance@sinarniaga.co.id',
    singleLimit: '100000000',
    statementNote: 'SINAR NIAGA',
    timezone: 'Asia/Jakarta (WIB)',
  };

  const [legalName, setLegalName] = useState(initial.legalName);
  const [npwp, setNpwp] = useState(initial.npwp);
  const [payoutEmail, setPayoutEmail] = useState(initial.payoutEmail);
  const [statementNote, setStatementNote] = useState(initial.statementNote);
  const [approval, setApproval] = useState<ApprovalMode>(initial.approval);
  const [dailyLimit, setDailyLimit] = useState(initial.dailyLimit);
  const [singleLimit, setSingleLimit] = useState(initial.singleLimit);
  const [timezone, setTimezone] = useState(initial.timezone);
  const [tzOpen, setTzOpen] = useState(false);

  const [notifySettled, setNotifySettled] = useState(true);
  const [notifyFailed, setNotifyFailed] = useState(true);
  const [notifyApproval, setNotifyApproval] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const [logo, setLogo] = useState<FileUploadItem[]>([]);
  const [closeOpen, setCloseOpen] = useState(false);

  const tzRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!tzOpen) return;
    const handler = (event: MouseEvent) => {
      if (!tzRef.current?.contains(event.target as Node)) setTzOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [tzOpen]);

  const dirty =
    legalName !== initial.legalName ||
    npwp !== initial.npwp ||
    payoutEmail !== initial.payoutEmail ||
    statementNote !== initial.statementNote ||
    approval !== initial.approval ||
    dailyLimit !== initial.dailyLimit ||
    singleLimit !== initial.singleLimit ||
    timezone !== initial.timezone;

  // Inline and live, unlike the stepper's validate-on-Continue. A settings
  // page has no Continue to gate, so feedback has to arrive as you type.
  const emailError =
    payoutEmail.length > 0 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payoutEmail)
      ? 'Enter a valid email address.'
      : undefined;
  const nameError = legalName.trim().length === 0 ? 'Legal name is required.' : undefined;
  const daily = Number(dailyLimit) || 0;
  const single = Number(singleLimit) || 0;
  const limitError =
    single > daily ? 'The single-payout limit cannot exceed the daily limit.' : undefined;
  const autoApprovalWarning = approval === 'auto' && single > 10_000_000;

  const canSave = !emailError && !nameError && !limitError && dirty;

  const reset = () => {
    setLegalName(initial.legalName);
    setNpwp(initial.npwp);
    setPayoutEmail(initial.payoutEmail);
    setStatementNote(initial.statementNote);
    setApproval(initial.approval);
    setDailyLimit(initial.dailyLimit);
    setSingleLimit(initial.singleLimit);
    setTimezone(initial.timezone);
  };

  return (
    <ConsoleFrame
      activeValue="settings"
      breadcrumb={[{ label: 'Disbursements', href: '#' }, { label: 'Settings' }]}
      title="Payout settings"
      description="Applies to every payout your organisation submits."
    >
      <Toaster position="top-right" />

      {dirty ? (
        <Banner
          variant="section"
          intent="warning"
          message="You have unsaved changes."
          showIcon
        />
      ) : null}

      <div className="demo-settings-grid">
        <ConsoleCard title="Organisation">
          <div className="demo-form demo-form--columns">
            <TextField
              label="Registered legal name"
              value={legalName}
              onChange={(event) => setLegalName(event.target.value)}
              helperText="Must match your bank records."
              {...(nameError ? { errorMessage: nameError } : {})}
            />
            <TextField
              label="NPWP"
              value={npwp}
              onChange={(event) => setNpwp(event.target.value)}
              helperText="Tax identification number."
            />
            <TextField
              label="Payout notifications email"
              type="email"
              value={payoutEmail}
              onChange={(event) => setPayoutEmail(event.target.value)}
              {...(emailError ? { errorMessage: emailError } : {})}
            />
            <div className="demo-pop-anchor" ref={tzRef}>
              <SelectButton
                label="Reporting timezone"
                value={timezone}
                open={tzOpen}
                onClick={() => setTzOpen((o) => !o)}
                helperText="Cut-off times are shown in this zone."
              />
              {tzOpen ? (
                <div className="demo-pop">
                  <SelectPanel width={280}>
                    {TIMEZONES.map((zone) => (
                      <SelectItem
                        key={zone}
                        selected={zone === timezone}
                        onClick={() => {
                          setTimezone(zone);
                          setTzOpen(false);
                        }}
                      >
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectPanel>
                </div>
              ) : null}
            </div>
          </div>

          <TextArea
            label="Bank statement descriptor"
            helperText="Shown on the beneficiary's statement. Uppercase, max 18 characters."
            counterText={`${statementNote.length}/18`}
            maxLength={18}
            value={statementNote}
            onChange={(event) => setStatementNote(event.target.value.toUpperCase())}
          />

          <FileUpload
            variant="button"
            title="Organisation logo"
            description="Appears on payment advices. PNG or SVG, at least 256×256."
            accept=".png,.svg"
            files={logo}
            onChange={(picked) =>
              setLogo(
                picked.map((file) => ({
                  name: file.name,
                  meta: `${Math.max(1, Math.round(file.size / 1024))}KB`,
                  status: 'done' as const,
                })),
              )
            }
            onRemoveFile={() => setLogo([])}
          />
        </ConsoleCard>

        <ConsoleCard title="Approvals and limits">
          <fieldset className="demo-fieldset">
            <legend>
              Approval policy
              <Tooltip content="Dual approval is required by most bank agreements above IDR 100,000,000.">
                <span className="demo-info" tabIndex={0} role="button" aria-label="Policy help">
                  ?
                </span>
              </Tooltip>
            </legend>
            {APPROVAL_MODES.map((mode) => (
              <RadioButton
                key={mode.id}
                name="approval-mode"
                label={mode.label}
                description={mode.description}
                checked={approval === mode.id}
                onChange={() => setApproval(mode.id)}
              />
            ))}
          </fieldset>

          {autoApprovalWarning ? (
            <Banner
              variant="section"
              intent="error"
              title="Automatic approval is not available"
              message="Your single-payout limit is above IDR 10,000,000. Lower the limit or choose another policy."
              showIcon
            />
          ) : null}

          <div className="demo-form demo-form--columns">
            <TextField
              label="Daily limit"
              inputMode="numeric"
              helperTextTop="IDR"
              value={dailyLimit}
              onChange={(event) => setDailyLimit(event.target.value.replace(/[^\d]/g, ''))}
              {...(daily > 0 ? { helperText: idr(daily) } : {})}
            />
            <TextField
              label="Single payout limit"
              inputMode="numeric"
              helperTextTop="IDR"
              value={singleLimit}
              onChange={(event) => setSingleLimit(event.target.value.replace(/[^\d]/g, ''))}
              {...(limitError ? { errorMessage: limitError } : single > 0 ? { helperText: idr(single) } : {})}
            />
          </div>
        </ConsoleCard>

        <ConsoleCard title="Notifications">
          <div className="demo-form">
            <Toggle
              label="Payout settled"
              description="When funds reach the beneficiary."
              checked={notifySettled}
              onChange={(event) => setNotifySettled(event.target.checked)}
            />
            <Toggle
              label="Payout failed"
              description="Rejected by the receiving bank, or insufficient balance."
              checked={notifyFailed}
              onChange={(event) => setNotifyFailed(event.target.checked)}
            />
            <Toggle
              label="Awaiting approval"
              description="A payout is queued and needs a decision."
              checked={notifyApproval}
              onChange={(event) => setNotifyApproval(event.target.checked)}
            />
            <Checkbox
              label="Weekly summary"
              description="Every Monday, 08:00 in your reporting timezone."
              checked={weeklyDigest}
              onChange={(event) => setWeeklyDigest(event.target.checked)}
            />
          </div>
        </ConsoleCard>

        <ConsoleCard title="Advanced">
          <Accordion title="API access" defaultOpen={false}>
            <p className="demo-advanced-body">
              Payouts can be submitted programmatically with an API key scoped to this
              organisation. Keys inherit the approval policy above — an automatic policy
              still applies its limit.
            </p>
            <Button variant="secondary" size="small">
              Manage API keys
            </Button>
          </Accordion>

          <Accordion title="Close payout account" defaultOpen={false}>
            <p className="demo-advanced-body">
              Closing stops all future payouts. Settled history stays available for seven
              years. Any queued payout is cancelled.
            </p>
            <Label variant="negative">Irreversible</Label>
            <Button variant="danger-secondary" size="small" onClick={() => setCloseOpen(true)}>
              Close account
            </Button>
          </Accordion>
        </ConsoleCard>
      </div>

      {/* Sticky action bar: a long form should never make you scroll back up
          to find Save, and Save stays disabled until the form is both dirty
          and valid. */}
      <div className="demo-save-bar">
        <span className="demo-save-state">
          {dirty ? (
            <Label variant="warning">Unsaved changes</Label>
          ) : (
            <Label variant="positive">All changes saved</Label>
          )}
        </span>
        <div className="demo-inline">
          <Button variant="secondary" size="large" onClick={reset} disabled={!dirty}>
            Discard
          </Button>
          <Button
            size="large"
            disabled={!canSave}
            onClick={() => toast.success('Payout settings saved', { duration: 4000 })}
          >
            Save changes
          </Button>
        </div>
      </div>

      <Dialog
        open={closeOpen}
        onOpenChange={setCloseOpen}
        type="destructive"
        size="small"
        title="Close payout account?"
        description="All queued payouts are cancelled and no new payouts can be submitted. This cannot be undone."
        showSecondaryAction
        primaryActionLabel="Close account"
        secondaryActionLabel="Cancel"
        onPrimaryAction={() => {
          setCloseOpen(false);
          toast.error('Account closure requires approval from a second administrator', {
            close: true,
            duration: 6000,
          });
        }}
        onSecondaryAction={() => setCloseOpen(false)}
      />
    </ConsoleFrame>
  );
}
