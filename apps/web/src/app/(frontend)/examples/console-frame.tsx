'use client';

/**
 * Shared chrome for the Brankas Disbursements example console.
 *
 * Every example screen renders inside this frame so the three screens read as
 * one product rather than three isolated demos. The chrome itself is built
 * from library components — Sidebar, Breadcrumb, Avatar, Badge, Dropdown,
 * Tooltip, Button — which is the point: the shell is as much a composition
 * test as the page bodies are.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Dropdown,
  DropdownItem,
  Sidebar,
  Tooltip,
  type BreadcrumbItem,
  type SidebarMenuItem,
} from '@brankas/react/desktop';

const NAV_ITEMS: SidebarMenuItem[] = [
  { href: '/examples/overview', label: 'Overview', value: 'overview' },
  {
    label: 'Payouts',
    value: 'payouts',
    defaultExpanded: true,
    children: [
      { href: '/examples/new-payout', label: 'New payout', value: 'new-payout' },
      { href: '/examples/transactions', label: 'Transactions', value: 'transactions' },
      { href: '/examples/beneficiaries', label: 'Beneficiaries', value: 'beneficiaries' },
    ],
  },
  { label: 'Balances', value: 'balances', disabled: true },
  { label: 'Reports', value: 'reports', disabled: true },
  { href: '/examples/settings', label: 'Settings', value: 'settings' },
];

export type ConsoleFrameProps = {
  actions?: ReactNode;
  activeValue: string;
  breadcrumb: BreadcrumbItem[];
  children: ReactNode;
  description?: string;
  title: string;
};

export function ConsoleFrame({
  actions,
  activeValue,
  breadcrumb,
  children,
  description,
  title,
}: ConsoleFrameProps) {
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accountOpen) return;
    const handler = (event: MouseEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) setAccountOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [accountOpen]);

  return (
    <div className="demo-frame">
      <div className="demo-frame-rail">
        <Sidebar
          activeValue={activeValue}
          aria-label="Disbursements navigation"
          items={NAV_ITEMS}
          logo={
            <span className="demo-brand">
              <span className="demo-brand-mark" aria-hidden="true" />
              <span className="demo-brand-text">
                <strong>Brankas</strong>
                <span>Disbursements</span>
              </span>
            </span>
          }
          showCollapseControl
        />
      </div>

      <div className="demo-frame-main">
        <header className="demo-topbar">
          <Breadcrumb items={breadcrumb} />

          <div className="demo-topbar-actions">
            <Tooltip content="3 payouts need your approval">
              <span className="demo-bell" role="status" aria-label="3 payouts need approval">
                <BellGlyph />
                <Badge type="number" color="red" text={3} />
              </span>
            </Tooltip>

            <div className="demo-account" ref={accountRef}>
              <button
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                className="demo-account-trigger"
                onClick={() => setAccountOpen((open) => !open)}
                type="button"
              >
                <Avatar type="initial" initials="RW" size="small" />
                <span className="demo-account-name">
                  <strong>Rina Wijaya</strong>
                  <span>PT Sinar Niaga</span>
                </span>
              </button>

              {accountOpen ? (
                <div className="demo-account-menu">
                  <Dropdown width={220}>
                    <DropdownItem onClick={() => setAccountOpen(false)}>
                      Switch organisation
                    </DropdownItem>
                    <DropdownItem onClick={() => setAccountOpen(false)}>
                      Account settings
                    </DropdownItem>
                    <DropdownItem onClick={() => setAccountOpen(false)}>API keys</DropdownItem>
                    <DropdownItem
                      variant="danger"
                      onClick={() => setAccountOpen(false)}
                    >
                      Sign out
                    </DropdownItem>
                  </Dropdown>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="demo-page">
          <div className="demo-page-head">
            <div>
              <h2 className="demo-page-title">{title}</h2>
              {description ? <p className="demo-page-description">{description}</p> : null}
            </div>
            {actions ? <div className="demo-page-actions">{actions}</div> : null}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

/** Small local glyph — the shared icon set has no bell. */
function BellGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5v2.6l-1.2 2.4a.5.5 0 0 0 .45.72h10.5a.5.5 0 0 0 .45-.72L14.5 9.6V7A4.5 4.5 0 0 0 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 15.2a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The bar the engineering review flagged: a Select-shaped control (8px radius)
 * sitting directly next to a pill Button. Both example toolbars use this so
 * the pairing is always visible in a real layout rather than in isolation.
 */
export function ConsoleToolbar({ children }: { children: ReactNode }) {
  return <div className="demo-toolbar">{children}</div>;
}

export function ConsoleCard({
  children,
  className,
  title,
  action,
}: {
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  title?: ReactNode;
}) {
  return (
    <section className={className ? `demo-card ${className}` : 'demo-card'}>
      {title ? (
        <header className="demo-card-head">
          <h3>{title}</h3>
          {action ?? null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
