import { render, screen } from '@testing-library/react-native';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders solid label', () => {
    render(<Badge label="New" />);
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('renders count', () => {
    render(<Badge label={3} />);
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('renders dot variant without label', () => {
    render(<Badge variant="dot" />);
    expect(screen.getByLabelText('Notification')).toBeTruthy();
  });
});
