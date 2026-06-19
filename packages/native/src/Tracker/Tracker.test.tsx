import { fireEvent, render, screen } from '@testing-library/react-native';
import { Tracker } from './Tracker';
import type { TrackerStep } from './Tracker.types';

const STEPS: TrackerStep[] = [
  { key: '1', label: 'A', status: 'completed' },
  { key: '2', label: 'B', supportingText: 'sub', status: 'active' },
  { key: '3', label: 'C', status: 'pending' },
];

describe('Tracker', () => {
  it('renders each step label', () => {
    render(<Tracker steps={STEPS} />);
    expect(screen.getByText('A')).toBeTruthy();
    expect(screen.getByText('B')).toBeTruthy();
    expect(screen.getByText('C')).toBeTruthy();
    expect(screen.getByText('sub')).toBeTruthy();
  });

  it('fires onPress for tappable steps', () => {
    const onPress = jest.fn();
    const steps = STEPS.map((s, i) =>
      i === 0 ? ({ ...s, onPress } as TrackerStep) : s,
    );
    render(<Tracker steps={steps} />);
    fireEvent.press(screen.getByText('A'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders both sizes without crashing', () => {
    for (const size of ['medium', 'large'] as const) {
      const { unmount } = render(<Tracker steps={STEPS} size={size} />);
      expect(screen.getByText('A')).toBeTruthy();
      unmount();
    }
  });
});
