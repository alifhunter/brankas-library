import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FoundationsHero,
  FoundationsPage,
  FoundationsSection,
  readTokenValue,
} from './foundationShared';

interface ShadowEntry {
  name: string;
  token: string;
  description?: string;
  background?: 'light' | 'dark';
}

const PRIMITIVE_SHADOWS: ShadowEntry[] = [
  {
    name: 'sm',
    token: '--brankas-shadow-sm',
    description: 'Small layered shadow. Subtle elevation for resting cards and inputs.',
  },
  {
    name: 'md',
    token: '--brankas-shadow-md',
    description: 'Medium directional shadow (AEAEC0 25%). Use for selected / hovered surfaces.',
  },
  {
    name: 'lg',
    token: '--brankas-shadow-lg',
    description: 'Large layered shadow. Floating overlays, popovers, modals.',
  },
];

const DESKTOP_SEMANTIC_SHADOWS: ShadowEntry[] = [
  {
    name: 'card',
    token: '--brankas-shadow-card',
    description: 'Standard card elevation. Alias of shadow.md.',
  },
  {
    name: 'hover',
    token: '--brankas-shadow-hover',
    description: 'Hover/lift state. Alias of shadow.sm.',
  },
  {
    name: 'overlay',
    token: '--brankas-shadow-overlay',
    description: 'Floating overlays — dropdowns, popovers, modals. Alias of shadow.lg.',
  },
];

const MOBILE_SEMANTIC_SHADOWS: ShadowEntry[] = [
  {
    name: 'mobile.selection',
    token: '--brankas-shadow-mobile-selection',
    description: 'Selection card. Subtle directional drop. Alias of shadow.md.',
  },
  {
    name: 'mobile.button',
    token: '--brankas-shadow-mobile-button',
    description: 'Hairline top edge for tactile depth on raised pill buttons.',
  },
  {
    name: 'mobile.bottomNav',
    token: '--brankas-shadow-mobile-bottom-nav',
    description: 'Bottom navigation. Heavy gray shadow lifting the tab bar above content.',
  },
  {
    name: 'mobile.collapsiblePanel',
    token: '--brankas-shadow-mobile-collapsible-panel',
    description: 'Collapsible panel rising from below (e.g. Summary Portfolio).',
  },
  {
    name: 'mobile.bottomNavQris',
    token: '--brankas-shadow-mobile-bottom-nav-qris',
    description: 'QRIS floating button. Red glow matching the QRIS gradient.',
  },
];

function ShadowCard({ entry }: { entry: ShadowEntry }) {
  const value = readTokenValue(entry.token);
  const isDark = entry.background === 'dark';
  return (
    <div
      style={{
        display: 'grid',
        gap: 14,
        padding: 18,
        borderRadius: 12,
        border: '1px solid #e2e8f0',
        background: '#ffffff',
      }}
    >
      <div
        style={{
          height: 108,
          borderRadius: 12,
          background: isDark ? '#152433' : '#ffffff',
          boxShadow: `var(${entry.token})`,
          display: 'grid',
          placeItems: 'center',
          border: isDark ? 'none' : '1px solid #f1f5f9',
        }}
      >
        <strong
          style={{
            fontSize: 13,
            color: isDark ? '#ffffff' : '#152433',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {entry.name}
        </strong>
      </div>
      <div style={{ display: 'grid', gap: 4, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
        <code
          style={{
            fontSize: 12,
            color: '#0f172a',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          {entry.token}
        </code>
        {entry.description ? (
          <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{entry.description}</span>
        ) : null}
        <span
          style={{
            fontSize: 11,
            color: '#64748b',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          {value || '(unresolved)'}
        </span>
      </div>
    </div>
  );
}

function ShadowGrid({ entries }: { entries: ShadowEntry[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16,
      }}
    >
      {entries.map((entry) => (
        <ShadowCard key={entry.token} entry={entry} />
      ))}
    </div>
  );
}

const meta = {
  component: FoundationsPage,
  title: 'Foundations/Shadow',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Shadow tokens organised in three tiers:\n\n1. **Primitives** (`shadow.sm` / `md` / `lg`) — raw size-based values that semantic tokens reference.\n2. **Desktop semantics** (`shadow.card` / `hover` / `overlay`) — purpose-named aliases used by web/desktop components.\n3. **Mobile semantics** (`shadow.mobile.*`) — purpose-named tokens for native components: selection cards, button edges, bottom navigation, collapsible panels.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ShadowHero = ({ title, description }: { title: string; description: string }) => (
  <FoundationsHero eyebrow="Foundations" title={title} description={description} />
);

export const Overview: Story = {
  render: () => (
    <FoundationsPage>
      <ShadowHero
        title="Shadow"
        description="Three tiers: raw primitives, purpose-named desktop semantics, and platform-scoped mobile semantics. Consume from CSS variables on web or via @brankas/native on React Native."
      />
      <FoundationsSection
        title="Primitives"
        description="Raw size-based shadows. Use as building blocks; prefer semantic tokens in components."
      >
        <ShadowGrid entries={PRIMITIVE_SHADOWS} />
      </FoundationsSection>
      <FoundationsSection
        title="Desktop semantics"
        description="Purpose-named aliases for web/desktop surfaces."
      >
        <ShadowGrid entries={DESKTOP_SEMANTIC_SHADOWS} />
      </FoundationsSection>
      <FoundationsSection
        title="Mobile semantics"
        description="Purpose-named shadows for React Native. Available via tokens.shadow.mobile.* in @brankas/native — already RN-shaped (shadowColor / shadowOffset / shadowOpacity / shadowRadius / elevation)."
      >
        <ShadowGrid entries={MOBILE_SEMANTIC_SHADOWS} />
      </FoundationsSection>
    </FoundationsPage>
  ),
};

export const Primitives: Story = {
  render: () => (
    <FoundationsPage>
      <ShadowHero
        title="Shadow — Primitives"
        description="Raw size-based shadows. Building blocks for semantic aliases."
      />
      <FoundationsSection title="Primitive ramp">
        <ShadowGrid entries={PRIMITIVE_SHADOWS} />
      </FoundationsSection>
    </FoundationsPage>
  ),
};

export const Desktop: Story = {
  render: () => (
    <FoundationsPage>
      <ShadowHero
        title="Shadow — Desktop"
        description="Purpose-named aliases for web surfaces. These are what desktop components consume."
      />
      <FoundationsSection title="Desktop semantics">
        <ShadowGrid entries={DESKTOP_SEMANTIC_SHADOWS} />
      </FoundationsSection>
    </FoundationsPage>
  ),
};

export const Mobile: Story = {
  render: () => (
    <FoundationsPage>
      <ShadowHero
        title="Shadow — Mobile"
        description="Purpose-named shadows for React Native. Available via tokens.shadow.mobile.* in @brankas/native, pre-converted to the RN style shape."
      />
      <FoundationsSection title="Mobile semantics">
        <ShadowGrid entries={MOBILE_SEMANTIC_SHADOWS} />
      </FoundationsSection>
    </FoundationsPage>
  ),
};
