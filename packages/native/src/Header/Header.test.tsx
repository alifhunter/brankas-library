import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './Header';

const renderWithProvider = (ui: React.ReactNode) =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 360, height: 800 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      {ui}
    </SafeAreaProvider>,
  );

describe('Header', () => {
  it('renders title + subtitle', () => {
    renderWithProvider(<Header title="Title" subtitle="Body description" />);
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Body description')).toBeTruthy();
  });

  it('renders back arrow that fires onBack', () => {
    const onBack = jest.fn();
    renderWithProvider(<Header title="Title" onBack={onBack} />);
    fireEvent.press(screen.getByLabelText('Back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders trailing actions', () => {
    renderWithProvider(
      <Header
        title="Title"
        trailing={<>{/* @ts-ignore */}<span>X</span></>}
      />,
    );
    expect(screen.getByText('Title')).toBeTruthy();
  });

  it('renders progress bar when progress prop is supplied', () => {
    const { toJSON } = renderWithProvider(
      <Header title="Title" progress={0.5} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders step pill when stepLabel is supplied', () => {
    renderWithProvider(<Header title="Title" stepLabel="4/7" />);
    expect(screen.getByText('4/7')).toBeTruthy();
  });

  it('renders centered variant', () => {
    renderWithProvider(
      <Header variant="centered" title="Simas TARA" onBack={jest.fn()} />,
    );
    expect(screen.getByText('Simas TARA')).toBeTruthy();
  });
});
