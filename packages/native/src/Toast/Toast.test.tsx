import { fireEvent, render, screen } from '@testing-library/react-native';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders the message', () => {
    render(<Toast>Saved</Toast>);
    expect(screen.getByText('Saved')).toBeTruthy();
  });

  it('fires onDismiss when close pressed', () => {
    const onDismiss = jest.fn();
    render(<Toast onDismiss={onDismiss}>Saved</Toast>);
    fireEvent.press(screen.getByLabelText('Dismiss toast'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render a close when no onDismiss', () => {
    render(<Toast>Saved</Toast>);
    expect(screen.queryByLabelText('Dismiss toast')).toBeNull();
  });
});
