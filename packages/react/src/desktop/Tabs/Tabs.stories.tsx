import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Tabs } from './Tabs';
import type { TabItem, TabsType } from './Tabs.types';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=100-14169';

const SAMPLE_ITEMS: TabItem[] = [
  { value: 'overview', label: 'Overview', panel: <PanelBody title="Overview" /> },
  { value: 'activity', label: 'Activity', badge: 9, panel: <PanelBody title="Activity" /> },
  { value: 'documents', label: 'Documents', badge: 3, panel: <PanelBody title="Documents" /> },
  { value: 'settings', label: 'Settings', panel: <PanelBody title="Settings" /> },
  { value: 'archived', label: 'Archived', disabled: true, panel: <PanelBody title="Archived" /> },
];

function PanelBody({ title }: { title: string }) {
  return (
    <div
      style={{
        padding: 24,
        background: 'var(--color-background-subtlest, #f7f7f7)',
        borderRadius: 12,
        minHeight: 120,
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'var(--brankas-typography-desktop-body-lg-medium-font-family)',
        fontSize: 'var(--brankas-typography-desktop-body-lg-medium-font-size)',
        fontWeight: 'var(--brankas-typography-desktop-body-lg-medium-font-weight)',
        lineHeight: 'var(--brankas-typography-desktop-body-lg-medium-line-height)',
        color: 'var(--color-text-default)',
      }}
    >
      {title} panel content
    </div>
  );
}

const meta = {
  title: 'Desktop UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    type: 'horizontal',
    items: SAMPLE_ITEMS,
    defaultValue: 'overview',
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Switch between related sections at the same hierarchy level. Three layouts (horizontal, vertical, chips) with optional badges, disabled states, and full WAI-ARIA keyboard navigation. Inactive panels stay mounted (hidden) to preserve state.',
      },
    },
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical', 'chips'] satisfies TabsType[],
    },
    items: { control: false },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { type: 'vertical' },
};

export const Chips: Story = {
  args: { type: 'chips' },
};

export const WithoutBadges: Story = {
  args: {
    items: [
      { value: 'a', label: 'Tab A', panel: <PanelBody title="Tab A" /> },
      { value: 'b', label: 'Tab B', panel: <PanelBody title="Tab B" /> },
      { value: 'c', label: 'Tab C', panel: <PanelBody title="Tab C" /> },
    ],
  },
};

export const StripOnly: Story = {
  name: 'Tab strip only (no panels)',
  args: {
    items: [
      { value: 'all', label: 'All', badge: 42 },
      { value: 'open', label: 'Open', badge: 12 },
      { value: 'closed', label: 'Closed' },
      { value: 'flagged', label: 'Flagged', disabled: true },
    ],
  },
};

function ControlledStory() {
  const [value, setValue] = useState('activity');
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <output style={{ fontFamily: 'monospace', fontSize: 13 }}>active: {value}</output>
      <Tabs items={SAMPLE_ITEMS} value={value} onValueChange={setValue} />
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};

export const AllTypes: Story = {
  name: 'Pattern · All three types side-by-side',
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <section style={{ display: 'grid', gap: 8 }}>
        <strong>Horizontal</strong>
        <Tabs type="horizontal" items={SAMPLE_ITEMS} />
      </section>
      <section style={{ display: 'grid', gap: 8 }}>
        <strong>Chips</strong>
        <Tabs type="chips" items={SAMPLE_ITEMS} />
      </section>
      <section style={{ display: 'grid', gap: 8 }}>
        <strong>Vertical</strong>
        <Tabs type="vertical" items={SAMPLE_ITEMS.map((it) => ({ ...it }))} />
      </section>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
