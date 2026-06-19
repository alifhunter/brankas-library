import { fireEvent, render, screen } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles uncontrolled', () => {
    const onChange = jest.fn();
    render(<Checkbox defaultChecked={false} onChange={onChange} />);
    fireEvent.press(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('respects controlled prop', () => {
    const onChange = jest.fn();
    render(<Checkbox checked={true} onChange={onChange} />);
    const cb = screen.getByRole('checkbox');
    expect(cb.props.accessibilityState).toMatchObject({ checked: true });
    fireEvent.press(cb);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('reports mixed for indeterminate', () => {
    render(<Checkbox indeterminate />);
    const cb = screen.getByRole('checkbox');
    expect(cb.props.accessibilityState).toMatchObject({ checked: 'mixed' });
  });

  it('does not fire onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Checkbox disabled onChange={onChange} />);
    fireEvent.press(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
