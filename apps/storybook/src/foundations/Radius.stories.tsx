import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FoundationsHero,
  FoundationsPage,
  FoundationsSection,
  TokenTable,
} from './foundationShared';

const RADIUS_TOKENS = [
  '--radius-xs',
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
  '--radius-pill',
] as const;

function RadiusPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {RADIUS_TOKENS.map((token) => (
        <div
          key={token}
          style={{
            display: 'grid',
            gap: 10,
            padding: 14,
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              width: 140,
              height: 84,
              borderRadius: `var(${token})`,
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              border: '1px solid #cbd5e1',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <code
              style={{
                fontSize: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                color: '#0f172a',
              }}
            >
              {token}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  component: FoundationsPage,
  title: 'Foundations/Radius',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <FoundationsPage>
      <FoundationsHero
        eyebrow="Foundations"
        title="Radius"
        description="Corner rounding scale, from sharp inputs and chips to fully-rounded pills. Pick a step rather than typing a number to keep the visual language consistent."
      />
      <FoundationsSection
        title="Radius tokens"
        description="The full ramp of corner radii available in components."
      >
        <TokenTable tokens={RADIUS_TOKENS} />
      </FoundationsSection>
      <FoundationsSection title="Visual scale">
        <RadiusPreview />
      </FoundationsSection>
    </FoundationsPage>
  ),
};
