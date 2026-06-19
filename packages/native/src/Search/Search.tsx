import { forwardRef, useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { color, typography } from '../theme';
import { CloseFilledIcon, SearchIcon } from '../internal/icons';
import type { SearchProps, SearchVariant } from './Search.types';

const PLACEHOLDER_TYPE = typography.mobile.body.md.regular;
const VALUE_TYPE = typography.mobile.body.lg.regular;

const BG_MAP: Record<SearchVariant, string> = {
  white: color.background.default,
  grey: color.background.subtle,
};

const PLACEHOLDER_COLOR = color.text.subtlest;
const VALUE_COLOR = color.text.default;
const DISABLED_BG = color.background.disabled;
const ICON_COLOR = color.text.default;

export const Search = forwardRef<ComponentRef<typeof TextInput>, SearchProps>(
  function Search(
    {
      value,
      defaultValue,
      onChangeText,
      variant = 'white',
      leadingIcon,
      clearable = true,
      disabled = false,
      placeholder = 'Search',
      containerStyle,
      ...textInputProps
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(defaultValue ?? '');
    const current = isControlled ? value : internal;
    const innerRef = useRef<ComponentRef<typeof TextInput> | null>(null);

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

    const hasContent = current.length > 0;
    const showClear = clearable && hasContent && !disabled;
    const bg = disabled ? DISABLED_BG : BG_MAP[variant];

    return (
      <View style={[styles.root, { backgroundColor: bg }, containerStyle ?? {}]}>
        <TextInput
          ref={setInputRef}
          value={current}
          onChangeText={handleChange}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={PLACEHOLDER_COLOR}
          returnKeyType="search"
          style={[
            styles.input,
            hasContent
              ? { ...VALUE_TYPE, color: VALUE_COLOR }
              : { ...PLACEHOLDER_TYPE, color: PLACEHOLDER_COLOR },
          ]}
          {...textInputProps}
        />
        {showClear ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={8}
            onPress={handleClear}
            style={styles.iconSlot}
          >
            <CloseFilledIcon size={24} color={ICON_COLOR} />
          </Pressable>
        ) : (
          <View style={styles.iconSlot}>
            {leadingIcon ?? <SearchIcon size={24} color={ICON_COLOR} />}
          </View>
        )}
      </View>
    );
  },
);
Search.displayName = 'Search';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 52,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  iconSlot: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
