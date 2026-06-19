import { fireEvent, render, screen } from '@testing-library/react-native';
import { AccountItem } from './AccountItem';

describe('AccountItem', () => {
  it('renders name + account number', () => {
    render(<AccountItem name="Simas Gold" accountNumber="0057150556" />);
    expect(screen.getByText('Simas Gold')).toBeTruthy();
    expect(screen.getByText('0057150556')).toBeTruthy();
  });

  it('renders balance when supplied', () => {
    render(
      <AccountItem name="Simas Gold" accountNumber="0057150556" balance="Rp25.000.000" />,
    );
    expect(screen.getByText('Rp25.000.000')).toBeTruthy();
  });

  it('renders badge', () => {
    render(
      <AccountItem name="Simas Gold" accountNumber="0057150556" badge="Default" />,
    );
    expect(screen.getByText('Default')).toBeTruthy();
  });

  it('fires onPress when tappable', () => {
    const onPress = jest.fn();
    render(
      <AccountItem name="Simas Gold" accountNumber="0057150556" onPress={onPress} />,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <AccountItem
        name="Simas Gold"
        accountNumber="0057150556"
        onPress={onPress}
        disabled
      />,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
