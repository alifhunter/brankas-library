import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress}>Tap</Button>);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <Button onPress={onPress} disabled>
        Tap
      </Button>,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress while loading', () => {
    const onPress = jest.fn();
    render(
      <Button onPress={onPress} loading>
        Tap
      </Button>,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('exposes accessibility state for disabled', () => {
    render(<Button disabled>Tap</Button>);
    const btn = screen.getByRole('button');
    expect(btn.props.accessibilityState).toMatchObject({ disabled: true });
  });

  it('renders all 7 variants without crashing', () => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'tertiaryInvert',
      'tertiaryBlue',
      'tertiaryRed',
      'glassmorphism',
    ] as const;
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>Hello</Button>);
      expect(screen.getByText('Hello')).toBeTruthy();
      unmount();
    }
  });

  it('renders all 3 sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    for (const size of sizes) {
      const { unmount } = render(<Button size={size}>Hello</Button>);
      expect(screen.getByText('Hello')).toBeTruthy();
      unmount();
    }
  });
});
