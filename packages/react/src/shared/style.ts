import type { CSSProperties } from 'react';

export type StyleValue = string | number | undefined | null | false;

export function cx(...values: StyleValue[]) {
  return values.filter(Boolean).join(' ');
}

export function token(name: string, fallback: string) {
  return `var(--brankas-${name}, ${fallback})`;
}

export function mergeStyles(...styles: Array<CSSProperties | undefined>) {
  return Object.assign({}, ...styles.filter(Boolean));
}

export function typography(platform: 'desktop' | 'mobile', name: string): CSSProperties {
  const prefix = `typography-${platform}-${name}`;

  return {
    fontFamily: token(`${prefix}-font-family`, 'Inter, system-ui, sans-serif'),
    fontSize: token(`${prefix}-font-size`, '14px'),
    fontWeight: token(`${prefix}-font-weight`, '400'),
    letterSpacing: token(`${prefix}-letter-spacing`, '0'),
    lineHeight: token(`${prefix}-line-height`, '20px'),
  };
}
