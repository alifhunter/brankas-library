'use client';

/**
 * Screen 1 — Disbursements overview.
 *
 * The morning view: what settled overnight, what is stuck, how much of today's
 * limit is gone, and what needs a human. Components used here are the ones a
 * dashboard actually reaches for — Banner, ProgressBar, Label, Chip, Carousel,
 * Coachmark, Accordion, Table, plus Skeleton/Loader for the loading pass.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Accordion,
  Banner,
  Button,
  Carousel,
  Chip,
  Coachmark,
  Label,
  Loader,
  ProgressBar,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tooltip,
} from '@brankas/react/desktop';

import { ConsoleCard, ConsoleFrame } from './console-frame';
import {
  PAYOUTS,
  STATUS_COPY,
  STATUS_VARIANT,
  formatDate,
  idr,
  type Payout,
} from './demo-data';

const RANGES = ['Today', 'Last 7 days', 'Last 30 days', 'This quarter'] as const;

const DAILY_LIMIT = 750_000_000;

export function OverviewScreen() {
  const router = useRouter();
  const [range, setRange] = useState<(typeof RANGES)[number]>('Today');
  const [loading, setLoading] = useState(true);
  const [showCoachmark, setShowCoachmark] = useState(true);
  const [bannerOpen, setBannerOpen] = useState(true);

  // One-shot skeleton pass so the loading states are visible on first paint
  // rather than hidden behind a prop toggle nobody flips.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const settledToday = PAYOUTS.filter((p) => p.date === '2026-08-10' && p.status === 'settled');
  const needsReview = PAYOUTS.filter((p) => p.status === 'review');
  const failed = PAYOUTS.filter((p) => p.status === 'failed');
  const disbursedToday = PAYOUTS.filter((p) => p.date === '2026-08-10').reduce(
    (sum, p) => sum + p.amount,
    0,
  );
  const limitUsed = Math.round((disbursedToday / DAILY_LIMIT) * 100);

  return (
    <ConsoleFrame
      activeValue="overview"
      breadcrumb={[{ label: 'Disbursements', href: '#' }, { label: 'Overview' }]}
      title="Overview"
      description="Payout activity for PT Sinar Niaga · updated 09:24 WIB"
      actions={
        <div className="demo-inline">
          <Button variant="secondary" size="large">
            Export
          </Button>
          <div className="demo-coachmark-anchor">
            <Button size="large" onClick={() => router.push('/examples/new-payout')}>
              New payout
            </Button>
            {showCoachmark ? (
              <div className="demo-coachmark-pop">
                <Coachmark
                  title="Batch payouts are here"
                  position="top-right"
                  config
                  currentStep={1}
                  totalSteps={2}
                  primaryActionLabel="Show me"
                  secondaryActionLabel="Skip"
                  onDismiss={() => setShowCoachmark(false)}
                  onPrimaryAction={() => setShowCoachmark(false)}
                  onSecondaryAction={() => setShowCoachmark(false)}
                >
                  Upload a CSV to pay up to 500 beneficiaries in one approval.
                </Coachmark>
              </div>
            ) : null}
          </div>
        </div>
      }
    >
      {bannerOpen ? (
        <Banner
          variant="page"
          intent="warning"
          title="RTGS cut-off is 15:00 WIB"
          message="Payouts above IDR 100,000,000 submitted after the cut-off settle on the next business day."
          showCloseButton
          onClose={() => setBannerOpen(false)}
        />
      ) : null}

      <div className="demo-range-row">
        {RANGES.map((option) => (
          <Chip key={option} selected={range === option} onClick={() => setRange(option)}>
            {option}
          </Chip>
        ))}
      </div>

      <div className="demo-stat-grid">
        <ConsoleCard className="demo-stat demo-stat--wide">
          <div className="demo-stat-head">
            <span className="demo-stat-label">
              Disbursed {range.toLowerCase()}
              <Tooltip content="Sum of settled and in-flight payouts. Failed payouts are excluded.">
                <span className="demo-info" tabIndex={0} role="button" aria-label="How this is calculated">
                  ?
                </span>
              </Tooltip>
            </span>
          </div>
          {loading ? (
            <Skeleton width={220} height={34} />
          ) : (
            <p className="demo-stat-value demo-mono">{idr(disbursedToday)}</p>
          )}
          <div className="demo-limit">
            <div className="demo-limit-row">
              <span>Daily limit used</span>
              <span className="demo-mono">{limitUsed}%</span>
            </div>
            <ProgressBar value={limitUsed} size="large" aria-label="Daily limit used" />
            <p className="demo-limit-note">
              {idr(DAILY_LIMIT - disbursedToday)} remaining of {idr(DAILY_LIMIT)}
            </p>
          </div>
        </ConsoleCard>

        <ConsoleCard className="demo-stat">
          <span className="demo-stat-label">Settled</span>
          {loading ? (
            <Skeleton width={90} height={34} />
          ) : (
            <p className="demo-stat-value">{settledToday.length}</p>
          )}
          <Label variant="positive">On schedule</Label>
        </ConsoleCard>

        <ConsoleCard className="demo-stat">
          <span className="demo-stat-label">Needs review</span>
          {loading ? (
            <Skeleton width={90} height={34} />
          ) : (
            <p className="demo-stat-value">{needsReview.length}</p>
          )}
          <Label variant="warning">Approval required</Label>
        </ConsoleCard>

        <ConsoleCard className="demo-stat">
          <span className="demo-stat-label">Failed</span>
          {loading ? (
            <Skeleton width={90} height={34} />
          ) : (
            <p className="demo-stat-value">{failed.length}</p>
          )}
          <Label variant="negative">Action needed</Label>
        </ConsoleCard>
      </div>

      <div className="demo-split">
        <ConsoleCard
          title="Recent payouts"
          action={
            <Button variant="tertiary" size="small">
              View all
            </Button>
          }
        >
          {loading ? (
            <div className="demo-loading-block">
              <Loader size={32} color="var(--color-icon-information)" label="Loading payouts" />
              <span>Loading recent payouts…</span>
            </div>
          ) : (
            <div className="demo-table-scroll">
              <Table size="medium" zebra>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Reference</TableHeaderCell>
                    <TableHeaderCell>Beneficiary</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell alignment="right">Amount</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {PAYOUTS.slice(0, 6).map((payout: Payout) => (
                    <TableRow key={payout.id}>
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
                        <span className="demo-mono">{idr(payout.amount)}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </ConsoleCard>

        <div className="demo-side-stack">
          <ConsoleCard title="Needs your approval">
            {needsReview.map((payout) => (
              <Accordion
                key={payout.id}
                title={
                  <span className="demo-accordion-title">
                    {payout.beneficiary}
                    <span className="demo-mono">{idr(payout.amount)}</span>
                  </span>
                }
                actionLabel="Approve"
                onActionClick={() => undefined}
              >
                <dl className="demo-detail-list">
                  <div>
                    <dt>Reference</dt>
                    <dd className="demo-mono">{payout.reference}</dd>
                  </div>
                  <div>
                    <dt>Destination</dt>
                    <dd>
                      {payout.bank} · {payout.method}
                    </dd>
                  </div>
                  <div>
                    <dt>Submitted</dt>
                    <dd>{formatDate(payout.date)}</dd>
                  </div>
                  <div>
                    <dt>Reason held</dt>
                    <dd>Above the IDR 100,000,000 single-approval threshold.</dd>
                  </div>
                </dl>
              </Accordion>
            ))}
          </ConsoleCard>

          <ConsoleCard title="What's new">
            <div className="demo-promo">
              <p className="demo-promo-eyebrow">Product update</p>
              <p className="demo-promo-body">
                Instant payouts now settle to 42 banks, including regional BPDs.
              </p>
              <Carousel totalSlides={3} defaultActiveSlide={1} clickable ariaLabel="Product updates" />
            </div>
          </ConsoleCard>
        </div>
      </div>
    </ConsoleFrame>
  );
}
