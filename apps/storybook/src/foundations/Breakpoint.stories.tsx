import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FoundationsHero,
  FoundationsPage,
  FoundationsSection,
} from './foundationShared';

const BREAKPOINTS = [
  {
    name: 'Mobile',
    rule: '@media (max-width: 768px)',
    usage: 'Accordion, Banner, Dialog — components that adapt at small widths.',
  },
  {
    name: 'Desktop+',
    rule: 'Default styles (>= 768px)',
    usage: 'Baseline for every desktop component.',
  },
] as const;

const meta = {
  component: FoundationsPage,
  title: 'Foundations/Breakpoint',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <FoundationsPage>
      <FoundationsHero
        eyebrow="Foundations"
        title="Breakpoints"
        description="The media-query boundaries components currently respond to. Mobile-first: write desktop styles as the baseline, then narrow to mobile with a max-width query where needed."
      />
      <FoundationsSection
        title="Breakpoint reference"
        description="These reflect the breakpoints actually used inside component CSS today — keep them aligned when adding new responsive behaviour."
      >
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
                {['Name', 'Rule', 'Usage'].map((label) => (
                  <th
                    key={label}
                    style={{
                      textAlign: 'left',
                      padding: '10px 16px',
                      borderBottom: '1px solid #e2e8f0',
                      color: '#475569',
                      fontWeight: 600,
                      fontSize: 12,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BREAKPOINTS.map((item, index) => (
                <tr
                  key={item.name}
                  style={{ background: index % 2 === 0 ? '#ffffff' : '#fafbfd' }}
                >
                  <td
                    style={{
                      padding: '10px 16px',
                      borderBottom:
                        index === BREAKPOINTS.length - 1 ? 'none' : '1px solid #f1f5f9',
                      fontWeight: 600,
                    }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{
                      padding: '10px 16px',
                      borderBottom:
                        index === BREAKPOINTS.length - 1 ? 'none' : '1px solid #f1f5f9',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 13,
                      color: '#475569',
                    }}
                  >
                    {item.rule}
                  </td>
                  <td
                    style={{
                      padding: '10px 16px',
                      borderBottom:
                        index === BREAKPOINTS.length - 1 ? 'none' : '1px solid #f1f5f9',
                      color: '#475569',
                    }}
                  >
                    {item.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FoundationsSection>
    </FoundationsPage>
  ),
};
