import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CurveBackground } from './CurveBackground';

const meta = {
  title: 'Mobile UI/CurveBackground',
  component: CurveBackground,
  tags: ['autodocs'],
  args: { height: 180, curveDepth: 28, direction: 'down' },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Decorative SVG background with a smooth curved edge. Use behind dashboard headers or hero sections. Defaults to the primary-blue token and curves downward; flip via `direction="up"` for a rising-from-below shape (e.g. a panel slot).',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=246-24886',
    },
  },
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
} satisfies Meta<typeof CurveBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { height: 160 },
};

export const WithContent: Story = {
  args: { height: 160, curveDepth: 32 },
  render: (args) => (
    <CurveBackground {...args}>
      <View style={{ padding: 24, gap: 6 }}>
        <Text style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
          Good morning
        </Text>
        <Text
          style={{
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '700',
            fontSize: 24,
          }}
        >
          IDR 18,420,000
        </Text>
      </View>
    </CurveBackground>
  ),
  parameters: { controls: { disable: true } },
};

export const Upward: Story = {
  args: { height: 120, curveDepth: 24, direction: 'up' },
  render: (args) => <CurveBackground {...args} />,
};
