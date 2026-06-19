import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FoundationsCallout,
  FoundationsHero,
  FoundationsPage,
  FoundationsSection,
} from './foundationShared';

const LAYERS = [
  {
    name: 'Primitives',
    folder: 'packages/tokens/source/primitives/',
    description:
      'Raw values — color scales, base spacing steps, base radii, font scales, shadow sizes. Rarely consumed directly by components.',
    accent: '#94a3b8',
  },
  {
    name: 'Semantic',
    folder: 'packages/tokens/source/semantic/',
    description:
      'Purpose-named aliases — color.text.default, shadow.card, border.subtle. Components consume these.',
    accent: '#1c77c3',
  },
  {
    name: 'Components',
    folder: 'packages/tokens/source/components/',
    description:
      'Component-specific token namespaces. Use sparingly — most needs are covered by semantics.',
    accent: '#2daa50',
  },
] as const;

const meta = {
  component: FoundationsPage,
  title: 'Foundations/Design Token',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <FoundationsPage>
      <FoundationsHero
        eyebrow="Foundations"
        title="Design tokens"
        description="A single source of truth for colors, spacing, radius, shadow, typography, and breakpoints. Defined once in @brankas/tokens, emitted as both CSS variables (web) and JS objects (React Native)."
      />

      <FoundationsSection
        title="Why tokens?"
        description="Tokens decouple design intent from implementation. If a hex value, font size, or radius appears literally in a component, that's a token waiting to happen."
      >
        <div
          style={{
            display: 'grid',
            gap: 12,
            padding: 20,
            borderRadius: 12,
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            color: '#334155',
            lineHeight: 1.6,
            fontSize: 14,
          }}
        >
          <p style={{ margin: 0 }}>
            Tokens are written in the W3C Design Tokens Format (<code>*.tokens.json</code>) and
            compiled by <code>@brankas/tokens</code> into:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <code>dist/tokens.css</code> — CSS custom properties consumed by every web component.
            </li>
            <li>
              <code>src/generated/tokens.ts</code> — typed JS exports for React Native and any
              JS-side consumer.
            </li>
          </ul>
        </div>
      </FoundationsSection>

      <FoundationsSection
        title="Three layers"
        description="Tokens are organised into three layers. Pick the right one when adding new values."
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {LAYERS.map((layer) => (
            <div
              key={layer.name}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 18,
                display: 'grid',
                gap: 8,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 'fit-content',
                  background: `${layer.accent}1a`,
                  color: layer.accent,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: 999,
                }}
              >
                {layer.name}
              </span>
              <code
                style={{
                  fontSize: 12,
                  color: '#0f172a',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              >
                {layer.folder}
              </code>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: '#475569' }}>
                {layer.description}
              </p>
            </div>
          ))}
        </div>
      </FoundationsSection>

      <FoundationsSection
        title="Where to go next"
        description="Each foundation page renders its tokens as live samples."
      >
        <ul style={{ margin: 0, paddingLeft: 18, color: '#334155', lineHeight: 1.7 }}>
          <li>
            <strong>Colors</strong> — primitive ramps and semantic groups (text, background, border, primary).
          </li>
          <li>
            <strong>Typography</strong> — desktop and mobile semantic ramps with live specimens.
          </li>
          <li>
            <strong>Spacing</strong> — the rhythm scale used by padding and gap.
          </li>
          <li>
            <strong>Radius</strong> — corner-rounding tokens from sharp to pill.
          </li>
          <li>
            <strong>Shadow</strong> — primitives, desktop semantics, mobile semantics.
          </li>
          <li>
            <strong>Breakpoint</strong> — the media-query boundaries components respond to.
          </li>
        </ul>
      </FoundationsSection>

      <FoundationsCallout tone="warning">
        Renaming a token cascades to every consumer. Add a new alias and deprecate the old one in
        a follow-up PR rather than renaming in place.
      </FoundationsCallout>
    </FoundationsPage>
  ),
};
