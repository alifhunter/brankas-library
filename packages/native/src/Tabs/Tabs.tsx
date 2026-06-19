import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import type { TabsProps } from './Tabs.types';

const LABEL_TYPE = typography.mobile.body.lg.semibold;

const TONE = {
  light: {
    active: color.neutral['50'],
    inactive: 'rgba(255,255,255,0.6)',
    underline: color.background.default,
  },
  dark: {
    active: color.background['primary-blue'],
    inactive: color.text.subtlest,
    underline: color.background['primary-blue'],
  },
} as const;

export function Tabs<V extends string = string>({
  options,
  value,
  defaultValue,
  onValueChange,
  tone = 'light',
  scrollable = true,
  disabled = false,
  style,
  testID,
}: TabsProps<V>) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<V>(defaultValue ?? options[0]!.value);
  const current = isControlled ? value : internal;
  const palette = TONE[tone];

  const select = (next: V) => {
    if (disabled || next === current) return;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const items = options.map((option) => {
    const active = option.value === current;
    return (
      <Pressable
        key={option.value}
        accessibilityRole="tab"
        accessibilityState={{ selected: active, disabled }}
        accessibilityLabel={option.accessibilityLabel ?? option.label}
        onPress={() => select(option.value)}
        disabled={disabled}
        style={styles.item}
      >
        <Text
          numberOfLines={1}
          style={[
            LABEL_TYPE,
            { color: active ? palette.active : palette.inactive },
          ]}
        >
          {option.label}
        </Text>
        {/* Underline always reserved so the tab height doesn't jump when
         * selection changes — invisible when inactive, white bar when active. */}
        <View
          style={[
            styles.underline,
            { backgroundColor: active ? palette.underline : 'transparent' },
          ]}
        />
      </Pressable>
    );
  });

  const inner = (
    <View
      accessibilityRole="tablist"
      style={[styles.row, style ?? {}]}
      testID={testID}
    >
      {items}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {inner}
      </ScrollView>
    );
  }

  return inner;
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'flex-end',
  },
  item: {
    alignItems: 'center',
    gap: 6,
    paddingBottom: 6,
  },
  underline: {
    height: 2,
    width: 17,
    borderRadius: 2,
  },
});
