import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Mobile UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { size: 'medium', tone: 'light' },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'User identifier. Three sizes (small 32, medium 48, large 64), two tones (light, dark). Renders an image source if provided, falls back to initials, then to a person icon. Initials are clipped to 2 characters and uppercased.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=71-3746',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const EmptyDark: Story = { args: { tone: 'dark' } };
export const Initials: Story = { args: { initials: 'UN' } };
export const InitialsDark: Story = { args: { initials: 'UN', tone: 'dark' } };
export const WithImage: Story = {
  args: {
    source: { uri: 'https://i.pravatar.cc/96?u=brankas' },
  },
};

export const SizeScale: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Avatar size="large" initials="UN" />
      <Avatar size="medium" initials="UN" />
      <Avatar size="small" initials="UN" />
    </View>
  ),
  parameters: { controls: { disable: true } },
};
