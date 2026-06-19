import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';
import type { TooltipPlacement } from './Tooltip.types';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=98-20090';

const meta = {
  title: 'Desktop UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    content: 'Text here.',
    placement: 'top',
    openDelay: 200,
    closeDelay: 100,
    children: <Button>Hover me</Button>,
  },
  parameters: {
    docs: {
      description: {
        component: "Short supplemental information shown on hover or focus. Wraps a single trigger element; auto-flips to the opposite side when near viewport edges. Use for brief clarification only; don't put critical content inside tooltips.",
      },
    },
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    placement: {
      control: 'inline-radio',
      options: ['top', 'bottom', 'left', 'right'] satisfies TooltipPlacement[],
    },
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = { args: { placement: 'top' } };
export const Bottom: Story = { args: { placement: 'bottom' } };
export const Left: Story = { args: { placement: 'left' } };
export const Right: Story = { args: { placement: 'right' } };

export const LongContent: Story = {
  args: {
    content:
      'Tooltips wrap when content exceeds the max-width. Keep them short — long copy belongs in helper text or popovers.',
  },
};

export const NoDelay: Story = {
  args: { openDelay: 0, closeDelay: 0 },
};

export const Disabled: Story = {
  args: { disabled: true, content: 'Should not appear' },
};

export const OnTextSpan: Story = {
  name: 'Trigger · Inline text',
  render: () => (
    <p style={{ maxWidth: 360, fontFamily: 'var(--brankas-typography-desktop-body-md-regular-font-family)' }}>
      We sent a verification link to your email.{' '}
      <Tooltip content="Didn't get it? Check spam or request a resend after 60s." placement="top">
        <span style={{ textDecoration: 'underline', cursor: 'help' }}>Why can't I see it?</span>
      </Tooltip>
    </p>
  ),
  parameters: { controls: { disable: true } },
};

export const AllPlacements: Story = {
  name: 'Pattern · All placements',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, max-content)',
        gap: 48,
        padding: 48,
      }}
    >
      {(['top', 'bottom', 'left', 'right'] as TooltipPlacement[]).map((placement) => (
        <Tooltip key={placement} content={`Placement: ${placement}`} placement={placement}>
          <Button variant="secondary">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const FlipNearViewportEdge: Story = {
  name: 'Pattern · Auto-flip at viewport edge',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, height: 200 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Tooltip content="Prefers top — flips to bottom when near the top edge." placement="top">
          <Button variant="secondary">Near top-left</Button>
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <Tooltip content="Prefers right — flips to left near the right edge." placement="right">
          <Button variant="secondary">Near right edge</Button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
