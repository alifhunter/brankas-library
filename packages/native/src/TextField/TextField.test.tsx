import { fireEvent, render, screen } from '@testing-library/react-native';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders the label as placeholder when empty', () => {
    render(<TextField label="Email" />);
    // The label is shown via native placeholder on the TextInput when empty.
    const input = screen.getByPlaceholderText('Email');
    expect(input).toBeTruthy();
  });

  it('floats the label to caption mode on focus (even with empty value)', () => {
    render(<TextField label="Email" />);
    const input = screen.getByPlaceholderText('Email');
    fireEvent(input, 'focus');
    // Now the floating Text caption renders the label
    expect(screen.getByText('Email')).toBeTruthy();
  });

  it('shows clear button when focused and typing', () => {
    render(<TextField label="Email" defaultValue="abc" />);
    const input = screen.getByDisplayValue('abc');
    expect(screen.queryByLabelText('Clear')).toBeNull();
    fireEvent(input, 'focus');
    expect(screen.getByLabelText('Clear')).toBeTruthy();
  });

  it('clear button resets the value', () => {
    const onChangeText = jest.fn();
    render(<TextField label="Email" defaultValue="abc" onChangeText={onChangeText} />);
    fireEvent(screen.getByDisplayValue('abc'), 'focus');
    fireEvent.press(screen.getByLabelText('Clear'));
    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('does not show clear when clearable=false', () => {
    render(<TextField label="Email" defaultValue="abc" clearable={false} />);
    fireEvent(screen.getByDisplayValue('abc'), 'focus');
    expect(screen.queryByLabelText('Clear')).toBeNull();
  });

  it('reports controlled value changes', () => {
    const onChangeText = jest.fn();
    render(<TextField label="Email" value="hello" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByDisplayValue('hello'), 'world');
    expect(onChangeText).toHaveBeenCalledWith('world');
  });

  it('renders error message', () => {
    render(<TextField label="Email" error="Invalid" />);
    expect(screen.getByText('Invalid')).toBeTruthy();
  });

  it('disables editing when disabled', () => {
    render(<TextField label="Email" defaultValue="locked" disabled />);
    expect(screen.getByDisplayValue('locked').props.editable).toBe(false);
  });

  it('renders the prefix when value is present', () => {
    render(<TextField label="Amount" defaultValue="2.000.000" prefix="Rp " />);
    expect(screen.getByText('Rp')).toBeTruthy();
  });
});
