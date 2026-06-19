import { fireEvent, render, screen } from '@testing-library/react-native';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('renders the label as placeholder when empty', () => {
    render(<TextArea label="Notes" />);
    expect(screen.getByPlaceholderText('Notes')).toBeTruthy();
  });

  it('floats the label on focus', () => {
    render(<TextArea label="Notes" />);
    fireEvent(screen.getByPlaceholderText('Notes'), 'focus');
    expect(screen.getByText('Notes')).toBeTruthy();
  });

  it('enforces maxLength', () => {
    const onChangeText = jest.fn();
    render(<TextArea label="Notes" defaultValue="abc" maxLength={3} onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByDisplayValue('abc'), 'abcd');
    expect(onChangeText).not.toHaveBeenCalled();
  });

  it('shows counter when showCount + maxLength', () => {
    render(<TextArea label="Notes" defaultValue="hi" maxLength={10} showCount />);
    expect(screen.getByText('2/10')).toBeTruthy();
  });

  it('renders error message', () => {
    render(<TextArea label="Notes" error="Required" />);
    expect(screen.getByText('Required')).toBeTruthy();
  });

  it('disables editing when disabled', () => {
    render(<TextArea label="Notes" defaultValue="locked" disabled />);
    expect(screen.getByDisplayValue('locked').props.editable).toBe(false);
  });
});
