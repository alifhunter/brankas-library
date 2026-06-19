import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TextArea } from './TextArea';

const meta = {
  title: 'Mobile UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: { label: 'Title', rows: 4, onChangeText: fn() },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Multi-line input. Same floating-label paradigm as TextField — the label sits as the placeholder when empty/unfocused, and shrinks to a small caption at the top of the field once focused or filled. Filled `background.cool-light`, no border (red border only when `error` is set), 8px radius, 20×12 padding. Optional `hint` and `maxLength` + `showCount` for the inline `X/Y` counter.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=312-3034',
    },
  },
  decorators: [(Story) => <View style={{ width: 328 }}><Story /></View>],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = {
  args: { defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
};
export const Counter: Story = {
  args: { maxLength: 600, showCount: true, defaultValue: 'Hello' },
};
export const Error: Story = {
  args: { defaultValue: 'Too short', error: 'Text Body Small' },
};
export const ErrorEmpty: Story = { args: { error: 'Text Body Small' } };
export const Disabled: Story = {
  args: { defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', disabled: true },
};
export const WithHint: Story = { args: { hint: 'Text Body Small' } };

function ControlledStory() {
  const [v, setV] = useState('');
  return (
    <TextArea
      label="Feedback"
      value={v}
      onChangeText={setV}
      maxLength={140}
      showCount
      rows={5}
    />
  );
}

export const Controlled: Story = {
  name: 'Pattern · controlled with counter',
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};

export const Matrix: Story = {
  name: 'Pattern · state matrix',
  render: () => (
    <View style={{ width: 328, gap: 16 }}>
      <TextArea label="Default" />
      <TextArea label="Filled" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
      <TextArea label="Counter" defaultValue="Hello" maxLength={600} showCount />
      <TextArea label="Disabled" defaultValue="Lorem ipsum dolor sit amet." disabled />
      <TextArea label="Error" defaultValue="Lorem ipsum dolor sit amet." error="Text Body Small" />
    </View>
  ),
  parameters: { controls: { disable: true } },
};
