import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Mobile UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { onChange: fn() },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox for mobile. Supports controlled (`checked`) and uncontrolled (`defaultChecked`) modes plus `indeterminate`, `error`, and `disabled` states. Visual states mirror the desktop checkbox.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=91-17144',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = { args: { checked: false } };
export const Checked: Story = { args: { checked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Disabled: Story = { args: { checked: true, disabled: true } };
export const Error: Story = { args: { error: true, checked: false } };

function ControlledStory() {
  const [checked, setChecked] = useState(false);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Checkbox checked={checked} onChange={setChecked} />
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
        {checked ? 'Subscribed' : 'Subscribe to updates'}
      </Text>
    </View>
  );
}

export const Controlled: Story = {
  name: 'Pattern · controlled',
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};
