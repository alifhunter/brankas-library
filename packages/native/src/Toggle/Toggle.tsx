import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { color } from '../theme';
import { CheckIcon } from '../internal/icons';
import type { ToggleProps } from './Toggle.types';

const TRACK_W = 40;
const TRACK_H = 24;
const THUMB = 20;
const THUMB_PAD = 2;

const ON_BG = color.background.selected;
const OFF_BG = color.background.subtle;
const DISABLED_BG = color.background.disabled;
const THUMB_BG = color.background.default;
const CHECK_COLOR = color.background.selected;
const CHECK_DISABLED = color.text.gray;

export function Toggle({
  value,
  defaultValue = false,
  onValueChange,
  disabled = false,
  style,
  testID,
  ...accessibility
}: ToggleProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const on = isControlled ? value : internal;

  const handlePress = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const trackColor = disabled ? DISABLED_BG : on ? ON_BG : OFF_BG;
  const thumbLeft = on ? TRACK_W - THUMB - THUMB_PAD : THUMB_PAD;
  const checkColor = disabled ? CHECK_DISABLED : CHECK_COLOR;

  return (
    <Pressable
      role="switch"
      accessibilityState={{ checked: on, disabled }}
      onPress={handlePress}
      disabled={disabled}
      testID={testID}
      style={[styles.root, style ?? {}]}
      {...accessibility}
    >
      <View style={[styles.track, { backgroundColor: trackColor }]}>
        <View style={[styles.thumb, { left: thumbLeft }]}>
          {on ? <CheckIcon size={14} color={checkColor} /> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
  },
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: 12,
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    top: THUMB_PAD,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: THUMB_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
