import { render, screen } from '@testing-library/react-native';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials clipped to 2 uppercase', () => {
    render(<Avatar initials="user" />);
    expect(screen.getByText('US')).toBeTruthy();
  });

  it('uses a descriptive accessibility label for initials', () => {
    render(<Avatar initials="UN" />);
    expect(screen.getByLabelText('Avatar UN')).toBeTruthy();
  });

  it('falls back to a generic label without initials', () => {
    render(<Avatar />);
    expect(screen.getByLabelText('Avatar')).toBeTruthy();
  });
});
