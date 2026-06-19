import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Tooltip } from './Tooltip';
import type { TooltipPosition } from './Tooltip.types';

const meta = {
  title: 'Mobile UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    text: 'Text here.',
    position: 'top',
    trigger: 'longPress',
    onVisibilityChange: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Floating bubble that anchors to a trigger via a small triangular tail. Wrap a single child element — the tooltip wraps it in a Pressable and renders the bubble as an absolutely-positioned sibling.\n\n**Triggers:**\n- `longPress` (default) — show on long-press, dismiss on next tap.\n- `press` — toggle on each tap.\n- `manual` — controlled solely by the `visible` prop.\n\n**Positioning:** four sides (`top`, `bottom`, `left`, `right`). The tooltip is bound to the trigger\'s parent View; it can\'t escape parent overflow.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=194-21070',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 64, alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const Anchor = ({ label = 'Long-press me' }: { label?: string }) => (
  <View
    style={{
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: '#f6f9fe',
      borderWidth: 1,
      borderColor: '#d8e7f7',
      borderRadius: 8,
    }}
  >
    <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#0f172a' }}>
      {label}
    </Text>
  </View>
);

export const Top: Story = {
  args: { position: 'top', trigger: 'manual', visible: true },
  render: (args) => (
    <Tooltip {...args}>
      <Anchor label="Trigger" />
    </Tooltip>
  ),
};
export const Bottom: Story = {
  args: { position: 'bottom', trigger: 'manual', visible: true },
  render: (args) => (
    <Tooltip {...args}>
      <Anchor label="Trigger" />
    </Tooltip>
  ),
};
export const Left: Story = {
  args: { position: 'left', trigger: 'manual', visible: true },
  render: (args) => (
    <Tooltip {...args}>
      <Anchor label="Trigger" />
    </Tooltip>
  ),
};
export const Right: Story = {
  args: { position: 'right', trigger: 'manual', visible: true },
  render: (args) => (
    <Tooltip {...args}>
      <Anchor label="Trigger" />
    </Tooltip>
  ),
};

export const LongerText: Story = {
  args: {
    text: 'This is a longer tooltip that wraps onto multiple lines once the content exceeds the 250 px max-width.',
    position: 'top',
    trigger: 'manual',
    visible: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Anchor label="Trigger" />
    </Tooltip>
  ),
};

function LongPressStory() {
  const [count, setCount] = useState(0);
  return (
    <View style={{ alignItems: 'center', gap: 24 }}>
      <Tooltip text="Long-press to reveal · tap to dismiss" position="top">
        <Anchor label={count === 0 ? 'Long-press me' : `Shown ${count}×`} />
      </Tooltip>
      <Pressable
        onPress={() => setCount((c) => c + 1)}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderWidth: 1,
          borderColor: '#cbd5e1',
          borderRadius: 8,
        }}
      >
        <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>increment counter</Text>
      </Pressable>
    </View>
  );
}

export const LongPress: Story = {
  name: 'Pattern · long-press',
  render: () => <LongPressStory />,
  parameters: { controls: { disable: true } },
};

export const Matrix: Story = {
  name: 'Pattern · position matrix',
  render: () => (
    <View style={{ gap: 64, alignItems: 'center' }}>
      {(['top', 'bottom', 'left', 'right'] as TooltipPosition[]).map((p) => (
        <Tooltip key={p} text={`Text here. (${p})`} position={p} trigger="manual" visible>
          <Anchor label={p} />
        </Tooltip>
      ))}
    </View>
  ),
  parameters: { controls: { disable: true } },
};
