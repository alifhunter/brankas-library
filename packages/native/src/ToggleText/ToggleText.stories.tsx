import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ToggleText } from './ToggleText';
import type { ToggleTextSide } from './ToggleText.types';

const meta = {
  title: 'Mobile UI/ToggleText',
  component: ToggleText,
  tags: ['autodocs'],
  args: {
    leftLabel: 'ID',
    rightLabel: 'EN',
    defaultValue: 'left',
    onValueChange: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Two-option text switch (60×32). A solid pill thumb slides between the two labels; the label *under* the thumb appears in the inverse tone, the label outside stays in the container colour. Use `tone="black"` on light surfaces and `tone="white"` on dark surfaces.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=91-17118',
    },
  },
} satisfies Meta<typeof ToggleText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlackLeft: Story = { args: { tone: 'black', defaultValue: 'left' } };
export const BlackRight: Story = { args: { tone: 'black', defaultValue: 'right' } };
export const WhiteLeft: Story = {
  args: { tone: 'white', defaultValue: 'left' },
  decorators: [(Story) => (
    <View style={{ backgroundColor: '#152433', padding: 24, borderRadius: 12 }}>
      <Story />
    </View>
  )],
};
export const WhiteRight: Story = {
  args: { tone: 'white', defaultValue: 'right' },
  decorators: [(Story) => (
    <View style={{ backgroundColor: '#152433', padding: 24, borderRadius: 12 }}>
      <Story />
    </View>
  )],
};
export const Disabled: Story = { args: { disabled: true } };

function ControlledStory() {
  const [locale, setLocale] = useState<ToggleTextSide>('left');
  return (
    <View style={{ alignItems: 'center', gap: 12 }}>
      <ToggleText leftLabel="ID" rightLabel="EN" value={locale} onValueChange={setLocale} />
      <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>Locale: {locale === 'left' ? 'id' : 'en'}</Text>
    </View>
  );
}

export const Controlled: Story = {
  name: 'Pattern · controlled',
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};

export const Matrix: Story = {
  name: 'Pattern · matrix',
  render: () => (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <ToggleText leftLabel="ID" rightLabel="EN" tone="black" defaultValue="left" />
        <ToggleText leftLabel="ID" rightLabel="EN" tone="black" defaultValue="right" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#152433',
          borderRadius: 12,
        }}
      >
        <ToggleText leftLabel="ID" rightLabel="EN" tone="white" defaultValue="left" />
        <ToggleText leftLabel="ID" rightLabel="EN" tone="white" defaultValue="right" />
      </View>
    </View>
  ),
  parameters: { controls: { disable: true } },
};
