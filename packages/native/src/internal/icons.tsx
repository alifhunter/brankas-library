import Svg, { Circle, Path, type SvgProps } from 'react-native-svg';
import { color as palette } from '../theme';

const WHITE = palette.background.default;

export interface InternalIconProps {
  size?: number;
  color?: string;
  style?: SvgProps['style'];
}

const baseProps = (size: number, color: string): SvgProps => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export function ChevronDownIcon({ size = 20, color = 'currentColor', style }: InternalIconProps) {
  return (
    <Svg {...baseProps(size, color)} style={style}>
      <Path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function ChevronUpIcon({ size = 20, color = 'currentColor', style }: InternalIconProps) {
  return (
    <Svg {...baseProps(size, color)} style={style}>
      <Path d="M18 15l-6-6-6 6" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 16, color = 'currentColor', style }: InternalIconProps) {
  return (
    <Svg {...baseProps(size, color)} style={style}>
      <Path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

export function CloseIcon({ size = 20, color = 'currentColor', style }: InternalIconProps) {
  return (
    <Svg {...baseProps(size, color)} style={style}>
      <Path d="M18 6L6 18" />
      <Path d="M6 6l12 12" />
    </Svg>
  );
}

export function CheckIcon({ size = 20, color = 'currentColor', style }: InternalIconProps) {
  return (
    <Svg {...baseProps(size, color)} style={style} strokeWidth={3}>
      <Path d="M20 6L9 17l-5-5" />
    </Svg>
  );
}

export function MinusIcon({ size = 20, color = 'currentColor', style }: InternalIconProps) {
  return (
    <Svg {...baseProps(size, color)} style={style} strokeWidth={3}>
      <Path d="M5 12h14" />
    </Svg>
  );
}

export function InfoIcon({ size = 20, color = palette.text.informational, style }: InternalIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Circle cx={12} cy={12} r={10} fill={color} />
      <Path d="M12 8.5v-.5" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M12 11v6" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export function WarningIcon({ size = 20, color = palette.text.warning, style }: InternalIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M12 2L22 20H2L12 2z"
        fill={color}
      />
      <Path d="M12 9v5" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M12 17v.5" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export function ErrorIcon({ size = 20, color = palette.text.error, style }: InternalIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Circle cx={12} cy={12} r={10} fill={color} />
      <Path d="M12 7v6" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M12 16.5v.5" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export function PersonIcon({ size = 24, color = palette.text.subtlest, style }: InternalIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Circle cx={12} cy={8} r={4} fill={color} />
      <Path
        d="M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8"
        fill={color}
      />
    </Svg>
  );
}

export function SearchIcon({ size = 24, color = palette.text.default, style }: InternalIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
      <Path d="M20 20l-3.5-3.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function CloseFilledIcon({
  size = 24,
  color = palette.text.default,
  style,
}: InternalIconProps) {
  // Black-filled circle with a white X — used to clear input fields.
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Circle cx={12} cy={12} r={10} fill={color} />
      <Path
        d="M9 9l6 6M15 9l-6 6"
        stroke={WHITE}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
