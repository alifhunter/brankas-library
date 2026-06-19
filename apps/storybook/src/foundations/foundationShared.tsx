/* eslint-disable react-refresh/only-export-components */
import type { CSSProperties, ReactNode } from 'react';
import { tokenList } from '@brankas/tokens';

export function readTokenValue(tokenName: string): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
}

/**
 * Resolve a public CSS variable (e.g. `--color-text-default`) to the
 * underlying primitive it aliases (e.g. `color.neutral.1000`). Returns null
 * for primitive tokens themselves and for unknown variables.
 */
export function primitiveOf(cssVarName: string): string | null {
  const canonical = cssVarName.replace(/^--/, '--brankas-');
  const token = tokenList.find((t) => t.cssVariable === canonical);
  if (!token) return null;
  if (typeof token.value === 'string' && token.value.startsWith('{')) {
    return token.value.replace(/[{}]/g, '');
  }
  return null;
}

const sharedStyle: CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  color: '#0f172a',
};

export function FoundationsPage({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        ...sharedStyle,
        width: 'min(100%, 960px)',
        margin: '0 auto',
        padding: '32px 24px 64px',
        display: 'grid',
        gap: 32,
      }}
    >
      {children}
    </div>
  );
}

interface HeroProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  accent?: string;
  gradient?: string;
}

export function FoundationsHero({
  eyebrow,
  title,
  description,
  accent = '#1c77c3',
  gradient = 'linear-gradient(135deg, #f6f9fe 0%, #e8f1fb 60%, #d8e7f7 100%)',
}: HeroProps) {
  return (
    <section
      style={{
        background: gradient,
        borderRadius: 16,
        padding: '36px 32px',
        display: 'grid',
        gap: 14,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 'fit-content',
          background: `${accent}1a`,
          color: accent,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: 999,
        }}
      >
        {eyebrow}
      </span>
      <h1
        style={{
          margin: 0,
          fontSize: 32,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: '#0f172a',
        }}
      >
        {title}
      </h1>
      {description ? (
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.6,
            color: '#475569',
            maxWidth: '60ch',
          }}
        >
          {description}
        </p>
      ) : null}
    </section>
  );
}

export function FoundationsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <header style={{ display: 'grid', gap: 4 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            letterSpacing: '-0.01em',
            color: '#0f172a',
          }}
        >
          {title}
        </h2>
        {description ? (
          <p style={{ margin: 0, color: '#475569', fontSize: 14, lineHeight: 1.55, maxWidth: '70ch' }}>
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

export function FoundationsCallout({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'success' | 'warning';
  children: ReactNode;
}) {
  const palette = {
    info: { bg: '#f6f9fe', border: '#1c77c3', text: '#082238' },
    success: { bg: '#f2fdf5', border: '#2daa50', text: '#04150a' },
    warning: { bg: '#fffaf0', border: '#e08e45', text: '#2a1a05' },
  }[tone];
  return (
    <div
      style={{
        background: palette.bg,
        borderLeft: `4px solid ${palette.border}`,
        padding: '12px 16px',
        borderRadius: '0 8px 8px 0',
        fontSize: 14,
        lineHeight: 1.55,
        color: palette.text,
      }}
    >
      {children}
    </div>
  );
}

export function TokenTable({
  tokens,
  showPrimitive = true,
}: {
  tokens: readonly string[];
  /** Hide the Primitive column (useful for pages that only list primitives). */
  showPrimitive?: boolean;
}) {
  const hasAnyPrimitive =
    showPrimitive && tokens.some((tokenName) => primitiveOf(tokenName) !== null);
  const renderPrimitive = showPrimitive && hasAnyPrimitive;
  const thStyle: CSSProperties = {
    textAlign: 'left',
    padding: '10px 16px',
    borderBottom: '1px solid #e2e8f0',
    color: '#475569',
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            <th style={thStyle}>Token</th>
            {renderPrimitive ? <th style={thStyle}>Primitive</th> : null}
            <th style={thStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((tokenName, index) => {
            const isLast = index === tokens.length - 1;
            const cellStyle: CSSProperties = {
              padding: '10px 16px',
              borderBottom: isLast ? 'none' : '1px solid #f1f5f9',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 13,
            };
            const primitive = renderPrimitive ? primitiveOf(tokenName) : null;
            return (
              <tr key={tokenName} style={{ background: index % 2 === 0 ? '#ffffff' : '#fafbfd' }}>
                <td style={cellStyle}>{tokenName}</td>
                {renderPrimitive ? (
                  <td style={{ ...cellStyle, color: '#475569' }}>
                    {primitive ?? '—'}
                  </td>
                ) : null}
                <td style={{ ...cellStyle, color: '#475569' }}>
                  {readTokenValue(tokenName) || '(unresolved)'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function ColorSwatchCard({ tokenName }: { tokenName: string }) {
  const value = readTokenValue(tokenName);

  return (
    <div
      style={{
        display: 'grid',
        gap: 10,
        padding: 14,
        borderRadius: 12,
        border: '1px solid #e2e8f0',
        background: '#ffffff',
        transition: 'border-color 120ms ease, box-shadow 120ms ease',
      }}
    >
      <div
        style={{
          height: 64,
          borderRadius: 8,
          background: `var(${tokenName})`,
          border: '1px solid #e2e8f0',
        }}
      />
      <div style={{ display: 'grid', gap: 2 }}>
        <code
          style={{
            fontSize: 12,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            color: '#0f172a',
          }}
        >
          {tokenName}
        </code>
        <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
          {value || '(unresolved)'}
        </span>
      </div>
    </div>
  );
}
