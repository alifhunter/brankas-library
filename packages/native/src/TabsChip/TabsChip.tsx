import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import type { TabsChipProps } from './TabsChip.types';

const LABEL_TYPE = typography.mobile.body.md.semibold;

const TONE = {
  light: {
    activeBg: 'rgba(255,255,255,0.9)',
    activeText: color.background['primary-blue'],
    inactiveBg: 'rgba(255,255,255,0.12)',
    inactiveBorder: 'rgba(255,255,255,0.2)',
    inactiveText: color.background.default,
  },
  dark: {
    activeBg: color.background['primary-blue'],
    activeText: color.background.default,
    inactiveBg: color.background.subtle,
    inactiveBorder: color.border.subtle,
    inactiveText: color.text.default,
  },
} as const;

export function TabsChip<V extends string = string>({
  options,
  value,
  defaultValue,
  onValueChange,
  tone = 'light',
  scrollable = true,
  disabled = false,
  style,
  testID,
}: TabsChipProps<V>) {
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
        style={[
          styles.chip,
          option.icon ? styles.chipWithIcon : null,
          {
            backgroundColor: active ? palette.activeBg : palette.inactiveBg,
            borderColor: active ? 'transparent' : palette.inactiveBorder,
            borderWidth: active ? 0 : 1,
          },
        ]}
      >
        {option.icon ? <View style={styles.iconSlot}>{option.icon}</View> : null}
        <Text
          numberOfLines={1}
          style={[
            LABEL_TYPE,
            { color: active ? palette.activeText : palette.inactiveText },
          ]}
        >
          {option.label}
        </Text>
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
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  chipWithIcon: {
    paddingLeft: 8,
  },
  iconSlot: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
