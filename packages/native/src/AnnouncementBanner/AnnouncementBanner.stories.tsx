import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { AnnouncementBanner } from './AnnouncementBanner';

const meta = {
  title: 'Mobile UI/AnnouncementBanner',
  component: AnnouncementBanner,
  tags: ['autodocs'],
  args: {
    title: 'Banner title',
    description: 'This is description of the message. It should be explanatory but concise.',
    variant: 'dark',
    onDismiss: fn(),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Dismissible announcement bar. Two visual variants (`dark` over light content, `light` over white screens), optional `action` link, optional `onDismiss` for the X close. Use for time-sensitive notices — for in-line context messaging without close/action, prefer `SectionBanner`.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=189-3915',
    },
  },
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
} satisfies Meta<typeof AnnouncementBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = { args: { variant: 'dark' } };
export const Light: Story = { args: { variant: 'light' } };
export const WithAction: Story = {
  args: {
    variant: 'light',
    action: { label: 'Link action', onPress: fn() },
  },
};
export const TitleOnly: Story = {
  args: {
    title: 'Maintenance scheduled for tonight',
    description: undefined,
  },
};
