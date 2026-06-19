import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionBanner } from './SectionBanner';

const meta = {
  title: 'Mobile UI/SectionBanner',
  component: SectionBanner,
  tags: ['autodocs'],
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.',
    tone: 'info',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Lightweight inline banner for in-context messaging — no title, no actions, just a tone-coloured icon and body text. Three tones: `info`, `warning`, `error`. For dismissible / actionable announcements, use `AnnouncementBanner`.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=188-1381',
    },
  },
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
} satisfies Meta<typeof SectionBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { tone: 'info' } };
export const Warning: Story = { args: { tone: 'warning' } };
export const Error: Story = { args: { tone: 'error' } };

export const Gallery: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SectionBanner tone="info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </SectionBanner>
      <SectionBanner tone="warning">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </SectionBanner>
      <SectionBanner tone="error">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </SectionBanner>
    </View>
  ),
  parameters: { controls: { disable: true } },
};
