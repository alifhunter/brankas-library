import { forwardRef, useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { color, typography } from '../theme';
import { ErrorIcon } from '../internal/icons';
import type { TextAreaProps } from './TextArea.types';

const BG_REST = color.background['cool-light'];
const BG_DISABLED = color.background.disabled;
const BORDER_ERROR = color.border.error;
const TEXT_DEFAULT = color.text.default;
const TEXT_SUBTLEST = color.text.subtlest;
const TEXT_DISABLED = color.text.gray;
const TEXT_ERROR = color.text.error;

const INPUT_TYPE = typography.mobile.body.lg.regular;
const LINE_HEIGHT = typeof INPUT_TYPE.lineHeight === 'number' ? INPUT_TYPE.lineHeight : 24;
const RADIUS = 8;

export const TextArea = forwardRef<ComponentRef<typeof TextInput>, TextAreaProps>(
  function TextArea(
    {
      label,
      value,
      defaultValue,
      onChangeText,
      hint,
      error,
      disabled = false,
      maxLength,
      showCount = false,
      rows = 4,
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
      if (maxLength !== undefined && next.length > maxLength) return;
      if (!isControlled) setInternal(next);
      onChangeText?.(next);
    };

    const focusInput = () => {
      if (!disabled) innerRef.current?.focus();
    };

    const fieldBg = disabled ? BG_DISABLED : BG_REST;
    const valueColor = disabled ? TEXT_DISABLED : TEXT_DEFAULT;
    const labelColor = disabled
      ? TEXT_DISABLED
      : isFloating
        ? TEXT_SUBTLEST
        : TEXT_SUBTLEST;

    const counter = showCount
      ? maxLength !== undefined
        ? `${current.length}/${maxLength}`
        : String(current.length)
      : null;

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
              minHeight: rows * LINE_HEIGHT + 36,
            },
          ]}
        >
          {isFloating ? (
            <Text numberOfLines={1} style={[styles.labelFloating, { color: labelColor }]}>
              {label}
            </Text>
          ) : null}
          <TextInput
            ref={setInputRef}
            multiline
            value={current}
            onChangeText={handleChange}
            editable={!disabled}
            placeholder={isFloating ? undefined : label}
            placeholderTextColor={disabled ? TEXT_DISABLED : TEXT_SUBTLEST}
            textAlignVertical="top"
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            {...(maxLength !== undefined ? { maxLength } : {})}
            style={[
              styles.input,
              {
                color: valueColor,
                minHeight: rows * LINE_HEIGHT,
              },
            ]}
            {...textInputProps}
          />
        </Pressable>
        {(errorMessage || hint || counter) ? (
          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              {errorMessage ? (
                <View style={styles.captionRow}>
                  <ErrorIcon size={14} color={TEXT_ERROR} />
                  <Text style={[styles.caption, { color: TEXT_ERROR }]}>{errorMessage}</Text>
                </View>
              ) : hint ? (
                <Text style={[styles.caption, { color: TEXT_DEFAULT }]}>{hint}</Text>
              ) : null}
            </View>
            {counter ? (
              <Text style={[styles.caption, { color: TEXT_SUBTLEST }]}>{counter}</Text>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    gap: 8,
  },
  field: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS,
    gap: 4,
  },
  labelFloating: {
    ...typography.mobile.body.sm.semibold,
  },
  input: {
    ...INPUT_TYPE,
    padding: 0,
    margin: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  footerLeft: {
    flex: 1,
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
