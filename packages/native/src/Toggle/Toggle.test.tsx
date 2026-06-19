import { fireEvent, render, screen } from '@testing-library/react-native';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('toggles uncontrolled', () => {
    const onValueChange = jest.fn();
    render(<Toggle defaultValue={false} onValueChange={onValueChange} accessibilityLabel="Notifications" />);
    fireEvent.press(screen.getByLabelText('Notifications'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('respects controlled value', () => {
    const onValueChange = jest.fn();
    render(<Toggle value={true} onValueChange={onValueChange} accessibilityLabel="Notifications" />);
    const node = screen.getByLabelText('Notifications');
    expect(node.props.accessibilityState).toMatchObject({ checked: true });
    fireEvent.press(node);
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it('does not fire when disabled', () => {
    const onValueChange = jest.fn();
    render(<Toggle disabled onValueChange={onValueChange} accessibilityLabel="Notifications" />);
    fireEvent.press(screen.getByLabelText('Notifications'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
