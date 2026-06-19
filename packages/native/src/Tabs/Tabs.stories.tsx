import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Tabs } from './Tabs';

const OPTIONS = [
  { value: 'savings', label: 'Savings & Current' },
  { value: 'credit', label: 'Credit Card' },
] as const;

const meta = {
  title: 'Mobile UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    options: OPTIONS,
    defaultValue: 'savings',
    onValueChange: fn(),
    tone: 'light',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Top-level page tabs: text + underline. Designed for use over a coloured brand surface (the red curve header). Use `tone="dark"` for a plain white background.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LoMc1DCcDLBmafSJsZEkkk/Simobi-Design-System?node-id=277-9776',
    },
  },
  decorators: [(Story) => (
    <View style={{ width: 360, backgroundColor: '#c10e0e', padding: 24 }}>
      <Story />
    </View>
  )],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
  args: { tone: 'dark' },
  decorators: [(Story) => (
    <View style={{ width: 360, backgroundColor: '#ffffff', padding: 24 }}>
      <Story />
    </View>
  )],
};

export const Three: Story = {
  args: {
    options: [
      { value: 'savings', label: 'Savings & Current' },
      { value: 'credit', label: 'Credit Card' },
      { value: 'loan', label: 'Loan' },
    ],
  },
};

function ControlledStory() {
  const [tab, setTab] = useState<'savings' | 'credit'>('savings');
  return (
    <View style={{ backgroundColor: '#c10e0e', padding: 24, gap: 16 }}>
      <Tabs options={OPTIONS} value={tab} onValueChange={setTab} />
      <Text style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: 12 }}>
        Active: {tab}
      </Text>
    </View>
  );
}

export const Controlled: Story = {
  name: 'Pattern · controlled',
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};
