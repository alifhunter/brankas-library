import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fn } from 'storybook/test';
import { BottomNav } from './BottomNav';
import type { BottomNavIconProps, BottomNavItem } from './BottomNav.types';

const FIGMA_WITH_QRIS =
  'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=327-2669';
const FIGMA_WITHOUT_QRIS =
  'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=327-2680';

const placeholderIcon =
  (glyph: string) =>
  ({ color, size }: BottomNavIconProps) => (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: 0.18,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: size * 0.45,
          fontWeight: '700',
          color,
        }}
      >
        {glyph}
      </Text>
    </View>
  );

const qrisIcon =
  () =>
  ({ size }: BottomNavIconProps) => (
    <Text style={{ color: '#ffffff', fontSize: size * 0.32, fontWeight: '700', letterSpacing: 1 }}>
      QRIS
    </Text>
  );

const baseItems: BottomNavItem[] = [
  { key: 'home', label: 'Home', icon: placeholderIcon('H'), active: true },
  { key: 'history', label: 'History', icon: placeholderIcon('R') },
  { key: 'card', label: 'Card', icon: placeholderIcon('C') },
  { key: 'profile', label: 'Profile', icon: placeholderIcon('P') },
];

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider>
    <View
      style={{
        width: 360,
        backgroundColor: '#f6f9fe',
        padding: 24,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 360,
          backgroundColor: '#152433',
          height: 120,
          marginBottom: -24,
        }}
      />
      {children}
    </View>
  </SafeAreaProvider>
);

const meta = {
  title: 'Mobile UI/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Bottom tab navigation for mobile. Two layouts: with a floating QRIS button (4 or 2 side items) and without (3 / 4 / 5 evenly-spaced items). Each item accepts a render-prop icon `({ color, size }) => ReactNode` so callers can use any icon library while the bar controls active/inactive colour. Renders the `shadow.mobile.bottomNav` token and respects safe-area insets via `react-native-safe-area-context`.',
      },
    },
    design: { type: 'figma', url: FIGMA_WITH_QRIS },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithQris: Story = {
  args: {
    items: baseItems,
    qris: {
      icon: qrisIcon(),
      onPress: fn(),
      accessibilityLabel: 'Open QRIS',
    },
  },
};

export const TwoItemsWithQris: Story = {
  args: {
    items: baseItems.slice(0, 2),
    qris: {
      icon: qrisIcon(),
      onPress: fn(),
      accessibilityLabel: 'Open QRIS',
    },
  },
  parameters: { design: { type: 'figma', url: FIGMA_WITH_QRIS } },
};

export const WithoutQris: Story = {
  args: {
    items: baseItems,
  },
  parameters: { design: { type: 'figma', url: FIGMA_WITHOUT_QRIS } },
};

export const FiveItems: Story = {
  args: {
    items: [
      ...baseItems,
      { key: 'stats', label: 'Stats', icon: placeholderIcon('S') },
    ],
  },
  parameters: { design: { type: 'figma', url: FIGMA_WITHOUT_QRIS } },
};

export const ThreeItems: Story = {
  args: {
    items: baseItems.slice(0, 3),
  },
  parameters: { design: { type: 'figma', url: FIGMA_WITHOUT_QRIS } },
};

export const WithBadges: Story = {
  args: {
    items: [
      { key: 'home', label: 'Home', icon: placeholderIcon('H'), active: true },
      { key: 'history', label: 'History', icon: placeholderIcon('R'), badge: 3 },
      { key: 'card', label: 'Card', icon: placeholderIcon('C'), badge: 12 },
      { key: 'profile', label: 'Profile', icon: placeholderIcon('P') },
    ],
    qris: {
      icon: qrisIcon(),
      onPress: fn(),
    },
  },
};

function StatefulPattern() {
  const [active, setActive] = useState('home');
  const items: BottomNavItem[] = [
    { key: 'home', label: 'Home', icon: placeholderIcon('H') },
    { key: 'history', label: 'History', icon: placeholderIcon('R') },
    { key: 'card', label: 'Card', icon: placeholderIcon('C') },
    { key: 'profile', label: 'Profile', icon: placeholderIcon('P') },
  ].map((item) => ({
    ...item,
    active: active === item.key,
    onPress: () => setActive(item.key),
  }));
  return (
    <PhoneFrame>
      <BottomNav
        items={items}
        qris={{
          icon: qrisIcon(),
          onPress: () => setActive('qris'),
          accessibilityLabel: 'Open QRIS',
        }}
      />
      <Text style={{ marginTop: 16, fontFamily: 'monospace', fontSize: 12, color: '#475569' }}>
        Active: {active}
      </Text>
    </PhoneFrame>
  );
}

export const Stateful: Story = {
  name: 'Pattern · stateful active item',
  render: () => <StatefulPattern />,
  parameters: { controls: { disable: true } },
};
