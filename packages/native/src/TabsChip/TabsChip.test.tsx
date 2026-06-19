import { fireEvent, render, screen } from '@testing-library/react-native';
import { TabsChip } from './TabsChip';

const OPTIONS = [
  { value: 'idr', label: 'IDR' },
  { value: 'usd', label: 'USD' },
  { value: 'cny', label: 'CNY' },
] as const;

describe('TabsChip', () => {
  it('renders all chip labels', () => {
    render(<TabsChip options={OPTIONS} defaultValue="idr" />);
    expect(screen.getByText('IDR')).toBeTruthy();
    expect(screen.getByText('USD')).toBeTruthy();
    expect(screen.getByText('CNY')).toBeTruthy();
  });

  it('selects on press (uncontrolled)', () => {
    const onValueChange = jest.fn();
    render(<TabsChip options={OPTIONS} defaultValue="idr" onValueChange={onValueChange} />);
    fireEvent.press(screen.getByText('USD'));
    expect(onValueChange).toHaveBeenCalledWith('usd');
  });

  it('respects controlled value', () => {
    const onValueChange = jest.fn();
    render(<TabsChip options={OPTIONS} value="usd" onValueChange={onValueChange} />);
    const node = screen.getByLabelText('USD');
    expect(node.props.accessibilityState).toMatchObject({ selected: true });
  });

  it('disabled blocks selection', () => {
    const onValueChange = jest.fn();
    render(<TabsChip options={OPTIONS} disabled onValueChange={onValueChange} />);
    fireEvent.press(screen.getByText('USD'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
