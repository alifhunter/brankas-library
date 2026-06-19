import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('does not render when closed', () => {
    render(<Dialog open={false} onDismiss={jest.fn()} title="Hi" />);
    expect(screen.queryByText('Hi')).toBeNull();
  });

  it('renders title + description + children + footer', () => {
    render(
      <Dialog
        open
        onDismiss={jest.fn()}
        title="Title"
        description="Body"
        footer={<Text>Continue</Text>}
      >
        <Text>Inner</Text>
      </Dialog>,
    );
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
    expect(screen.getByText('Inner')).toBeTruthy();
    expect(screen.getByText('Continue')).toBeTruthy();
  });

  it('dismisses via backdrop press', () => {
    const onDismiss = jest.fn();
    render(<Dialog open onDismiss={onDismiss} title="Hi" />);
    fireEvent.press(screen.getByLabelText('Dismiss overlay'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
