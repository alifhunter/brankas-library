import { fireEvent, render, screen } from '@testing-library/react-native';
import { AnnouncementBanner } from './AnnouncementBanner';

describe('AnnouncementBanner', () => {
  it('renders title + description', () => {
    render(<AnnouncementBanner title="Hi" description="Body" />);
    expect(screen.getByText('Hi')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
  });

  it('fires onDismiss when close pressed', () => {
    const onDismiss = jest.fn();
    render(<AnnouncementBanner title="Hi" onDismiss={onDismiss} />);
    fireEvent.press(screen.getByLabelText('Dismiss'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('fires action onPress', () => {
    const onPress = jest.fn();
    render(
      <AnnouncementBanner
        title="Hi"
        action={{ label: 'Go', onPress }}
      />,
    );
    fireEvent.press(screen.getByText('Go'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
