import { fireEvent, render, screen } from '@testing-library/react-native';
import { ToggleText } from './ToggleText';

describe('ToggleText', () => {
  it('renders both labels', () => {
    render(<ToggleText leftLabel="ID" rightLabel="EN" defaultValue="left" />);
    // Each label appears twice (once outside, once inside the thumb on the active side)
    expect(screen.getAllByText('ID').length).toBeGreaterThan(0);
    expect(screen.getAllByText('EN').length).toBeGreaterThan(0);
  });

  it('toggles to the opposite side on press (uncontrolled)', () => {
    const onValueChange = jest.fn();
    render(
      <ToggleText
        leftLabel="ID"
        rightLabel="EN"
        defaultValue="left"
        onValueChange={onValueChange}
      />,
    );
    fireEvent.press(screen.getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith('right');
  });

  it('respects controlled value', () => {
    const onValueChange = jest.fn();
    render(
      <ToggleText
        leftLabel="ID"
        rightLabel="EN"
        value="right"
        onValueChange={onValueChange}
      />,
    );
    const node = screen.getByRole('switch');
    expect(node.props.accessibilityState).toMatchObject({ checked: true });
    fireEvent.press(node);
    expect(onValueChange).toHaveBeenCalledWith('left');
  });

  it('does not fire when disabled', () => {
    const onValueChange = jest.fn();
    render(
      <ToggleText
        leftLabel="ID"
        rightLabel="EN"
        defaultValue="left"
        onValueChange={onValueChange}
        disabled
      />,
    );
    fireEvent.press(screen.getByRole('switch'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
