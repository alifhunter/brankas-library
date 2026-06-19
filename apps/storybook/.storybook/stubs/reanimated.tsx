import { forwardRef, useRef, useState } from 'react';
import {
  View as RNView,
  Text as RNText,
  ScrollView as RNScrollView,
  Image as RNImage,
  type ViewProps,
} from 'react-native';

interface SharedValue<T> {
  value: T;
}

const stripWorkletKeys = (style: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(style)) {
    if (v !== undefined && k !== '_isReanimatedSharedValue') {
      if (typeof v === 'object' && v !== null && 'value' in (v as object)) {
        out[k] = (v as SharedValue<unknown>).value;
      } else {
        out[k] = v;
      }
    }
  }
  return out;
};

const wrap = <P extends ViewProps>(Component: React.ComponentType<P>) =>
  forwardRef<unknown, P & { animatedProps?: unknown; entering?: unknown; exiting?: unknown }>(
    function AnimatedWrapper(props, ref) {
      const { style, animatedProps, entering, exiting, ...rest } = props;
      const finalStyle = Array.isArray(style)
        ? style.map((s) =>
            s && typeof s === 'object' && !Array.isArray(s) ? stripWorkletKeys(s as Record<string, unknown>) : s,
          )
        : style && typeof style === 'object'
          ? stripWorkletKeys(style as Record<string, unknown>)
          : style;
      return <Component ref={ref as never} {...(rest as unknown as P)} style={finalStyle as P['style']} />;
    },
  );

const AnimatedView = wrap(RNView);
const AnimatedText = wrap(RNText);
const AnimatedScrollView = wrap(RNScrollView);
const AnimatedImage = wrap(RNImage);

const AnimatedNamespace = {
  View: AnimatedView,
  Text: AnimatedText,
  ScrollView: AnimatedScrollView,
  Image: AnimatedImage,
  createAnimatedComponent: <P extends ViewProps>(c: React.ComponentType<P>) => wrap(c),
  call: () => undefined,
};

export default AnimatedNamespace;
export const createAnimatedComponent = AnimatedNamespace.createAnimatedComponent;

type AnimationStep<T> = {
  fromValue: T;
  toValue: T;
  duration: number;
  startTime: number;
  raf: number;
  cb?: (finished: boolean) => void;
};

export const useSharedValue = <T,>(initial: T): SharedValue<T> => {
  const [, forceRender] = useState(0);
  const ref = useRef<SharedValue<T> | null>(null);
  const animRef = useRef<AnimationStep<T> | null>(null);

  if (ref.current === null) {
    const holder = { current: initial };
    const stopAnim = () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current.raf);
        animRef.current.cb?.(false);
        animRef.current = null;
      }
    };
    const setValue = (next: T) => {
      if (holder.current !== next) {
        holder.current = next;
        forceRender((n) => n + 1);
      }
    };
    const sv: SharedValue<T> = {
      get value() {
        return holder.current;
      },
      set value(next: T) {
        // Detect a tagged animation descriptor
        if (next && typeof next === 'object' && '__anim' in (next as object)) {
          stopAnim();
          const desc = next as unknown as {
            __anim: 'timing' | 'spring';
            to: T;
            duration: number;
            cb?: (finished: boolean) => void;
          };
          if (
            typeof desc.to !== 'number' ||
            typeof holder.current !== 'number'
          ) {
            holder.current = desc.to;
            forceRender((n) => n + 1);
            desc.cb?.(true);
            return;
          }
          const from = holder.current as unknown as number;
          const to = desc.to as unknown as number;
          const duration = Math.max(1, desc.duration);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const v = from + (to - from) * eased;
            holder.current = v as unknown as T;
            forceRender((n) => n + 1);
            if (t < 1) {
              animRef.current!.raf = requestAnimationFrame(tick);
            } else {
              const cb = animRef.current?.cb;
              animRef.current = null;
              cb?.(true);
            }
          };
          animRef.current = {
            fromValue: holder.current,
            toValue: desc.to,
            duration,
            startTime: start,
            raf: requestAnimationFrame(tick),
            ...(desc.cb ? { cb: desc.cb } : {}),
          };
        } else {
          stopAnim();
          setValue(next);
        }
      },
    } as SharedValue<T>;
    ref.current = sv;
  }
  return ref.current;
};

export const useAnimatedStyle = (fn: () => Record<string, unknown>): Record<string, unknown> => {
  try {
    return fn();
  } catch {
    return {};
  }
};

export const useDerivedValue = <T,>(fn: () => T): SharedValue<T> => ({ value: fn() });

export const withTiming = <T,>(
  value: T,
  config?: { duration?: number },
  cb?: (finished: boolean) => void,
): T => {
  const descriptor = {
    __anim: 'timing' as const,
    to: value,
    duration: config?.duration ?? 300,
    cb,
  };
  return descriptor as unknown as T;
};

export const withSpring = <T,>(
  value: T,
  _config?: unknown,
  cb?: (finished: boolean) => void,
): T => {
  const descriptor = {
    __anim: 'spring' as const,
    to: value,
    duration: 320,
    cb,
  };
  return descriptor as unknown as T;
};

export const withDelay = <T,>(_delay: number, value: T): T => value;

export const withRepeat = <T,>(value: T): T => value;

export const withSequence = <T,>(...values: T[]): T => values[values.length - 1] as T;

export const runOnJS =
  <Args extends unknown[]>(fn: (...args: Args) => unknown) =>
  (...args: Args) =>
    fn(...args);

export const runOnUI =
  <Args extends unknown[]>(fn: (...args: Args) => unknown) =>
  (...args: Args) =>
    fn(...args);

type ExtrapolateMode = 'clamp' | 'extend' | 'identity';

export const interpolate = (
  value: number,
  inputRange: number[],
  outputRange: number[],
  extrapolate?: ExtrapolateMode | { extrapolateLeft?: ExtrapolateMode; extrapolateRight?: ExtrapolateMode },
): number => {
  const minIn = inputRange[0] ?? 0;
  const maxIn = inputRange[inputRange.length - 1] ?? 1;
  const minOut = outputRange[0] ?? 0;
  const maxOut = outputRange[outputRange.length - 1] ?? 1;
  const t = (value - minIn) / (maxIn - minIn || 1);
  const raw = minOut + t * (maxOut - minOut);
  const mode = typeof extrapolate === 'string' ? extrapolate : 'extend';
  if (mode === 'clamp') {
    const lo = Math.min(minOut, maxOut);
    const hi = Math.max(minOut, maxOut);
    return Math.max(lo, Math.min(hi, raw));
  }
  return raw;
};

export const Extrapolation = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' };

type ScrollEvent = { contentOffset?: { y: number; x: number } };
type ScrollHandlerArg = { onScroll?: (event: ScrollEvent) => void };

export const useAnimatedScrollHandler = (
  arg: ScrollHandlerArg | ((event: ScrollEvent) => void),
) => {
  const handler = typeof arg === 'function' ? arg : arg.onScroll;
  return (event: { nativeEvent?: ScrollEvent } & ScrollEvent) => {
    const payload = event.nativeEvent ?? event;
    handler?.(payload);
  };
};

export const Easing = {
  linear: (t: number) => t,
  in: (fn: (t: number) => number) => fn,
  out: (fn: (t: number) => number) => fn,
  inOut: (fn: (t: number) => number) => fn,
  bezier: () => (t: number) => t,
};
