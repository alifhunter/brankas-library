import { forwardRef } from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg from 'react-native-svg';

export interface IconProps extends Omit<SvgProps, 'children'> {
  size?: number;
  color?: string;
  children?: SvgProps['children'];
}

export const DEFAULT_ICON_SIZE = 24;

export const Icon = forwardRef<Svg, IconProps>(function Icon(
  { size = DEFAULT_ICON_SIZE, color = 'currentColor', children, ...rest },
  ref,
) {
  return (
    <Svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </Svg>
  );
});
