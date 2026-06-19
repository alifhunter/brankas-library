'use client';

import type { ReactNode } from 'react';
import {
  Accordion,
  Avatar,
  Badge,
  Banner,
  Breadcrumbs,
  Button,
  Carousel,
  Checkbox,
  Chip,
  Coachmark,
  DatePicker,
  Dialog,
  DropdownItem,
  DropdownPanel,
  FileUpload,
  FileUploadCard,
  Label,
  Loader,
  Pagination,
  ProgressBar,
  ProgressIndicator,
  Radio,
  Search,
  SearchResultPanel,
  Sidebar,
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
  Tabs,
  TextArea,
  TextField,
  Toast,
  Toggle,
  Tooltip,
} from '@brankas/react/desktop';

/** Renders a labeled variant slot — title above, example below. */
function Variant({
  label,
  description,
  children,
  fullWidth = false,
}: {
  label: string;
  description?: string;
  children: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={`example-variant${fullWidth ? ' example-variant--wide' : ''}`}>
      <div className="example-variant__head">
        <span className="example-variant__label">{label}</span>
        {description ? <span className="example-variant__desc">{description}</span> : null}
      </div>
      <div className="example-variant__body">{children}</div>
    </div>
  );
}

function Matrix({ children }: { children: ReactNode }) {
  return <div className="example-matrix">{children}</div>;
}

export function ComponentExample({ slug }: { slug: string }) {
  switch (slug) {
    case 'accordion':
      return (
        <Matrix>
          <Variant label="Collapsed">
            <Accordion title="Account information" />
          </Variant>
          <Variant label="Expanded">
            <Accordion defaultOpen title="Account information">
              <p className="example-copy">
                Account details and supporting metadata are shown here.
              </p>
            </Accordion>
          </Variant>
          <Variant label="With action">
            <Accordion defaultOpen actionLabel="Manage" title="Profile" />
          </Variant>
        </Matrix>
      );

    case 'avatar':
      return (
        <Matrix>
          <Variant label="Icon fallback">
            <div className="example-row">
              <Avatar size="small" />
              <Avatar size="medium" />
              <Avatar size="large" />
            </div>
          </Variant>
          <Variant label="Initials">
            <div className="example-row">
              <Avatar size="small" type="initial" initials="JL" />
              <Avatar size="medium" type="initial" initials="JL" />
              <Avatar size="large" type="initial" initials="JL" />
            </div>
          </Variant>
        </Matrix>
      );

    case 'badge':
      return (
        <Matrix>
          <Variant label="Number">
            <div className="example-row">
              <Badge color="gray" type="number" text={9} />
              <Badge color="primary" type="number" text={24} />
              <Badge color="blue" type="number" text={3} />
              <Badge color="red" type="number" text={99} />
            </div>
          </Variant>
          <Variant label="Dot">
            <div className="example-row">
              <Badge color="gray" type="dot" />
              <Badge color="red" type="dot" />
              <Badge color="blue" type="dot" />
            </div>
          </Variant>
          <Variant label="New">
            <div className="example-row">
              <Badge color="red" type="new" />
              <Badge color="blue" type="new" />
            </div>
          </Variant>
        </Matrix>
      );

    case 'banner':
      return (
        <Matrix>
          <Variant label="Section · informational" fullWidth>
            <Banner
              variant="section"
              intent="informational"
              title="Information"
              message="Helpful contextual info for this section."
            />
          </Variant>
          <Variant label="Section · warning" fullWidth>
            <Banner
              variant="section"
              intent="warning"
              title="Warning"
              message="Watch out for the following condition."
            />
          </Variant>
          <Variant label="Section · error" fullWidth>
            <Banner
              variant="section"
              intent="error"
              title="Error"
              message="This step could not be completed."
            />
          </Variant>
          <Variant label="Message" fullWidth>
            <Banner
              variant="message"
              intent="orange"
              message="Inline message banner."
              showCloseButton
            />
          </Variant>
        </Matrix>
      );

    case 'breadcrumbs':
      return (
        <Matrix>
          <Variant label="Two levels">
            <Breadcrumbs
              items={[
                { label: 'Components', href: '/#components' },
                { label: 'Breadcrumbs' },
              ]}
            />
          </Variant>
          <Variant label="Collapsed">
            <Breadcrumbs
              collapseAfter={4}
              items={[
                { label: 'Root', href: '/' },
                { label: 'Customers', href: '/' },
                { label: 'PT Brankas', href: '/' },
                { label: 'Accounts', href: '/' },
                { label: 'Primary' },
              ]}
            />
          </Variant>
        </Matrix>
      );

    case 'button':
      return (
        <Matrix>
          <Variant label="Variants">
            <div className="example-row">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="danger-primary">Delete</Button>
            </div>
          </Variant>
          <Variant label="Sizes">
            <div className="example-row example-row--align-center">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
              <Button size="extra-large">Extra large</Button>
            </div>
          </Variant>
          <Variant label="States">
            <div className="example-row">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Variant>
        </Matrix>
      );

    case 'carousel':
      return (
        <Matrix>
          <Variant label="Three slides">
            <Carousel totalSlides={3} activeSlide={1} />
          </Variant>
          <Variant label="Five slides">
            <Carousel totalSlides={5} activeSlide={2} />
          </Variant>
        </Matrix>
      );

    case 'checkbox':
      return (
        <Matrix>
          <Variant label="States">
            <div className="example-stack">
              <Checkbox label="Default" />
              <Checkbox defaultChecked label="Checked" />
              <Checkbox indeterminate label="Indeterminate" />
              <Checkbox disabled label="Disabled" />
              <Checkbox disabled defaultChecked label="Disabled checked" />
            </div>
          </Variant>
          <Variant label="Error">
            <Checkbox label="I accept the terms" error errorMessage="Required" />
          </Variant>
        </Matrix>
      );

    case 'chips':
      return (
        <Matrix>
          <Variant label="Default">
            <div className="example-row">
              <Chip>Filter</Chip>
              <Chip selected>Selected</Chip>
              <Chip badge={9}>With badge</Chip>
              <Chip selected badge={9}>Both</Chip>
            </div>
          </Variant>
          <Variant label="Removable">
            <div className="example-row">
              <Chip selected trailingIcon onTrailingIconClick={() => undefined}>
                DKI Jakarta
              </Chip>
              <Chip selected trailingIcon onTrailingIconClick={() => undefined}>
                Jawa Barat
              </Chip>
            </div>
          </Variant>
          <Variant label="Disabled">
            <Chip disabled>Unavailable</Chip>
          </Variant>
        </Matrix>
      );

    case 'coachmark':
      return (
        <Matrix>
          <Variant label="Top center" fullWidth>
            <Coachmark>Anchor coachmarks above the related UI element.</Coachmark>
          </Variant>
          <Variant label="With config" fullWidth>
            <Coachmark config totalSteps={3} currentStep={2} title="Step 2 of 3">
              Step the user through a multi-step tour via the carousel dots and footer buttons.
            </Coachmark>
          </Variant>
        </Matrix>
      );

    case 'date-picker':
      return (
        <Matrix>
          <Variant label="Date grid" fullWidth>
            <DatePicker
              defaultMonth={new Date(2025, 11, 1)}
              defaultValue={new Date(2025, 11, 12)}
            />
          </Variant>
          <Variant label="With actions" fullWidth>
            <DatePicker
              defaultMonth={new Date(2025, 11, 1)}
              defaultValue={new Date(2025, 11, 12)}
              showActions
              showInfo
              infoMessage="Bookable Mon – Fri only."
            />
          </Variant>
        </Matrix>
      );

    case 'dialog':
      return (
        <Matrix>
          <Variant label="Informational" fullWidth>
            <Dialog
              open
              onOpenChange={() => undefined}
              title="Information alert"
              type="informational"
              description="Use informational dialogs for short, single-call-to-action acknowledgments."
            />
          </Variant>
          <Variant label="Confirmation" fullWidth>
            <Dialog
              open
              onOpenChange={() => undefined}
              title="Confirm action"
              type="confirmation"
            />
          </Variant>
        </Matrix>
      );

    case 'dropdown':
      return (
        <Matrix>
          <Variant label="Action menu">
            <DropdownPanel width={240}>
              <DropdownItem onClick={() => undefined}>Edit</DropdownItem>
              <DropdownItem onClick={() => undefined}>Duplicate</DropdownItem>
              <DropdownItem disabled>Locked</DropdownItem>
              <DropdownItem variant="danger" onClick={() => undefined}>Delete</DropdownItem>
            </DropdownPanel>
          </Variant>
        </Matrix>
      );

    case 'file-upload':
      return (
        <Matrix>
          <Variant label="Button trigger" fullWidth>
            <FileUpload title="Upload statement" description="PDF, JPG, or PNG up to 5 MB" />
          </Variant>
          <Variant label="Dropzone" fullWidth>
            <FileUpload
              variant="dropzone"
              title="Upload statement"
              description="Drag a file here or click Upload."
            />
          </Variant>
          <Variant label="With file card" fullWidth>
            <FileUploadCard name="statement.pdf" meta="2.4 MB" status="done" />
          </Variant>
        </Matrix>
      );

    case 'label':
      return (
        <Matrix>
          <Variant label="Variants">
            <div className="example-row">
              <Label variant="neutral">Neutral</Label>
              <Label variant="information">Information</Label>
              <Label variant="positive">Active</Label>
              <Label variant="warning">Pending</Label>
              <Label variant="negative">Failed</Label>
            </div>
          </Variant>
          <Variant label="Without icon">
            <div className="example-row">
              <Label variant="positive" icon={false}>Active</Label>
              <Label variant="warning" icon={false}>Pending</Label>
            </div>
          </Variant>
          <Variant label="Backward compat · StatusLabel">
            <div className="example-row">
              <StatusLabel tone="success">Active</StatusLabel>
              <StatusLabel tone="warning">Pending</StatusLabel>
              <StatusLabel tone="error">Failed</StatusLabel>
            </div>
          </Variant>
        </Matrix>
      );

    case 'loader':
      return (
        <Matrix>
          <Variant label="Sizes">
            <div className="example-row example-row--align-center">
              <Loader size={20} />
              <Loader size={32} />
              <Loader size={48} />
              <Loader size={64} />
            </div>
          </Variant>
          <Variant label="Custom color">
            <div className="example-row example-row--align-center">
              <Loader size={32} color="var(--brankas-color-text-information, #1c77c3)" />
              <Loader size={32} color="var(--brankas-color-background-success, #2daa50)" />
              <Loader size={32} color="var(--brankas-color-primary-red, #c10e0e)" />
            </div>
          </Variant>
        </Matrix>
      );

    case 'pagination':
      return (
        <Matrix>
          <Variant label="Few pages" fullWidth>
            <Pagination count={5} defaultPage={1} showRowsPerPage={false} />
          </Variant>
          <Variant label="Many pages, middle" fullWidth>
            <Pagination count={99} defaultPage={11} />
          </Variant>
        </Matrix>
      );

    case 'progress':
      return (
        <Matrix>
          <Variant label="Small" fullWidth>
            <ProgressBar value={25} size="small" />
          </Variant>
          <Variant label="Large" fullWidth>
            <ProgressBar value={64} size="large" />
          </Variant>
          <Variant label="Complete" fullWidth>
            <ProgressBar value={100} size="large" />
          </Variant>
        </Matrix>
      );

    case 'progress-indicator':
      return (
        <Matrix>
          <Variant label="Step 1 of 3" fullWidth>
            <ProgressIndicator
              currentStep={1}
              steps={[
                { label: 'Details' },
                { label: 'Review' },
                { label: 'Submit' },
              ]}
            />
          </Variant>
          <Variant label="Step 2 of 3" fullWidth>
            <ProgressIndicator
              currentStep={2}
              steps={[
                { label: 'Details' },
                { label: 'Review' },
                { label: 'Submit' },
              ]}
            />
          </Variant>
          <Variant label="Complete" fullWidth>
            <ProgressIndicator
              currentStep={4}
              steps={[
                { label: 'Details' },
                { label: 'Review' },
                { label: 'Submit' },
                { label: 'Done' },
              ]}
            />
          </Variant>
        </Matrix>
      );

    case 'radio':
      return (
        <Matrix>
          <Variant label="Default">
            <div className="example-stack">
              <Radio defaultChecked label="Personal account" name="account-type" />
              <Radio label="Business account" name="account-type" />
              <Radio disabled label="Locked" name="account-type" />
            </div>
          </Variant>
          <Variant label="Small">
            <div className="example-stack">
              <Radio size="small" defaultChecked label="Personal" name="acct-sm" />
              <Radio size="small" label="Business" name="acct-sm" />
            </div>
          </Variant>
        </Matrix>
      );

    case 'search':
      return (
        <Matrix>
          <Variant label="Default" fullWidth>
            <Search />
          </Variant>
          <Variant label="With dropdown + button" fullWidth>
            <Search showDropdown showButton defaultValue="Sinarmas Terang Silau" />
          </Variant>
          <Variant label="Result panel" fullWidth>
            <SearchResultPanel
              state="result"
              items={[
                { id: '1', label: 'John Legend', helper: '001234' },
                { id: '2', label: 'Johnny Cash', helper: '001235' },
              ]}
            />
          </Variant>
        </Matrix>
      );

    case 'sidebar':
      return (
        <Matrix>
          <Variant label="Default" fullWidth>
            <div style={{ height: 420, display: 'flex' }}>
              <Sidebar
                items={[
                  { value: 'dashboard', label: 'Dashboard' },
                  { value: 'transfers', label: 'Transfers' },
                  { value: 'accounts', label: 'Accounts' },
                  { value: 'reports', label: 'Reports' },
                  { value: 'settings', label: 'Settings', disabled: true },
                ]}
                defaultActiveValue="dashboard"
              />
            </div>
          </Variant>
          <Variant label="Nested groups" fullWidth>
            <div style={{ height: 420, display: 'flex' }}>
              <Sidebar
                items={[
                  { value: 'dashboard', label: 'Dashboard' },
                  {
                    value: 'payments',
                    label: 'Payments',
                    children: [
                      {
                        value: 'transfers',
                        label: 'Transfers',
                        children: [
                          { value: 'single', label: 'Single transfer' },
                          { value: 'bulk', label: 'Bulk transfer' },
                        ],
                      },
                      { value: 'payroll', label: 'Payroll' },
                    ],
                  },
                  { value: 'reports', label: 'Reports' },
                ]}
                defaultActiveValue="single"
              />
            </div>
          </Variant>
          <Variant label="With minimize control" fullWidth>
            <div style={{ height: 420, display: 'flex' }}>
              <Sidebar
                showCollapseControl
                items={[
                  { value: 'dashboard', label: 'Dashboard' },
                  { value: 'transfers', label: 'Transfers' },
                  { value: 'accounts', label: 'Accounts' },
                ]}
                defaultActiveValue="transfers"
              />
            </div>
          </Variant>
        </Matrix>
      );

    case 'select':
      return (
        <Matrix>
          <Variant label="Trigger">
            <div className="example-row">
              <SelectButton placeholder="Status" />
              <SelectButton label="Status" value="Active" badge={3} />
            </div>
          </Variant>
          <Variant label="Panel">
            <SelectPanel>
              <SelectItem selected>Active</SelectItem>
              <SelectItem>Pending</SelectItem>
              <SelectItem>Archived</SelectItem>
            </SelectPanel>
          </Variant>
        </Matrix>
      );

    case 'skeleton':
      return (
        <Matrix>
          <Variant label="Lines" fullWidth>
            <div className="example-stack" style={{ width: 320 }}>
              <Skeleton width="100%" height={16} />
              <Skeleton width="80%" height={16} />
              <Skeleton width="60%" height={16} />
            </div>
          </Variant>
          <Variant label="Circle">
            <div className="example-row example-row--align-center">
              <Skeleton shape="circle" width={32} />
              <Skeleton shape="circle" width={48} />
              <Skeleton shape="circle" width={64} />
            </div>
          </Variant>
        </Matrix>
      );

    case 'table':
      return (
        <Matrix>
          <Variant label="Medium · zebra" fullWidth>
            <Table zebra>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Reference</TableHeaderCell>
                  <TableHeaderCell>Customer</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell alignment="right">Amount</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>TRX-001</TableCell>
                  <TableCell>PT Brankas</TableCell>
                  <TableCell>
                    <StatusLabel tone="success">Paid</StatusLabel>
                  </TableCell>
                  <TableCell alignment="right">IDR 24,000,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TRX-002</TableCell>
                  <TableCell>PT Sinarmas</TableCell>
                  <TableCell>
                    <StatusLabel tone="warning">Pending</StatusLabel>
                  </TableCell>
                  <TableCell alignment="right">IDR 18,500,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Variant>
        </Matrix>
      );

    case 'tabs':
      return (
        <Matrix>
          <Variant label="Horizontal" fullWidth>
            <Tabs
              items={[
                { value: 'overview', label: 'Overview' },
                { value: 'activity', label: 'Activity', badge: 9 },
                { value: 'settings', label: 'Settings' },
              ]}
            />
          </Variant>
          <Variant label="Chips" fullWidth>
            <Tabs
              type="chips"
              items={[
                { value: 'all', label: 'All' },
                { value: 'open', label: 'Open', badge: 12 },
                { value: 'closed', label: 'Closed' },
              ]}
            />
          </Variant>
        </Matrix>
      );

    case 'text-area':
      return (
        <Matrix>
          <Variant label="Default" fullWidth>
            <TextArea
              label="Notes"
              placeholder="Type a note…"
              helperText="Share enough detail so the right team can pick it up."
              counterText="0/250"
            />
          </Variant>
          <Variant label="Error" fullWidth>
            <TextArea
              label="Reason"
              defaultValue="Too short"
              counterText="9/250"
              errorMessage="Provide at least 20 characters."
            />
          </Variant>
        </Matrix>
      );

    case 'text-field':
      return (
        <Matrix>
          <Variant label="Default" fullWidth>
            <TextField label="Email" helperText="Use your company email address." />
          </Variant>
          <Variant label="Filled" fullWidth>
            <TextField label="Email" defaultValue="user@brankas.com" />
          </Variant>
          <Variant label="Error" fullWidth>
            <TextField
              label="Email"
              defaultValue="bad@"
              state="error-filled"
              errorMessage="Enter a valid email address."
            />
          </Variant>
        </Matrix>
      );

    case 'toast':
      return (
        <Matrix>
          <Variant label="Types" fullWidth>
            <div className="example-stack">
              <Toast>Generic toast</Toast>
              <Toast type="success">Success toast</Toast>
              <Toast type="warning">Warning toast</Toast>
              <Toast type="information">Information toast</Toast>
              <Toast type="error">Error toast</Toast>
            </div>
          </Variant>
          <Variant label="With close & action" fullWidth>
            <Toast close action={{ label: 'Undo', onClick: () => undefined }}>
              Item moved to trash
            </Toast>
          </Variant>
        </Matrix>
      );

    case 'toggle':
      return (
        <Matrix>
          <Variant label="States">
            <div className="example-stack">
              <Toggle label="Off" />
              <Toggle defaultChecked label="On" />
              <Toggle disabled label="Disabled" />
              <Toggle disabled defaultChecked label="Disabled on" />
            </div>
          </Variant>
        </Matrix>
      );

    case 'tooltip':
      return (
        <Matrix>
          <Variant label="Four placements" fullWidth>
            <div className="example-row example-row--gap-lg">
              <Tooltip content="Top placement" placement="top">
                <Button variant="secondary">Top</Button>
              </Tooltip>
              <Tooltip content="Bottom placement" placement="bottom">
                <Button variant="secondary">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left placement" placement="left">
                <Button variant="secondary">Left</Button>
              </Tooltip>
              <Tooltip content="Right placement" placement="right">
                <Button variant="secondary">Right</Button>
              </Tooltip>
            </div>
          </Variant>
        </Matrix>
      );

    default:
      return (
        <div className="example-empty">
          <p>No live preview registered for this component yet.</p>
        </div>
      );
  }
}
