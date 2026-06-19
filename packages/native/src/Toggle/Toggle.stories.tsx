import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Toggle } from './Toggle';

const meta = {
  title: 'Mobile UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { onValueChange: fn() },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Boolean switch. Controlled (`value`) or uncontrolled (`defaultValue`). Reports state via `role="switch"` + `accessibilityState.checked`.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=91-24806',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = { args: { value: false } };
export const On: Story = { args: { value: true } };
export const DisabledOff: Story = { args: { value: false, disabled: true } };
export const DisabledOn: Story = { args: { value: true, disabled: true } };

function ControlledStory() {
  const [on, setOn] = useState(false);
  return (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Toggle value={on} onValueChange={setOn} />
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
        Notifications {on ? 'on' : 'off'}
      </Text>
    </View>
  );
}

export const Controlled: Story = {
  name: 'Pattern · controlled',
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};
