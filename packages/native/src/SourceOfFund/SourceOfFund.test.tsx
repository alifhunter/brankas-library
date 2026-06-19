import { fireEvent, render, screen } from '@testing-library/react-native';
import { AccountItem } from '../AccountItem/AccountItem';
import { SourceOfFund } from './SourceOfFund';

describe('SourceOfFund', () => {
  it('renders label + account row in card variant', () => {
    render(
      <SourceOfFund>
        <AccountItem name="Simas Gold" accountNumber="0057150556" chevron={false} />
      </SourceOfFund>,
    );
    expect(screen.getByText('Source account')).toBeTruthy();
    expect(screen.getByText('Simas Gold')).toBeTruthy();
  });

  it('omits label in selector variant', () => {
    render(
      <SourceOfFund variant="selector">
        <AccountItem name="Simas Gold" accountNumber="0057150556" chevron={false} />
      </SourceOfFund>,
    );
    expect(screen.queryByText('Source account')).toBeNull();
  });

  it('renders empty state placeholder', () => {
    render(<SourceOfFund variant="empty" />);
    expect(screen.getByText('No account selected')).toBeTruthy();
  });

  it('renders error message', () => {
    render(
      <SourceOfFund error="Error message">
        <AccountItem name="Simas Gold" accountNumber="0057150556" chevron={false} />
      </SourceOfFund>,
    );
    expect(screen.getByText('Error message')).toBeTruthy();
  });

  it('fires onPress when tappable', () => {
    const onPress = jest.fn();
    render(
      <SourceOfFund onPress={onPress}>
        <AccountItem name="Simas Gold" accountNumber="0057150556" chevron={false} />
      </SourceOfFund>,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <SourceOfFund onPress={onPress} disabled>
        <AccountItem name="Simas Gold" accountNumber="0057150556" chevron={false} />
      </SourceOfFund>,
    );
    // Disabled disables press; queryByRole still finds the View (no role)
    const node = screen.queryByRole('button');
    if (node) {
      fireEvent.press(node);
    }
    expect(onPress).not.toHaveBeenCalled();
  });
});
