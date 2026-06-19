import { forwardRef, isValidElement, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableStateCallbackType,
  type TextStyle,
  type View as RNView,
  type ViewStyle,
} from 'react-native';
import { baseStyles, sizeSpec, variantTones } from './Button.styles';
import type { ButtonProps } from './Button.types';

const renderChild = (child: ReactNode, textStyle: TextStyle): ReactNode => {
  if (typeof child === 'string' || typeof child === 'number') {
    return <Text style={textStyle}>{child}</Text>;
  }
  return child;
};

export const Button = forwardRef<RNView, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'large',
    disabled = false,
    loading = false,
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    onPress,
    children,
    style,
    testID,
    ...accessibility
  },
  ref,
) {
  const spec = sizeSpec[size];
  const tones = variantTones[variant];
  const isDisabled = disabled || loading;

  const containerStyle = (state: PressableStateCallbackType): ViewStyle => {
    const bg = isDisabled
      ? tones.bgDisabled
      : state.pressed
        ? tones.bgPressed
        : tones.bg;
    const borderColor = isDisabled ? tones.borderColorDisabled : tones.borderColor;
    return {
      ...baseStyles.root,
      ...(tones.shadow ?? {}),
      height: spec.height,
      paddingHorizontal: spec.paddingHorizontal,
      paddingVertical: spec.paddingVertical,
      gap: spec.gap,
      backgroundColor: bg,
      borderWidth: tones.borderWidth,
      borderColor,
      width: fullWidth ? '100%' : undefined,
      ...(style ?? {}),
    };
  };

  const labelColor = isDisabled ? tones.textDisabled : tones.text;
  const labelStyle: TextStyle = {
    ...spec.labelType,
    ...baseStyles.label,
    color: labelColor,
  };

  const iconStyle: ViewStyle = {
    ...baseStyles.iconWrap,
    width: spec.iconSize,
    height: spec.iconSize,
  };

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={isDisabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={containerStyle}
      {...accessibility}
    >
      {loading ? (
        <ActivityIndicator size="small" color={labelColor} />
      ) : (
        <>
          {leadingIcon ? (
            <View style={iconStyle} pointerEvents="none">
              {isValidElement(leadingIcon) ? leadingIcon : null}
            </View>
          ) : null}
          {renderChild(children, labelStyle)}
          {trailingIcon ? (
            <View style={iconStyle} pointerEvents="none">
              {isValidElement(trailingIcon) ? trailingIcon : null}
            </View>
          ) : null}
        </>
      )}
    </Pressable>
  );
});
