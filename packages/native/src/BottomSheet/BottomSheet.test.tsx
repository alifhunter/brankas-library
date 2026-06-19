import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { BottomSheet } from './BottomSheet';

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 360, height: 800 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>{ui}</GestureHandlerRootView>
    </SafeAreaProvider>,
  );

describe('BottomSheet', () => {
  it('does not render when closed', () => {
    renderWithProviders(
      <BottomSheet open={false} onDismiss={jest.fn()} title="Title" />,
    );
    expect(screen.queryByText('Title')).toBeNull();
  });

  it('renders title and supporting text', () => {
    renderWithProviders(
      <BottomSheet
        open
        onDismiss={jest.fn()}
        title="Title"
        supportingText="Hello world"
      />,
    );
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Hello world')).toBeTruthy();
  });

  it('renders children + footer', () => {
    renderWithProviders(
      <BottomSheet
        open
        onDismiss={jest.fn()}
        title="Body"
        footer={<Text>Continue</Text>}
      >
        <Text>Body content</Text>
      </BottomSheet>,
    );
    expect(screen.getByText('Body content')).toBeTruthy();
    expect(screen.getByText('Continue')).toBeTruthy();
  });

  it('dismisses via backdrop press', () => {
    const onDismiss = jest.fn();
    renderWithProviders(
      <BottomSheet open onDismiss={onDismiss} title="Tap backdrop" />,
    );
    fireEvent.press(screen.getByLabelText('Dismiss overlay'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not dismiss when dismissOnBackdropPress is false', () => {
    const onDismiss = jest.fn();
    renderWithProviders(
      <BottomSheet
        open
        onDismiss={onDismiss}
        title="Locked"
        dismissOnBackdropPress={false}
      />,
    );
    fireEvent.press(screen.getByLabelText('Dismiss overlay'));
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('marks title as accessibility header', () => {
    renderWithProviders(<BottomSheet open onDismiss={jest.fn()} title="Title" />);
    const titleNode = screen.getByText('Title');
    expect(titleNode.props.accessibilityRole).toBe('header');
  });
});
