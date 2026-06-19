import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

const passGesture = {
  onBegin: () => passGesture,
  onStart: () => passGesture,
  onUpdate: () => passGesture,
  onChange: () => passGesture,
  onEnd: () => passGesture,
  onFinalize: () => passGesture,
  onTouchesDown: () => passGesture,
  onTouchesMove: () => passGesture,
  onTouchesUp: () => passGesture,
  enabled: () => passGesture,
  minDistance: () => passGesture,
  maxPointers: () => passGesture,
  activeOffsetX: () => passGesture,
  activeOffsetY: () => passGesture,
  failOffsetX: () => passGesture,
  failOffsetY: () => passGesture,
  shouldCancelWhenOutside: () => passGesture,
  simultaneousWithExternalGesture: () => passGesture,
  exclusiveWithExternalGesture: () => passGesture,
  requireExternalGestureToFail: () => passGesture,
};

export const Gesture = {
  Pan: () => ({ ...passGesture }),
  Tap: () => ({ ...passGesture }),
  LongPress: () => ({ ...passGesture }),
  Fling: () => ({ ...passGesture }),
  Pinch: () => ({ ...passGesture }),
  Rotation: () => ({ ...passGesture }),
  Hover: () => ({ ...passGesture }),
  Manual: () => ({ ...passGesture }),
  Native: () => ({ ...passGesture }),
  Race: () => ({ ...passGesture }),
  Simultaneous: () => ({ ...passGesture }),
  Exclusive: () => ({ ...passGesture }),
};

export const GestureDetector = ({ children }: { children: ReactNode }) => <>{children}</>;

export const GestureHandlerRootView = (props: ViewProps) => <View {...props} />;

export const ScrollView = (props: ViewProps) => <View {...props} />;
export const FlatList = (props: ViewProps) => <View {...props} />;

export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

export const Directions = { RIGHT: 1, LEFT: 2, UP: 4, DOWN: 8 };

export default {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
  FlatList,
  State,
  Directions,
};
