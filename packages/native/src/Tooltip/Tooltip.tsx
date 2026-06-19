import { useState, type ReactElement } from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BUBBLE_BG, TAIL, styles } from './Tooltip.styles';
import type { TooltipPosition, TooltipProps } from './Tooltip.types';

function Tail({ position }: { position: TooltipPosition }) {
  /* Triangle pointing AT the trigger. The path is a small isoceles triangle
   * inscribed in a 16x16 viewBox; we rotate the SVG per position. The unrotated
   * shape points UP. */
  const rotation =
    position === 'top'
      ? 180
      : position === 'bottom'
        ? 0
        : position === 'left'
          ? 90
          : -90;
  return (
    <Svg
      width={TAIL}
      height={TAIL}
      viewBox="0 0 16 16"
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    >
      <Path d="M8 2 L14 11 L2 11 Z" fill={BUBBLE_BG} />
    </Svg>
  );
}

function Bubble({ text }: { text: string }) {
  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

function Pop({ position, text }: { position: TooltipPosition; text: string }) {
  const popStyle = (
    { top: styles.popTop, bottom: styles.popBottom, left: styles.popLeft, right: styles.popRight } as const
  )[position];
  const tailMargin = (
    {
      top: styles.tailContainerTop,
      bottom: styles.tailContainerBottom,
      left: styles.tailContainerLeft,
      right: styles.tailContainerRight,
    } as const
  )[position];

  // Render order matters: bubble first for top/left so tail sits after it.
  const tail = (
    <View style={tailMargin} pointerEvents="none">
      <Tail position={position} />
    </View>
  );
  const bubble = <Bubble text={text} />;
  const inside = position === 'top' || position === 'left' ? [bubble, tail] : [tail, bubble];

  return (
    <View style={popStyle} pointerEvents="none">
      {inside.map((node, i) => (
        <View key={i}>{node}</View>
      ))}
    </View>
  );
}

export function Tooltip({
  text,
  position = 'top',
  trigger = 'longPress',
  visible,
  defaultVisible = false,
  onVisibilityChange,
  children,
  style,
  bubbleStyle: _bubbleStyle,
  onPress,
  onLongPress,
  testID,
  accessibilityLabel,
}: TooltipProps): ReactElement {
  const isControlled = visible !== undefined;
  const [internal, setInternal] = useState(defaultVisible);
  const isVisible = isControlled ? visible : internal;

  const setVisible = (next: boolean) => {
    if (!isControlled) setInternal(next);
    onVisibilityChange?.(next);
  };

  const handlePress = (event: Parameters<NonNullable<typeof onPress>>[0]) => {
    onPress?.(event);
    if (trigger === 'press') setVisible(!isVisible);
  };

  const handleLongPress = (event: Parameters<NonNullable<typeof onLongPress>>[0]) => {
    onLongPress?.(event);
    if (trigger === 'longPress') setVisible(true);
  };

  // For longPress we dismiss on a subsequent tap; for press we toggle.
  const handleAnyPress =
    trigger === 'longPress' && isVisible
      ? () => setVisible(false)
      : trigger === 'press'
        ? handlePress
        : onPress;

  return (
    <View style={[styles.wrapper, style ?? {}]} testID={testID}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ expanded: isVisible }}
        onPress={handleAnyPress}
        onLongPress={trigger === 'longPress' ? handleLongPress : undefined}
      >
        {children}
      </Pressable>
      {isVisible ? <Pop position={position} text={text} /> : null}
    </View>
  );
}
