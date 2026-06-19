import { forwardRef, useRef, useState, type ComponentRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { color, shadow, typography } from '../theme';
import { ChevronDownIcon, CloseFilledIcon, ErrorIcon } from '../internal/icons';
import type { InputAmountProps } from './InputAmount.types';

const LABEL_TYPE = typography.mobile.body.md.semibold;
const SUB_LABEL_TYPE = typography.mobile.body.lg.semibold;
const INFO_TYPE = typography.mobile.body.sm.regular;
const CURRENCY_CODE_TYPE = typography.mobile.body.md.semibold;
const RATE_TYPE = typography.mobile.body.md.semibold;

const TEXT_DEFAULT = color.text.default;
const TEXT_DISABLED = color.neutral['300'];
const TEXT_INFO = color.text.subtle;
const TEXT_LABEL = color.text.subtlest;
const TEXT_ERROR = color.text.error;
const BORDER_SUBTLE = color.border.subtle;
const BORDER_ERROR = color.border.error;
const CARD_BG = color.background.default;

const BASE_FONT = 32;
const MIN_FONT = 16;
const CHAR_WIDTH_RATIO = 0.55; // Inter Bold heuristic — empirical
const LINE_RATIO = 40 / 32;

function formatDigits(digits: string, locale: string): string {
  if (!digits) return '';
  const cleaned = digits.replace(/\D/g, '');
  if (!cleaned) return '';
  // parseInt handles up to 2^53 — fine for currency amounts.
  const n = Number.parseInt(cleaned, 10);
  if (Number.isNaN(n)) return cleaned;
  return new Intl.NumberFormat(locale).format(n);
}

function rawDigits(input: string | number | undefined): string {
  if (input === undefined || input === null) return '';
  return String(input).replace(/\D/g, '');
}

export const InputAmount = forwardRef<ComponentRef<typeof TextInput>, InputAmountProps>(
  function InputAmount(
    {
      label,
      value,
      defaultValue,
      onValueChange,
      prefix = 'Rp',
      locale = 'id-ID',
      info,
      error,
      disabled = false,
      currency,
      clearable = true,
      maxFontSize = BASE_FONT,
      minFontSize = MIN_FONT,
      containerStyle,
      onFocus,
      onBlur,
      testID,
      ...inputProps
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(rawDigits(defaultValue));
    const current = isControlled ? rawDigits(value) : internal;
    const [focused, setFocused] = useState(false);
    const [availableWidth, setAvailableWidth] = useState(0);
    const innerRef = useRef<ComponentRef<typeof TextInput> | null>(null);

    const setInputRef = (node: ComponentRef<typeof TextInput> | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<typeof node>).current = node;
    };

    const formatted = formatDigits(current, locale);
    const display = `${prefix}${formatted || '0'}`;

    // Auto-scale: estimate width as `chars * fontSize * ratio` and shrink the
    // font if it would overflow the available row width. Re-runs whenever
    // the rendered string or available width changes.
    const fontSize = (() => {
      if (availableWidth <= 0) return maxFontSize;
      const estimated = display.length * maxFontSize * CHAR_WIDTH_RATIO;
      if (estimated <= availableWidth) return maxFontSize;
      const scaled = (maxFontSize * availableWidth) / estimated;
      return Math.max(minFontSize, scaled);
    })();

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : undefined;

    const labelColor = hasError
      ? TEXT_ERROR
      : disabled
        ? TEXT_DISABLED
        : TEXT_LABEL;
    const valueColor = disabled ? TEXT_DISABLED : TEXT_DEFAULT;
    const dividerColor = hasError ? BORDER_ERROR : BORDER_SUBTLE;

    const handleChange = (next: string) => {
      const digits = next.replace(/\D/g, '');
      if (!isControlled) setInternal(digits);
      onValueChange?.(digits);
    };

    const handleClear = () => {
      if (disabled) return;
      handleChange('');
      innerRef.current?.focus();
    };

    const focusInput = () => {
      if (!disabled) innerRef.current?.focus();
    };

    const onAmountRowLayout = (event: LayoutChangeEvent) => {
      // Subtract the clear button (~24) + its 8 gap so we measure the text-only area.
      const w = event.nativeEvent.layout.width - (clearable ? 32 : 0);
      setAvailableWidth(w);
    };

    const showClear = clearable && current.length > 0 && !disabled && focused;

    return (
      <View
        style={[
          styles.card,
          hasError ? styles.cardError : null,
          containerStyle ?? {},
        ]}
        testID={testID}
      >
        {currency ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Select currency, current ${currency.code}`}
            onPress={currency.onPress}
            disabled={!currency.onPress}
            style={styles.currencyRow}
          >
            <View style={styles.currencyLeft}>
              <Text style={[SUB_LABEL_TYPE, { color: labelColor }]}>
                {label ?? 'Title'}
              </Text>
              <View style={styles.currencyPicker}>
                {currency.flag ? (
                  <View style={styles.currencyFlag}>{currency.flag}</View>
                ) : null}
                <Text style={[CURRENCY_CODE_TYPE, { color: color.text.default }]}>
                  {currency.code}
                </Text>
                <ChevronDownIcon size={12} color={color.text.default} />
              </View>
            </View>
            {currency.rate ? (
              <Text style={[RATE_TYPE, { color: TEXT_INFO }]}>{currency.rate}</Text>
            ) : null}
          </Pressable>
        ) : label ? (
          <Text numberOfLines={1} style={[LABEL_TYPE, { color: labelColor }]}>
            {label}
          </Text>
        ) : null}

        <Pressable
          onPress={focusInput}
          disabled={disabled}
          style={styles.amountRow}
          onLayout={onAmountRowLayout}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.amountText,
              { fontSize, lineHeight: fontSize * LINE_RATIO, color: valueColor },
            ]}
          >
            {prefix}
          </Text>
          <TextInput
            ref={setInputRef}
            value={formatted}
            onChangeText={handleChange}
            editable={!disabled}
            placeholder="0"
            placeholderTextColor={TEXT_LABEL}
            keyboardType="numeric"
            selectionColor={color.background['primary-blue']}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            style={[
              styles.amountInput,
              {
                fontSize,
                lineHeight: fontSize * LINE_RATIO,
                color: valueColor,
              },
            ]}
            {...inputProps}
          />
          {showClear ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear amount"
              hitSlop={8}
              onPress={handleClear}
              style={styles.clearSlot}
            >
              <CloseFilledIcon size={24} color={color.text.default} />
            </Pressable>
          ) : null}
        </Pressable>

        <View style={[styles.divider, { backgroundColor: dividerColor }]} />

        {errorMessage ? (
          <View style={styles.captionRow}>
            <ErrorIcon size={14} color={TEXT_ERROR} />
            <Text style={[INFO_TYPE, { color: TEXT_ERROR, flex: 1 }]}>
              {errorMessage}
            </Text>
          </View>
        ) : info ? (
          <Text style={[INFO_TYPE, { color: TEXT_INFO }]}>{info}</Text>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    width: 328,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    ...shadow.mobile.selection,
  },
  cardError: {
    borderWidth: 0.5,
    borderColor: BORDER_ERROR,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  currencyLeft: {
    flex: 1,
    gap: 4,
  },
  currencyPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 16,
  },
  currencyFlag: {
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
  },
  amountText: {
    ...typography.mobile.heading.h1.bold,
  },
  amountInput: {
    flex: 1,
    ...typography.mobile.heading.h1.bold,
    padding: 0,
    margin: 0,
  },
  clearSlot: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  captionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
