import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FoundationsCallout,
  FoundationsHero,
  FoundationsPage,
  FoundationsSection,
  TokenTable,
  readTokenValue,
} from './foundationShared';

const SPACING_TOKENS = [
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
  '--space-5',
  '--space-6',
] as const;

function SpacingPreview() {
  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        padding: 20,
        borderRadius: 12,
        background: '#ffffff',
        border: '1px solid #e2e8f0',
      }}
    >
      {SPACING_TOKENS.map((tokenName) => {
        const raw = readTokenValue(tokenName);
        const px = Number.parseFloat(raw);
        return (
          <div key={tokenName} style={{ display: 'grid', gap: 6 }}>
            <code
              style={{
                fontSize: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}
            >
              {tokenName}
            </code>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: Number.isNaN(px) ? 0 : px,
                  height: 12,
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #1c77c3 0%, #48a3f0 100%)',
                }}
              />
              <span style={{ fontSize: 12, color: '#64748b' }}>{raw || '(unresolved)'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const meta = {
  component: FoundationsPage,
  title: 'Foundations/Spacing',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <FoundationsPage>
      <FoundationsHero
        eyebrow="Foundations"
        title="Spacing"
        description="A consistent rhythm for padding, gaps, and margins. Use the semantic ramp instead of hard-coding pixel values so layout density stays unified across the system."
      />
      <FoundationsSection
        title="Spacing tokens"
        description="Each token maps to a CSS variable. Tighter steps for dense controls, larger steps for sections and screens."
      >
        <TokenTable tokens={SPACING_TOKENS} />
      </FoundationsSection>
      <FoundationsSection title="Visual scale">
        <SpacingPreview />
      </FoundationsSection>
      <FoundationsCallout tone="info">
        Inside components, reach for tokens like <code>var(--space-3)</code> instead of literal{' '}
        <code>16px</code> so future scale tweaks cascade automatically.
      </FoundationsCallout>
    </FoundationsPage>
  ),
};
