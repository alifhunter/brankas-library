import { fireEvent, render, screen } from '@testing-library/react-native';
import { InputAmount } from './InputAmount';

describe('InputAmount', () => {
  it('renders the label', () => {
    render(<InputAmount label="Title" />);
    expect(screen.getByText('Title')).toBeTruthy();
  });

  it('renders the prefix outside the input', () => {
    render(<InputAmount label="Title" />);
    expect(screen.getByText('Rp')).toBeTruthy();
  });

  it('formats digits with id-ID thousand separators', () => {
    render(<InputAmount label="Amount" defaultValue="1000000" />);
    // 1.000.000 — Indonesian uses dot as thousand separator.
    expect(screen.getByDisplayValue('1.000.000')).toBeTruthy();
  });

  it('strips non-digits and emits the raw string', () => {
    const onValueChange = jest.fn();
    render(<InputAmount label="Amount" onValueChange={onValueChange} />);
    fireEvent.changeText(screen.getByDisplayValue(''), 'Rp 1.234,56');
    expect(onValueChange).toHaveBeenCalledWith('123456');
  });

  it('renders info caption', () => {
    render(<InputAmount label="Amount" info="The Rp100.000 will be held as a minimum balance." />);
    expect(
      screen.getByText('The Rp100.000 will be held as a minimum balance.'),
    ).toBeTruthy();
  });

  it('renders error caption', () => {
    render(<InputAmount label="Amount" error="Insufficient balance in your source account." />);
    expect(
      screen.getByText('Insufficient balance in your source account.'),
    ).toBeTruthy();
  });

  it('renders the currency picker when supplied', () => {
    render(
      <InputAmount
        label="Title"
        currency={{ code: 'USD', rate: '$1 = S$1.36' }}
      />,
    );
    expect(screen.getByText('USD')).toBeTruthy();
    expect(screen.getByText('$1 = S$1.36')).toBeTruthy();
  });

  it('disables editing when disabled', () => {
    render(<InputAmount label="Amount" defaultValue="500" disabled />);
    expect(screen.getByDisplayValue('500').props.editable).toBe(false);
  });
});
