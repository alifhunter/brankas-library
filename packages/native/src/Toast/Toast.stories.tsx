import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Toast } from './Toast';

const meta = {
  title: 'Mobile UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { children: 'Body Medium' },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact notification pill. Visual primitive only — render via a portal / safe-area anchor of your choice, or pair with a queue manager. Pass `onDismiss` to surface the close button.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=124-13294',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Dismissible: Story = {
  args: { children: 'Body Medium', onDismiss: fn() },
};
export const Stack: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Toast>Saved successfully</Toast>
      <Toast onDismiss={() => undefined}>Couldn’t sync. Tap to retry.</Toast>
    </View>
  ),
  parameters: { controls: { disable: true } },
};
