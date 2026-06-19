import { forwardRef, useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { color, typography } from '../theme';
import { CloseIcon, ErrorIcon } from '../internal/icons';
import type { TextFieldProps } from './TextField.types';

const BG_REST = color.background['cool-light'];
const BG_DISABLED = color.background.disabled;
const BORDER_ERROR = color.border.error;
const TEXT_DEFAULT = color.text.default;
const TEXT_SUBTLEST = color.text.subtlest;
const TEXT_DISABLED = color.text.gray;
const TEXT_ERROR = color.text.error;
const CLEAR_BG = color.neutral['600'];

const FIELD_HEIGHT = 64;
const RADIUS = 8;

export const TextField = forwardRef<ComponentRef<typeof TextInput>, TextFieldProps>(
  function TextField(
    {
      label,
      value,
      defaultValue,
      onChangeText,
      hint,
      error,
      disabled = false,
      leadingIcon,
      trailingIcon,
      prefix,
      clearable = true,
      containerStyle,
      onFocus,
      onBlur,
      ...textInputProps
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(defaultValue ?? '');
    const current = isControlled ? value : internal;
    const [focused, setFocused] = useState(false);
    const innerRef = useRef<ComponentRef<typeof TextInput> | null>(null);

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : undefined;
    const isFloating = focused || current.length > 0;

    const setInputRef = (node: ComponentRef<typeof TextInput> | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<typeof node>).current = node;
    };

    const handleChange = (next: string) => {
      if (!isControlled) setInternal(next);
      onChangeText?.(next);
    };

    const handleClear = () => {
      if (disabled) return;
      handleChange('');
      innerRef.current?.focus();
    };

    const focusInput = () => {
      if (!disabled) innerRef.current?.focus();
    };

    const valueColor = disabled ? TEXT_DISABLED : TEXT_DEFAULT;
    const labelColor = disabled ? TEXT_DISABLED : TEXT_DEFAULT;
    const fieldBg = disabled ? BG_DISABLED : BG_REST;

    const showClear =
      clearable && focused && current.length > 0 && !disabled && !trailingIcon;

    return (
      <View style={[styles.root, containerStyle ?? {}]}>
        <Pressable
          onPress={focusInput}
          disabled={disabled}
          style={[
            styles.field,
            {
              backgroundColor: fieldBg,
              borderColor: hasError ? BORDER_ERROR : 'transparent',
              borderWidth: hasError ? 1 : 0,
            },
          ]}
        >
          {leadingIcon ? <View style={styles.iconSlot}>{leadingIcon}</View> : null}
          <View
            style={[
              styles.center,
              { justifyContent: isFloating ? 'flex-start' : 'center' },
            ]}
          >
            {isFloating ? (
              <Text numberOfLines={1} style={[styles.labelFloating, { color: labelColor }]}>
                {label}
              </Text>
            ) : null}
            <View style={styles.inputRow}>
              {prefix && isFloating ? (
                <Text style={[styles.prefix, { color: valueColor }]}>{prefix}</Text>
              ) : null}
              <TextInput
                ref={setInputRef}
                value={current}
                onChangeText={handleChange}
                editable={!disabled}
                placeholder={isFloating ? undefined : label}
                placeholderTextColor={disabled ? TEXT_DISABLED : TEXT_SUBTLEST}
                onFocus={(e) => {
                  setFocused(true);
                  onFocus?.(e);
                }}
                onBlur={(e) => {
                  setFocused(false);
                  onBlur?.(e);
                }}
                style={[styles.input, { color: valueColor }]}
                {...textInputProps}
              />
            </View>
          </View>
          {showClear ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear"
              hitSlop={8}
              onPress={handleClear}
              style={styles.iconSlot}
            >
              <View style={styles.clearChip}>
                <CloseIcon size={14} color={color.background.default} />
              </View>
            </Pressable>
          ) : trailingIcon ? (
            <View style={styles.iconSlot}>{trailingIcon}</View>
          ) : null}
        </Pressable>
        {errorMessage ? (
          <View style={styles.captionRow}>
            <ErrorIcon size={14} color={TEXT_ERROR} />
            <Text style={[styles.caption, { color: TEXT_ERROR }]}>{errorMessage}</Text>
          </View>
        ) : hint ? (
          <Text style={[styles.caption, { color: TEXT_DEFAULT }]}>{hint}</Text>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    gap: 6,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: FIELD_HEIGHT,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: RADIUS,
  },
  iconSlot: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    minHeight: 48,
  },
  labelFloating: {
    ...typography.mobile.body.sm.semibold,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    ...typography.mobile.body.lg.regular,
    marginRight: 4,
  },
  input: {
    flex: 1,
    ...typography.mobile.body.lg.regular,
    padding: 0,
    margin: 0,
  },
  clearChip: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: CLEAR_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    ...typography.mobile.body.sm.regular,
  },
  captionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
