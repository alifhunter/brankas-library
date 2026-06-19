import { fireEvent, render, screen } from '@testing-library/react-native';
import { Tabs } from './Tabs';

const OPTIONS = [
  { value: 'savings', label: 'Savings & Current' },
  { value: 'credit', label: 'Credit Card' },
] as const;

describe('Tabs', () => {
  it('renders all options', () => {
    render(<Tabs options={OPTIONS} defaultValue="savings" />);
    expect(screen.getByText('Savings & Current')).toBeTruthy();
    expect(screen.getByText('Credit Card')).toBeTruthy();
  });

  it('selects on press (uncontrolled)', () => {
    const onValueChange = jest.fn();
    render(<Tabs options={OPTIONS} defaultValue="savings" onValueChange={onValueChange} />);
    fireEvent.press(screen.getByText('Credit Card'));
    expect(onValueChange).toHaveBeenCalledWith('credit');
  });

  it('does not fire when value unchanged', () => {
    const onValueChange = jest.fn();
    render(<Tabs options={OPTIONS} value="savings" onValueChange={onValueChange} />);
    fireEvent.press(screen.getByText('Savings & Current'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('marks active tab via accessibilityState', () => {
    render(<Tabs options={OPTIONS} defaultValue="credit" />);
    const credit = screen.getByLabelText('Credit Card');
    expect(credit.props.accessibilityState).toMatchObject({ selected: true });
  });

  it('does not select when disabled', () => {
    const onValueChange = jest.fn();
    render(<Tabs options={OPTIONS} disabled onValueChange={onValueChange} />);
    fireEvent.press(screen.getByText('Credit Card'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
