import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { BottomNav } from './BottomNav';
import type { BottomNavItem, BottomNavIconProps } from './BottomNav.types';

const renderWithProvider = (ui: React.ReactNode) =>
  render(<SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 360, height: 800 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>{ui}</SafeAreaProvider>);

const stubIcon = (key: string) => (props: BottomNavIconProps) => (
  <Text testID={`icon-${key}`} style={{ color: props.color, fontSize: props.size }} />
);

const sampleItems = (overrides: Partial<BottomNavItem>[] = []): BottomNavItem[] =>
  ['Home', 'History', 'Card', 'Profile'].map((label, i) => ({
    key: label.toLowerCase(),
    label,
    icon: stubIcon(label),
    onPress: jest.fn(),
    ...overrides[i],
  }));

describe('BottomNav', () => {
  it('renders all items without QRIS', () => {
    const items = sampleItems().slice(0, 4);
    renderWithProvider(<BottomNav items={items} />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('History')).toBeTruthy();
    expect(screen.getByText('Card')).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
  });

  it('calls onPress for tapped item', () => {
    const onPress = jest.fn();
    const items = sampleItems([{ onPress }]);
    renderWithProvider(<BottomNav items={items} />);
    fireEvent.press(screen.getByText('Home'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('marks active item with accessibilityState.selected', () => {
    const items = sampleItems([{ active: true }]);
    renderWithProvider(<BottomNav items={items} />);
    const homeItem = screen.getByLabelText('Home');
    expect(homeItem.props.accessibilityState).toMatchObject({ selected: true });
  });

  it('renders badge when provided', () => {
    const items = sampleItems([{ badge: 3 }]);
    renderWithProvider(<BottomNav items={items} />);
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('renders QRIS button when qris prop provided', () => {
    const qrisPress = jest.fn();
    renderWithProvider(
      <BottomNav
        items={sampleItems().slice(0, 4)}
        qris={{ icon: stubIcon('QRIS'), onPress: qrisPress, accessibilityLabel: 'Open QRIS' }}
      />,
    );
    const qrisBtn = screen.getByLabelText('Open QRIS');
    fireEvent.press(qrisBtn);
    expect(qrisPress).toHaveBeenCalledTimes(1);
  });

  it('splits items evenly around QRIS', () => {
    const items = sampleItems().slice(0, 4);
    renderWithProvider(
      <BottomNav items={items} qris={{ icon: stubIcon('QRIS') }} />,
    );
    expect(screen.getAllByRole('tab')).toHaveLength(4);
    expect(screen.getByLabelText('QRIS')).toBeTruthy();
  });

  it('supports 2 side items with QRIS (3 total slots)', () => {
    const items = sampleItems().slice(0, 2);
    renderWithProvider(
      <BottomNav items={items} qris={{ icon: stubIcon('QRIS') }} />,
    );
    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('supports 5 items without QRIS', () => {
    const items: BottomNavItem[] = ['Home', 'History', 'Card', 'Stats', 'Profile'].map((label) => ({
      key: label.toLowerCase(),
      label,
      icon: stubIcon(label),
    }));
    renderWithProvider(<BottomNav items={items} />);
    expect(screen.getAllByRole('tab')).toHaveLength(5);
  });
});
