import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Mobile UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { label: 'New', variant: 'solid' },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact status / count marker. Four variants: `solid` and `outline` for labelled badges, `dot` and `ring` for minimal notification indicators. Strings render as a pill, numbers render as a compact circle.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=80-43489',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewSolid: Story = { args: { label: 'New', variant: 'solid' } };
export const NewOutline: Story = { args: { label: 'New', variant: 'outline' } };
export const CountSolid: Story = { args: { label: 3, variant: 'solid' } };
export const CountOutline: Story = { args: { label: 3, variant: 'outline' } };
export const Dot: Story = { args: { variant: 'dot' } };
export const Ring: Story = { args: { variant: 'ring' } };

export const Gallery: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Badge label="New" variant="solid" />
      <Badge label="New" variant="outline" />
      <Badge label={3} variant="solid" />
      <Badge label={3} variant="outline" />
      <Badge variant="dot" />
      <Badge variant="ring" />
    </View>
  ),
  parameters: { controls: { disable: true } },
};
