import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokenList } from '@brankas/tokens';
import {
  FoundationsHero,
  FoundationsPage,
  FoundationsSection,
} from './foundationShared';

type TypographyToken = {
  name: string;
  cssVariable: string;
  fontFamily: string | undefined;
  fontSize: string | undefined;
  fontWeight: string | undefined;
  lineHeight: string | undefined;
  letterSpacing: string | undefined;
};

function readTypographyTokens(platform: 'desktop' | 'mobile'): TypographyToken[] {
  return tokenList
    .filter((token) => token.type === 'typography' && token.path[1] === platform)
    .map((token) => {
      const variables = token.cssVariables as Record<string, string>;
      const base = token.cssVariable;
      return {
        name: token.name,
        cssVariable: base,
        fontFamily: variables[`${base}-font-family`],
        fontSize: variables[`${base}-font-size`],
        fontWeight: variables[`${base}-font-weight`],
        lineHeight: variables[`${base}-line-height`],
        letterSpacing: variables[`${base}-letter-spacing`],
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function TypographySpecimen({ token }: { token: TypographyToken }) {
  const fontFamily = token.fontFamily ?? 'Inter, sans-serif';
  const fontSize = token.fontSize ?? '14px';
  const fontWeight = token.fontWeight ?? '400';
  const lineHeight = token.lineHeight ?? 'normal';
  const letterSpacing = token.letterSpacing ?? '0';

  return (
    <div
      style={{
        display: 'grid',
        gap: 14,
        padding: 20,
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
          letterSpacing,
          color: '#0f172a',
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div
        style={{
          display: 'grid',
          gap: 4,
          paddingTop: 12,
          borderTop: '1px solid #f1f5f9',
        }}
      >
        <code
          style={{
            fontSize: 12,
            color: '#0f172a',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          {token.name}
        </code>
        <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
          {fontSize} / {lineHeight} · {fontWeight} · {fontFamily}
        </span>
      </div>
    </div>
  );
}

function TypographyPlatform({ platform }: { platform: 'desktop' | 'mobile' }) {
  const tokens = readTypographyTokens(platform);

  if (tokens.length === 0) {
    return <p style={{ color: '#4b5563' }}>No {platform} typography tokens registered.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {tokens.map((token) => (
        <TypographySpecimen key={token.name} token={token} />
      ))}
    </div>
  );
}

const meta = {
  component: FoundationsPage,
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  render: () => (
    <FoundationsPage>
      <FoundationsHero
        eyebrow="Foundations"
        title="Typography — Desktop"
        description="Semantic ramp used by @brankas/react/desktop. Each specimen renders live sample text from its CSS variable values."
      />
      <FoundationsSection
        title="Desktop ramp"
        description="Display, heading, body, and label scales. Use the variable directly in CSS or the corresponding utility class in JSX."
      >
        <TypographyPlatform platform="desktop" />
      </FoundationsSection>
    </FoundationsPage>
  ),
};

export const Mobile: Story = {
  render: () => (
    <FoundationsPage>
      <FoundationsHero
        eyebrow="Foundations"
        title="Typography — Mobile"
        description="Semantic ramp tuned for mobile surfaces. Reuses primitive families and weights but with mobile-specific sizes and leading."
      />
      <FoundationsSection
        title="Mobile ramp"
        description="Consumed by @brankas/native via the typography export. Pre-converted to RN-friendly numeric shape (no px / em strings)."
      >
        <TypographyPlatform platform="mobile" />
      </FoundationsSection>
    </FoundationsPage>
  ),
};
