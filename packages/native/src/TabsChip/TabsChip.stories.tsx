import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TabsChip } from './TabsChip';
import { Tabs } from '../Tabs/Tabs';

/* Tiny coloured circles standing in for currency flags / icons. Real apps
 * pass actual flag SVGs or images. */
const FlagDot = ({ color }: { color: string }) => (
  <View
    style={{
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: color,
      borderWidth: 2,
      borderColor: '#efefef',
    }}
  />
);

const FLAG_OPTIONS = [
  { value: 'idr', label: 'IDR', icon: <FlagDot color="#e70000" /> },
  { value: 'usd', label: 'USD', icon: <FlagDot color="#3c3b6e" /> },
  { value: 'cny', label: 'CNY', icon: <FlagDot color="#de2910" /> },
  { value: 'sgd', label: 'SGD', icon: <FlagDot color="#ef3340" /> },
] as const;

const TEXT_OPTIONS = [
  { value: 'idr', label: 'IDR' },
  { value: 'usd', label: 'USD' },
  { value: 'cny', label: 'CNY' },
] as const;

const meta = {
  title: 'Mobile UI/TabsChip',
  component: TabsChip,
  tags: ['autodocs'],
  args: {
    options: FLAG_OPTIONS,
    defaultValue: 'idr',
    onValueChange: fn(),
    tone: 'light',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Secondary pill tabs. Each chip is a 40h rounded pill with optional leading `icon` slot (a flag, currency mark, or any ReactNode). Active chip is solid white over coloured surfaces (or solid navy over white). Horizontally scrollable by default.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LoMc1DCcDLBmafSJsZEkkk/Simobi-Design-System?node-id=267-3729',
    },
  },
  decorators: [(Story) => (
    <View style={{ width: 360, backgroundColor: '#c10e0e', padding: 24 }}>
      <Story />
    </View>
  )],
} satisfies Meta<typeof TabsChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightWithFlags: Story = {};

export const LightTextOnly: Story = {
  args: { options: TEXT_OPTIONS },
};

export const Dark: Story = {
  args: { options: FLAG_OPTIONS, tone: 'dark' },
  decorators: [(Story) => (
    <View style={{ width: 360, backgroundColor: '#ffffff', padding: 24 }}>
      <Story />
    </View>
  )],
};

function CompositionStory() {
  const [section, setSection] = useState<'savings' | 'credit'>('savings');
  const [currency, setCurrency] = useState<string>('idr');
  return (
    <View style={{ backgroundColor: '#c10e0e', padding: 24, gap: 24 }}>
      <Tabs
        options={[
          { value: 'savings', label: 'Savings & Current' },
          { value: 'credit', label: 'Credit Card' },
        ]}
        value={section}
        onValueChange={setSection}
      />
      <TabsChip options={FLAG_OPTIONS} value={currency} onValueChange={setCurrency} />
      <Text style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: 12 }}>
        {section} · {currency}
      </Text>
    </View>
  );
}

export const Composition: Story = {
  name: 'Pattern · Tabs + TabsChip (use case)',
  render: () => <CompositionStory />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'The reference use case from the design file: top-level `Tabs` for the section (Savings vs Credit) and a `TabsChip` row below for the currency filter. Both render cleanly over the brand red surface.',
      },
    },
  },
};
