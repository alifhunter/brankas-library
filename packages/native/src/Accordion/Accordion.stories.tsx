import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Accordion } from './Accordion';

const meta = {
  title: 'Mobile UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    title: 'Title',
    children: (
      <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#475569' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
    ),
    onOpenChange: fn(),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Disclosure panel. Tap the header to expand/collapse. Controlled (`open`) or uncontrolled (`defaultOpen`). Optional `leadingIcon` slot for a glyph next to the title.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=386-18872',
    },
  },
  decorators: [(Story) => <View style={{ width: 320 }}><Story /></View>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = { args: { defaultOpen: false } };
export const Open: Story = { args: { defaultOpen: true } };
export const Disabled: Story = { args: { defaultOpen: false, disabled: true } };

function ControlledStory() {
  const [open, setOpen] = useState(false);
  return (
    <Accordion
      title="Controlled"
      open={open}
      onOpenChange={setOpen}
    >
      <Text style={{ fontFamily: 'Inter, sans-serif', color: '#475569' }}>
        Body content goes here.
      </Text>
    </Accordion>
  );
}

export const Controlled: Story = {
  name: 'Pattern · controlled',
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};
