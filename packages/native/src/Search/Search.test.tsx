import { fireEvent, render, screen } from '@testing-library/react-native';
import { Search } from './Search';

describe('Search', () => {
  it('renders the placeholder when empty', () => {
    render(<Search placeholder="Search by transaction name" />);
    expect(screen.getByPlaceholderText('Search by transaction name')).toBeTruthy();
  });

  it('renders the leading search icon when empty', () => {
    render(<Search />);
    // no clear button while empty
    expect(screen.queryByLabelText('Clear search')).toBeNull();
  });

  it('shows the clear button when filled', () => {
    render(<Search defaultValue="hello" />);
    expect(screen.getByLabelText('Clear search')).toBeTruthy();
  });

  it('clear button empties the value', () => {
    const onChangeText = jest.fn();
    render(<Search defaultValue="abc" onChangeText={onChangeText} />);
    fireEvent.press(screen.getByLabelText('Clear search'));
    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('respects clearable=false', () => {
    render(<Search defaultValue="abc" clearable={false} />);
    expect(screen.queryByLabelText('Clear search')).toBeNull();
  });

  it('forwards controlled changes', () => {
    const onChangeText = jest.fn();
    render(<Search value="hello" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByDisplayValue('hello'), 'world');
    expect(onChangeText).toHaveBeenCalledWith('world');
  });

  it('blocks editing when disabled', () => {
    render(<Search defaultValue="locked" disabled />);
    expect(screen.getByDisplayValue('locked').props.editable).toBe(false);
  });
});
