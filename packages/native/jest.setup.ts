import '@testing-library/react-native';

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Pass = ({ children }: { children: React.ReactNode }) => children;
  const ForwardingView = (props: Record<string, unknown>) =>
    React.createElement(View, props);
  const noopGesture = {
    onBegin: () => noopGesture,
    onStart: () => noopGesture,
    onUpdate: () => noopGesture,
    onEnd: () => noopGesture,
    onFinalize: () => noopGesture,
    enabled: () => noopGesture,
    minDistance: () => noopGesture,
    activeOffsetY: () => noopGesture,
    failOffsetY: () => noopGesture,
  };
  return {
    __esModule: true,
    GestureHandlerRootView: ForwardingView,
    GestureDetector: Pass,
    Gesture: {
      Pan: () => ({ ...noopGesture }),
      Tap: () => ({ ...noopGesture }),
    },
    ScrollView: ForwardingView,
    State: {},
    Directions: {},
  };
});

jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  return {
    __esModule: true,
    default: { View, createAnimatedComponent: (c: unknown) => c, call: jest.fn() },
    View,
    useSharedValue: (initial: unknown) => ({ value: initial }),
    useAnimatedStyle: (cb: () => Record<string, unknown>) => cb(),
    useAnimatedScrollHandler: () => () => undefined,
    withTiming: (v: unknown, _config?: unknown, cb?: (finished: boolean) => void) => {
      cb?.(true);
      return v;
    },
    withSpring: (v: unknown) => v,
    runOnJS: (fn: (...args: unknown[]) => void) => fn,
    interpolate: (
      _value: number,
      _inputRange: number[],
      outputRange: number[],
    ) => outputRange[0],
    Extrapolation: { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' },
  };
});
