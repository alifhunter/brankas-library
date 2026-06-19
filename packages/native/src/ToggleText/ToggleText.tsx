import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import type { ToggleTextProps, ToggleTextSide } from './ToggleText.types';

const BLACK = color.background.black;
const WHITE = color.background.default;

const CONTAINER_W = 60;
const CONTAINER_H = 32;
const THUMB = 24;
const THUMB_TOP = 2.75;
const THUMB_LEFT_REST = 2.75;
const THUMB_LEFT_ACTIVE_RIGHT = CONTAINER_W - THUMB - THUMB_LEFT_REST; // 30.75

export function ToggleText({
  leftLabel,
  rightLabel,
  value,
  defaultValue = 'left',
  onValueChange,
  tone = 'black',
  disabled = false,
  style,
  testID,
  accessibilityLabel,
}: ToggleTextProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<ToggleTextSide>(defaultValue);
  const active = isControlled ? value : internal;

  const toggle = () => {
    if (disabled) return;
    const next: ToggleTextSide = active === 'left' ? 'right' : 'left';
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const isLeft = active === 'left';
  const isBlackTone = tone === 'black';
  const borderColor = isBlackTone ? BLACK : WHITE;
  const thumbBg = borderColor;
  const outsideColor = borderColor;
  const thumbTextColor = isBlackTone ? WHITE : BLACK;
  const activeLabel = isLeft ? leftLabel : rightLabel;
  const thumbLeft = isLeft ? THUMB_LEFT_REST : THUMB_LEFT_ACTIVE_RIGHT;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: !isLeft, disabled }}
      accessibilityLabel={accessibilityLabel ?? `${leftLabel} or ${rightLabel}`}
      onPress={toggle}
      disabled={disabled}
      style={[
        styles.container,
        { borderColor },
        disabled ? styles.disabled : null,
        style ?? {},
      ]}
      testID={testID}
    >
      <View style={styles.row} pointerEvents="none">
        <View style={styles.half}>
          <Text style={[styles.label, { color: outsideColor }]}>{leftLabel}</Text>
        </View>
        <View style={styles.half}>
          <Text style={[styles.label, { color: outsideColor }]}>{rightLabel}</Text>
        </View>
      </View>
      <View
        pointerEvents="none"
        style={[
          styles.thumb,
          { backgroundColor: thumbBg, left: thumbLeft },
        ]}
      >
        <Text style={[styles.label, { color: thumbTextColor }]}>{activeLabel}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_W,
    height: CONTAINER_H,
    borderRadius: 20,
    borderWidth: 1.25,
    overflow: 'hidden',
    position: 'relative',
  },
  disabled: {
    opacity: 0.5,
  },
  row: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  half: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    top: THUMB_TOP,
    width: THUMB,
    height: THUMB,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.mobile.body.sm.semibold,
    textAlign: 'center',
  },
});
