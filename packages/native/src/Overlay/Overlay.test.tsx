import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Overlay } from './Overlay';

describe('Overlay', () => {
  it('does not render content when closed', () => {
    render(
      <Overlay open={false}>
        <Text>Hidden</Text>
      </Overlay>,
    );
    expect(screen.queryByText('Hidden')).toBeNull();
  });

  it('renders children when open', () => {
    render(
      <Overlay open>
        <Text>Visible</Text>
      </Overlay>,
    );
    expect(screen.getByText('Visible')).toBeTruthy();
  });

  it('calls onDismiss when backdrop is pressed', () => {
    const onDismiss = jest.fn();
    render(
      <Overlay open onDismiss={onDismiss}>
        <Text>Content</Text>
      </Overlay>,
    );
    fireEvent.press(screen.getByLabelText('Dismiss overlay'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not call onDismiss when dismissOnBackdropPress is false', () => {
    const onDismiss = jest.fn();
    render(
      <Overlay open onDismiss={onDismiss} dismissOnBackdropPress={false}>
        <Text>Content</Text>
      </Overlay>,
    );
    fireEvent.press(screen.getByLabelText('Dismiss overlay'));
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
