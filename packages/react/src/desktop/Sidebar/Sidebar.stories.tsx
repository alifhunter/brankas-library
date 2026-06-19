import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Sidebar } from './Sidebar';
import type { SidebarMenuItem } from './Sidebar.types';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=2435-6097';

function GlyphIcon({ d }: { d: string }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width={24} height={24}>
      <path d={d} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}

const SAMPLE_ITEMS: SidebarMenuItem[] = [
  { value: 'dashboard', label: 'Dashboard', icon: <GlyphIcon d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z" /> },
  { value: 'transfers', label: 'Transfers', icon: <GlyphIcon d="M7 7h10l-3-3m3 13H7l3 3" /> },
  { value: 'accounts', label: 'Accounts', icon: <GlyphIcon d="M3 8h18M3 8v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8M3 8l2-3h14l2 3" /> },
  { value: 'reports', label: 'Reports', icon: <GlyphIcon d="M5 19V5m0 14h14M9 15v-4m4 4V9m4 6v-7" /> },
  { value: 'settings', label: 'Settings', icon: <GlyphIcon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3-2-1 1-2-2-2-2 1-1-2h-4l-1 2-2-1-2 2 1 2-2 1 2 1-1 2 2 2 2-1 1 2h4l1-2 2 1 2-2-1-2 2-1Z" />, disabled: true },
];

const NESTED_ITEMS: SidebarMenuItem[] = [
  { value: 'dashboard', label: 'Dashboard', icon: <GlyphIcon d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z" /> },
  {
    value: 'payments',
    label: 'Payments',
    icon: <GlyphIcon d="M3 8h18M3 8v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8M3 8l2-3h14l2 3" />,
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
      { value: 'bills', label: 'Bill payments' },
    ],
  },
  {
    value: 'reports',
    label: 'Reports',
    icon: <GlyphIcon d="M5 19V5m0 14h14M9 15v-4m4 4V9m4 6v-7" />,
    children: [
      { value: 'statements', label: 'Statements' },
      { value: 'reconciliation', label: 'Reconciliation' },
    ],
  },
  { value: 'settings', label: 'Settings', icon: <GlyphIcon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3-2-1 1-2-2-2-2 1-1-2h-4l-1 2-2-1-2 2 1 2-2 1 2 1-1 2 2 2 2-1 1 2h4l1-2 2 1 2-2-1-2 2-1Z" /> },
];

/** Sidebars are full-height; this wraps stories in a fixed viewport so the layout reads correctly. */
function Frame({ children }: { children: ReactNode }) {
  return <div style={{ height: 640, display: 'flex' }}>{children}</div>;
}

const meta = {
  title: 'Desktop UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  args: {
    items: SAMPLE_ITEMS,
    defaultActiveValue: 'dashboard',
    onActiveChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'Primary vertical navigation for desktop product shells. A brand header, a scrollable menu group with an active state (red left-border + tinted background), and an optional bottom "Minimize" control that collapses the sidebar to an icon rail. Items render as links (when `href` is set) or buttons.',
      },
    },
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    items: { control: false },
    logo: { control: false },
  },
  render: (args) => (
    <Frame>
      <Sidebar {...args} />
    </Frame>
  ),
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCollapseControl: Story = {
  args: { showCollapseControl: true },
};

export const Collapsed: Story = {
  args: { showCollapseControl: true, defaultCollapsed: true },
};

export const AsLinks: Story = {
  name: 'Items as links',
  args: {
    items: SAMPLE_ITEMS.map((it) => ({ ...it, href: `#${it.value}` })),
  },
};

export const Nested: Story = {
  name: 'Nested (parent → child → grandchild)',
  args: {
    items: NESTED_ITEMS,
    defaultActiveValue: 'single',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Items with `children` become expand/collapse groups. Ancestors of the active item auto-expand on mount. Arrow Left/Right collapse/expand the focused group; Up/Down move between visible items.',
      },
    },
  },
};

function CollapsibleStory() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('dashboard');
  return (
    <Frame>
      <Sidebar
        items={SAMPLE_ITEMS}
        activeValue={active}
        onActiveChange={setActive}
        showCollapseControl
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />
      <div style={{ padding: 24, fontFamily: 'monospace', fontSize: 13 }}>
        <p>active: {active}</p>
        <p>collapsed: {String(collapsed)}</p>
      </div>
    </Frame>
  );
}

export const Controlled: Story = {
  render: () => <CollapsibleStory />,
  parameters: { controls: { disable: true } },
};
