import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { color } from '../theme';
import { CheckIcon, MinusIcon } from '../internal/icons';
import type { CheckboxProps } from './Checkbox.types';

const BOX_SIZE = 20;
const SELECTED_BG = color.background.selected;
const NEUTRAL_BORDER = color.border.default;
const ERROR_BORDER = color.border.error;
const ERROR_BG = color.background['error-light'];
const DISABLED_BG = color.background.subtle;
const DISABLED_BORDER = color.border.disabled;

export function Checkbox({
  checked,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  error = false,
  onChange,
  onPress,
  style,
  testID,
  ...accessibility
}: CheckboxProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const value = isControlled ? checked : internal;
  const showFill = value || indeterminate;

  const handlePress = (e: Parameters<NonNullable<typeof onPress>>[0]) => {
    if (disabled) return;
    onPress?.(e);
    const next = !value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const borderColor = error
    ? ERROR_BORDER
    : showFill
      ? SELECTED_BG
      : disabled
        ? DISABLED_BORDER
        : NEUTRAL_BORDER;
  const fillColor = error
    ? ERROR_BG
    : showFill
      ? SELECTED_BG
      : disabled
        ? DISABLED_BG
        : color.background.default;
  const iconColor = error ? ERROR_BORDER : color.background.default;

  return (
    <Pressable
      role="checkbox"
      accessibilityState={{
        checked: indeterminate ? 'mixed' : !!value,
        disabled,
      }}
      onPress={handlePress}
      disabled={disabled}
      testID={testID}
      style={[styles.root, style ?? {}]}
      {...accessibility}
    >
      <View
        style={[
          styles.box,
          { backgroundColor: fillColor, borderColor },
          disabled && styles.boxDisabled,
        ]}
      >
        {indeterminate ? (
          <MinusIcon size={14} color={iconColor} />
        ) : value ? (
          <CheckIcon size={14} color={iconColor} />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxDisabled: {
    opacity: 0.6,
  },
});
