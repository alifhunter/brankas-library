import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=363-83';

const meta = {
  title: 'Desktop UI/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: {
    value: 50,
    size: 'small',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        component: 'Horizontal bar showing 0–100% completion of a determinate task. Two sizes (small 4px, large 12px) and two variants (default, inverse for dark surfaces). Use Loader for indeterminate waits.',
      },
    },
    layout: 'padded',
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: {
      control: 'inline-radio',
      options: ['small', 'large'],
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'inverse'],
    },
  },
  decorators: [
    (Story, ctx) => (
      <div style={{ width: 328, padding: ctx.args.variant === 'inverse' ? 16 : 0, background: ctx.args.variant === 'inverse' ? '#152433' : 'transparent', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { value: 0 } };
export const Quarter: Story = { args: { value: 25 } };
export const Half: Story = { args: { value: 50 } };
export const Full: Story = { args: { value: 100 } };

export const LargeSmall: Story = {
  args: { value: 50, size: 'large' },
};

export const Inverse: Story = {
  args: { value: 50, variant: 'inverse' },
};

export const InverseLarge: Story = {
  args: { value: 50, size: 'large', variant: 'inverse' },
};

export const Matrix: Story = {
  render: () => {
    const values = [0, 10, 50, 100];
    return (
      <div style={{ display: 'grid', gap: 24 }}>
        <div style={{ display: 'grid', gap: 12, width: 328 }}>
          <strong style={{ fontSize: 12, color: '#8d8d8d' }}>Default · Small</strong>
          {values.map((v) => (
            <ProgressBar key={`d-s-${v}`} value={v} size="small" variant="default" />
          ))}
        </div>
        <div style={{ display: 'grid', gap: 12, width: 328 }}>
          <strong style={{ fontSize: 12, color: '#8d8d8d' }}>Default · Large</strong>
          {values.map((v) => (
            <ProgressBar key={`d-l-${v}`} value={v} size="large" variant="default" />
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gap: 12,
            width: 328,
            padding: 16,
            background: '#152433',
            borderRadius: 8,
          }}
        >
          <strong style={{ fontSize: 12, color: '#cccccc' }}>Inverse · Small</strong>
          {values.map((v) => (
            <ProgressBar key={`i-s-${v}`} value={v} size="small" variant="inverse" />
          ))}
          <strong style={{ fontSize: 12, color: '#cccccc' }}>Inverse · Large</strong>
          {values.map((v) => (
            <ProgressBar key={`i-l-${v}`} value={v} size="large" variant="inverse" />
          ))}
        </div>
      </div>
    );
  },
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <Story />],
};

function AnimatedStory() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : Math.min(100, v + 5)));
    }, 200);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: 'grid', gap: 8, width: 328 }}>
      <ProgressBar value={value} size="large" />
      <output style={{ fontFamily: 'monospace', fontSize: 13 }}>{Math.round(value)}%</output>
    </div>
  );
}

export const Animated: Story = {
  render: () => <AnimatedStory />,
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <Story />],
};
