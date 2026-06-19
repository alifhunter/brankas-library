import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('is hidden by default', () => {
    render(
      <Tooltip text="Hello">
        <Text>Trigger</Text>
      </Tooltip>,
    );
    expect(screen.queryByText('Hello')).toBeNull();
  });

  it('shows on long-press by default', () => {
    render(
      <Tooltip text="Hello">
        <Text>Trigger</Text>
      </Tooltip>,
    );
    fireEvent(screen.getByRole('button'), 'longPress');
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('toggles on press when trigger="press"', () => {
    render(
      <Tooltip text="Hello" trigger="press">
        <Text>Trigger</Text>
      </Tooltip>,
    );
    const target = screen.getByRole('button');
    fireEvent.press(target);
    expect(screen.getByText('Hello')).toBeTruthy();
    fireEvent.press(target);
    expect(screen.queryByText('Hello')).toBeNull();
  });

  it('respects controlled visibility', () => {
    const { rerender } = render(
      <Tooltip text="Hello" trigger="manual" visible>
        <Text>Trigger</Text>
      </Tooltip>,
    );
    expect(screen.getByText('Hello')).toBeTruthy();
    rerender(
      <Tooltip text="Hello" trigger="manual" visible={false}>
        <Text>Trigger</Text>
      </Tooltip>,
    );
    expect(screen.queryByText('Hello')).toBeNull();
  });

  it('fires onVisibilityChange', () => {
    const onVisibilityChange = jest.fn();
    render(
      <Tooltip text="Hello" trigger="press" onVisibilityChange={onVisibilityChange}>
        <Text>Trigger</Text>
      </Tooltip>,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onVisibilityChange).toHaveBeenCalledWith(true);
  });

  it('renders at each position without crashing', () => {
    for (const position of ['top', 'bottom', 'left', 'right'] as const) {
      const { unmount } = render(
        <Tooltip text={`tip-${position}`} position={position} trigger="manual" visible>
          <Text>{position}</Text>
        </Tooltip>,
      );
      expect(screen.getByText(`tip-${position}`)).toBeTruthy();
      unmount();
    }
  });
});
