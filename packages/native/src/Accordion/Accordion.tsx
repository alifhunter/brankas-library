import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import { ChevronDownIcon, ChevronUpIcon } from '../internal/icons';
import type { AccordionProps } from './Accordion.types';

const BG = color.background.default;
const TEXT = color.text.default;
const BORDER = color.border.subtle;

export function Accordion({
  title,
  open,
  defaultOpen = false,
  onOpenChange,
  leadingIcon,
  children,
  disabled = false,
  style,
  contentStyle,
  testID,
}: AccordionProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const toggle = () => {
    if (disabled) return;
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <View style={[styles.root, style ?? {}]} testID={testID}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen, disabled }}
        onPress={toggle}
        disabled={disabled}
        style={({ pressed }) => [
          styles.header,
          pressed && !disabled ? styles.headerPressed : null,
        ]}
      >
        {leadingIcon ? <View style={styles.leading}>{leadingIcon}</View> : null}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.chevron}>
          {isOpen ? (
            <ChevronUpIcon size={20} color={TEXT} />
          ) : (
            <ChevronDownIcon size={20} color={TEXT} />
          )}
        </View>
      </Pressable>
      {isOpen && children ? (
        <View style={[styles.content, contentStyle ?? {}]}>{children}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: BG,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  headerPressed: {
    backgroundColor: color.background.subtle,
  },
  leading: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    ...typography.mobile.heading.h5.bold,
    color: TEXT,
  },
  chevron: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: color.background.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
