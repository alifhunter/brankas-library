import { tokens } from '@brankas/tokens';
import type { TextStyle, ViewStyle } from 'react-native';

export const color = tokens.color;
export const spacing = tokens.spacing;
export const radius = tokens.radius;

export type ColorToken = typeof color;
export type SpacingToken = typeof spacing;
export type RadiusToken = typeof radius;

const stripPx = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
};

type RawTypography = {
  fontFamily: string;
  fontSize: string | number;
  fontWeight: number;
  lineHeight: string | number;
  letterSpacing: string | number;
};

export type TypographyStyle = Pick<
  TextStyle,
  'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing'
>;

const toTypographyStyle = (raw: RawTypography): TypographyStyle => {
  const fontSize = stripPx(raw.fontSize);
  const letterSpacingRaw =
    typeof raw.letterSpacing === 'string' && raw.letterSpacing.endsWith('em')
      ? parseFloat(raw.letterSpacing) * fontSize
      : stripPx(raw.letterSpacing);
  return {
    fontFamily: raw.fontFamily,
    fontSize,
    fontWeight: String(raw.fontWeight) as TextStyle['fontWeight'],
    lineHeight: stripPx(raw.lineHeight),
    letterSpacing: letterSpacingRaw,
  };
};

type RecursiveTypography = {
  [key: string]: RecursiveTypography | RawTypography;
};

const isRawTypography = (value: unknown): value is RawTypography =>
  typeof value === 'object' &&
  value !== null &&
  'fontSize' in value &&
  'fontFamily' in value;

const mapTypographyTree = <T>(node: T): T => {
  if (isRawTypography(node)) {
    return toTypographyStyle(node) as unknown as T;
  }
  if (typeof node !== 'object' || node === null) return node;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node as RecursiveTypography)) {
    out[key] = mapTypographyTree(value);
  }
  return out as T;
};

/**
 * Recursively replace every raw typography leaf with the RN-friendly
 * `TypographyStyle` shape (numeric fontSize/lineHeight/letterSpacing, RN
 * fontWeight as string). Mirrors what `mapTypographyTree` does at runtime
 * so consumers spreading these values into RN styles get correct types.
 */
type TransformTypographyTree<T> = T extends RawTypography
  ? TypographyStyle
  : T extends object
    ? { [K in keyof T]: TransformTypographyTree<T[K]> }
    : T;

export const typography = mapTypographyTree(
  tokens.typography,
) as unknown as TransformTypographyTree<typeof tokens.typography>;

type RawShadow = {
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  color: string;
};

export type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

const RGBA_RE = /rgba?\(([^)]+)\)/i;
const parseRgbaOpacity = (value: string): { color: string; opacity: number } => {
  const match = value.match(RGBA_RE);
  if (!match) return { color: value, opacity: 1 };
  const parts = (match[1] ?? '').split(',').map((s) => s.trim());
  const [r, g, b, a] = parts;
  const opacity = a === undefined ? 1 : parseFloat(a);
  const toHex = (n: string) => Number(n).toString(16).padStart(2, '0');
  return {
    color: `#${toHex(r ?? '0')}${toHex(g ?? '0')}${toHex(b ?? '0')}`,
    opacity: Number.isFinite(opacity) ? opacity : 1,
  };
};

const toShadowStyle = (raw: RawShadow): ShadowStyle => {
  const { color, opacity } = parseRgbaOpacity(raw.color);
  const blur = stripPx(raw.blur);
  return {
    shadowColor: color,
    shadowOffset: { width: stripPx(raw.offsetX), height: stripPx(raw.offsetY) },
    shadowOpacity: opacity,
    shadowRadius: blur,
    elevation: Math.round(blur / 2),
  };
};

type ShadowLeafOrGroup<T> = T extends readonly RawShadow[]
  ? ShadowStyle
  : T extends RawShadow
    ? ShadowStyle
    : T extends object
      ? { [K in keyof T]: ShadowLeafOrGroup<T[K]> }
      : never;

type ShadowOutput = { [K in keyof typeof tokens.shadow]: ShadowLeafOrGroup<(typeof tokens.shadow)[K]> };

const isRawShadow = (value: unknown): value is RawShadow =>
  typeof value === 'object' &&
  value !== null &&
  'offsetX' in value &&
  'color' in value;

const layerWeight = (layer: RawShadow): number => {
  const { opacity } = parseRgbaOpacity(layer.color);
  return opacity * stripPx(layer.blur);
};

const pickDominantLayer = (layers: readonly RawShadow[]): RawShadow => {
  return layers.reduce((best, candidate) =>
    layerWeight(candidate) > layerWeight(best) ? candidate : best,
  );
};

const mapShadowNode = (node: unknown): unknown => {
  if (Array.isArray(node)) {
    return toShadowStyle(pickDominantLayer(node as readonly RawShadow[]));
  }
  if (isRawShadow(node)) {
    return toShadowStyle(node);
  }
  if (typeof node === 'object' && node !== null) {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      out[key] = mapShadowNode(value);
    }
    return out;
  }
  return node;
};

export const shadow = mapShadowNode(tokens.shadow) as ShadowOutput;
