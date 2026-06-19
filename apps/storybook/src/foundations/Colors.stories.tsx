import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FoundationsHero,
  FoundationsPage,
  FoundationsSection,
  TokenTable,
} from './foundationShared';

type PaletteTone = {
  key: string;
  value: string;
};

type PaletteGroup = {
  label: string;
  key: string;
  tones: PaletteTone[];
};

const COLOR_PALETTE: PaletteGroup[] = [
  {
    label: 'Primary',
    key: 'primary',
    tones: [
      { key: 'blue', value: '#152433' },
      { key: 'red', value: '#c10e0e' },
      { key: 'logo', value: '#ed1c24' },
    ],
  },
  {
    label: 'Neutral',
    key: 'neutral',
    tones: [
      { key: 'n0', value: '#ffffff' },
      { key: 'n50', value: '#f7f7f7' },
      { key: 'n100', value: '#f2f2f2' },
      { key: 'n200', value: '#ebebeb' },
      { key: 'n300', value: '#e0e0e0' },
      { key: 'n400', value: '#d6d6d6' },
      { key: 'n500', value: '#b6b6b6' },
      { key: 'n600', value: '#8d8d8d' },
      { key: 'n700', value: '#737373' },
      { key: 'n800', value: '#5e5e5e' },
      { key: 'n900', value: '#3d3d3d' },
      { key: 'n950', value: '#2e2e2e' },
      { key: 'n1000', value: '#000000' },
    ],
  },
  {
    label: 'Cool Gray',
    key: 'cool-gray',
    tones: [
      { key: 'cg-0', value: '#f7f9fa' },
      { key: 'cg-50', value: '#f2f4f5' },
      { key: 'cg-100', value: '#e0e6ed' },
      { key: 'cg-200', value: '#d3dae5' },
      { key: 'cg-300', value: '#c0c7d1' },
      { key: 'cg-400', value: '#a7adb8' },
      { key: 'cg-500', value: '#838892' },
      { key: 'cg-600', value: '#5e626a' },
      { key: 'cg-700', value: '#404248' },
      { key: 'cg-800', value: '#2b2c30' },
      { key: 'cg-900', value: '#1e1f23' },
    ],
  },
  {
    label: 'Red',
    key: 'red',
    tones: [
      { key: 'r50', value: '#fff5f5' },
      { key: 'r100', value: '#ffbfbf' },
      { key: 'r200', value: '#f29191' },
      { key: 'r300', value: '#eb6c6c' },
      { key: 'r400', value: '#d65656' },
      { key: 'r500', value: '#be4848' },
      { key: 'r600', value: '#963939' },
      { key: 'r700', value: '#6e2a2a' },
      { key: 'r800', value: '#4f1e1e' },
      { key: 'r900', value: '#331313' },
      { key: 'r950', value: '#1a0a0a' },
    ],
  },
  {
    label: 'Green',
    key: 'green',
    tones: [
      { key: 'g50', value: '#f2fdf5' },
      { key: 'g100', value: '#c0f2ce' },
      { key: 'g200', value: '#8fe6a7' },
      { key: 'g300', value: '#57d179' },
      { key: 'g400', value: '#36c45d' },
      { key: 'g500', value: '#2daa50' },
      { key: 'g600', value: '#229743' },
      { key: 'g700', value: '#1e7737' },
      { key: 'g800', value: '#1d5e30' },
      { key: 'g900', value: '#1a4d2a' },
      { key: 'g950', value: '#04150a' },
    ],
  },
  {
    label: 'Blue',
    key: 'blue',
    tones: [
      { key: 'b50', value: '#f6f9fe' },
      { key: 'b100', value: '#b2dcff' },
      { key: 'b200', value: '#7abdf5' },
      { key: 'b300', value: '#48a3f0' },
      { key: 'b400', value: '#2d8fe0' },
      { key: 'b500', value: '#1c77c3' },
      { key: 'b600', value: '#165d99' },
      { key: 'b700', value: '#104673' },
      { key: 'b800', value: '#0b304f' },
      { key: 'b900', value: '#082238' },
      { key: 'b950', value: '#04101a' },
    ],
  },
  {
    label: 'Orange',
    key: 'orange',
    tones: [
      { key: 'o50', value: '#fffaf0' },
      { key: 'o100', value: '#ffdebf' },
      { key: 'o200', value: '#ffc999' },
      { key: 'o300', value: '#ffb573' },
      { key: 'o400', value: '#f5a258' },
      { key: 'o500', value: '#e08e45' },
      { key: 'o600', value: '#bf6b34' },
      { key: 'o700', value: '#944b21' },
      { key: 'o800', value: '#663014' },
      { key: 'o900', value: '#3d1b0c' },
      { key: 'o950', value: '#210f07' },
    ],
  },
  {
    label: 'Yellow',
    key: 'yellow',
    tones: [
      { key: 'y50', value: '#fffaf0' },
      { key: 'y100', value: '#ffeabf' },
      { key: 'y200', value: '#ffdd99' },
      { key: 'y300', value: '#ffcc66' },
      { key: 'y400', value: '#ffc347' },
      { key: 'y500', value: '#fbb117' },
      { key: 'y600', value: '#d4920b' },
      { key: 'y700', value: '#ab7300' },
      { key: 'y800', value: '#785100' },
      { key: 'y900', value: '#4d3400' },
      { key: 'y950', value: '#2b1d00' },
    ],
  },
  {
    label: 'Purple',
    key: 'purple',
    tones: [
      { key: 'p50', value: '#fbf5ff' },
      { key: 'p100', value: '#e5bfff' },
      { key: 'p200', value: '#d89eff' },
      { key: 'p300', value: '#b877e5' },
      { key: 'p400', value: '#9d5acc' },
      { key: 'p500', value: '#8347ad' },
      { key: 'p600', value: '#703d94' },
      { key: 'p700', value: '#5d327a' },
      { key: 'p800', value: '#4a2861' },
      { key: 'p900', value: '#361d47' },
      { key: 'p950', value: '#23132e' },
    ],
  },
  {
    label: 'Neon',
    key: 'neon',
    tones: [
      { key: 'neon100', value: '#21ff37' },
      { key: 'neon70', value: '#17b627' },
    ],
  },
];

const COLOR_TOKEN_GROUPS = COLOR_PALETTE.map((group) => ({
  label: group.label,
  tokens: group.tones.map((tone) => `--color-${group.key}-${tone.key}`),
}));

const SEMANTIC_COLOR_TOKEN_GROUPS = [
  {
    label: 'Text',
    tokens: [
      '--color-text-default',
      '--color-text-subtle',
      '--color-text-subtlest',
      '--color-text-gray',
      '--color-text-success',
      '--color-text-error',
      '--color-text-warning',
      '--color-text-information',
      '--color-text-disabled',
      '--color-text-brand',
      '--color-text-inverse',
      '--color-text-selected',
    ],
  },
  {
    label: 'Icon',
    tokens: [
      '--color-icon-default',
      '--color-icon-subtle',
      '--color-icon-subtlest',
      '--color-icon-gray',
      '--color-icon-success',
      '--color-icon-error',
      '--color-icon-warning',
      '--color-icon-information',
      '--color-icon-disabled',
      '--color-icon-brand',
      '--color-icon-inverse',
      '--color-icon-selected',
    ],
  },
  {
    label: 'Border',
    tokens: [
      '--color-border-default',
      '--color-border-subtle',
      '--color-border-subtlest',
      '--color-border-focused',
      '--color-border-success',
      '--color-border-error',
      '--color-border-warning',
      '--color-border-information',
      '--color-border-disabled',
      '--color-border-brand',
      '--color-border-inverse',
      '--color-border-selected',
    ],
  },
  {
    label: 'Background',
    tokens: [
      '--color-background-default',
      '--color-background-subtle',
      '--color-background-subtlest',
      '--color-background-hover',
      '--color-background-cool-light',
      '--color-background-cool',
      '--color-background-success-light',
      '--color-background-error-light',
      '--color-background-warning-light',
      '--color-background-information-light',
      '--color-background-disabled',
      '--color-background-selected-light',
      '--color-background-success',
      '--color-background-error',
      '--color-background-warning',
      '--color-background-information',
      '--color-background-primary-blue',
      '--color-background-primary-red',
      '--color-background-selected',
      '--color-background-black',
    ],
  },
] as const;

const LEGACY_SEMANTIC_COLOR_TOKENS = [
  '--color-bg',
  '--color-surface',
  '--color-text',
  '--color-muted',
  '--color-border',
  '--color-primary',
  '--color-primary-strong',
  '--color-secondary',
  '--color-ghost',
  '--color-success',
  '--color-danger',
  '--color-danger-soft',
] as const;

function ColorGroup({ group }: { group: PaletteGroup }) {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h4 style={{ margin: 0 }}>{group.label}</h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: 12,
        }}
      >
        {group.tones.map((tone) => {
          const jsonPath = `color.${group.key}.${tone.key}.value`;
          const cssVar = `--color-${group.key}-${tone.key}`;

          return (
            <div
              key={`${group.key}-${tone.key}`}
              style={{
                display: 'grid',
                gap: 8,
                padding: 12,
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                background: '#ffffff',
              }}
            >
              <div
                style={{
                  height: 52,
                  borderRadius: 6,
                  border: '1px solid #e5e7eb',
                  background: tone.value,
                }}
              />
              <code style={{ fontSize: 12 }}>{jsonPath}</code>
              <code style={{ fontSize: 12, color: '#4b5563' }}>{cssVar}</code>
              <span style={{ fontSize: 12 }}>{tone.value.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const meta = {
  component: FoundationsPage,
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const GroupLabel = ({ children }: { children: string }) => (
  <h3
    style={{
      margin: 0,
      fontSize: 15,
      fontWeight: 600,
      color: '#0f172a',
      letterSpacing: '-0.005em',
    }}
  >
    {children}
  </h3>
);

export const Palette: Story = {
  render: () => (
    <FoundationsPage>
      <FoundationsHero
        eyebrow="Foundations"
        title="Colors — Palette"
        description="The primitive ramps every semantic token references. Use these scales as the source of truth, but consume semantic tokens (text.default, background.subtle, border.subtle) in components."
      />
      <FoundationsSection
        title="Primitive ramps"
        description="Each colour family ships with a 50–950 step ramp."
      >
        <div style={{ display: 'grid', gap: 24 }}>
          {COLOR_PALETTE.map((group) => (
            <ColorGroup key={group.key} group={group} />
          ))}
        </div>
      </FoundationsSection>
    </FoundationsPage>
  ),
};

export const Tokens: Story = {
  render: () => (
    <FoundationsPage>
      <FoundationsHero
        eyebrow="Foundations"
        title="Colors — Tokens"
        description="Semantic tokens are purpose-named aliases to the primitive ramps. Components consume these, never raw hex codes."
      />
      <FoundationsSection
        title="Semantic tokens"
        description="Purpose-named tokens that reference primitives. No hex values appear directly here."
      >
        <div style={{ display: 'grid', gap: 18 }}>
          {SEMANTIC_COLOR_TOKEN_GROUPS.map((group) => (
            <div key={group.label} style={{ display: 'grid', gap: 8 }}>
              <GroupLabel>{group.label}</GroupLabel>
              <TokenTable tokens={group.tokens} />
            </div>
          ))}
        </div>
      </FoundationsSection>

      <FoundationsSection
        title="Primitive CSS variables"
        description="Every primitive ramp also emits CSS custom properties. Pull from :root if you need a specific step directly."
      >
        <div style={{ display: 'grid', gap: 18 }}>
          {COLOR_TOKEN_GROUPS.map((group) => (
            <div key={group.label} style={{ display: 'grid', gap: 8 }}>
              <GroupLabel>{group.label}</GroupLabel>
              <TokenTable tokens={group.tokens} />
            </div>
          ))}
        </div>
      </FoundationsSection>

      <FoundationsSection
        title="Legacy aliases"
        description="Older tokens preserved for backwards compatibility. Avoid in new code; prefer the semantic group above."
      >
        <TokenTable tokens={LEGACY_SEMANTIC_COLOR_TOKENS} />
      </FoundationsSection>
    </FoundationsPage>
  ),
};
