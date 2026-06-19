import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=657-7700';

const meta = {
  title: 'Desktop UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    shape: 'rectangle',
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        component: 'Layout-preserving placeholder shown while content is loading. Two shapes (rectangle, circle) with configurable size and a subtle shimmer animation (disabled under `prefers-reduced-motion`).',
      },
    },
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    shape: { control: 'inline-radio', options: ['rectangle', 'circle'] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rectangle: Story = {};

export const Circle: Story = {
  args: { shape: 'circle' },
};

export const Static: Story = {
  args: { animated: false },
};

export const CustomSize: Story = {
  args: { width: 320, height: 16, radius: 8 },
};

export const Lines: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 320 }}>
      <Skeleton width="100%" height={16} />
      <Skeleton width="80%" height={16} />
      <Skeleton width="60%" height={16} />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const CardPlaceholder: Story = {
  name: 'Pattern · Card placeholder',
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 12,
        padding: 16,
        width: 360,
        background: 'var(--color-background-default)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton shape="circle" width={40} />
        <div style={{ display: 'grid', gap: 6, flex: 1 }}>
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton width="100%" height={120} radius={12} />
      <Skeleton width="90%" height={12} />
      <Skeleton width="70%" height={12} />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

function CycleStory() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setLoading((v) => !v), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        width: 360,
        background: 'var(--color-background-default)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 12,
      }}
    >
      {loading ? (
        <>
          <Skeleton shape="circle" width={40} />
          <div style={{ display: 'grid', gap: 6, flex: 1 }}>
            <Skeleton width="60%" height={14} />
            <Skeleton width="40%" height={12} />
          </div>
        </>
      ) : (
        <>
          <span
            aria-hidden="true"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'var(--color-blue-b500)',
              color: 'var(--color-text-inverse)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--brankas-typography-desktop-body-lg-semibold-font-family)',
              fontSize: 'var(--brankas-typography-desktop-body-lg-semibold-font-size)',
              fontWeight: 'var(--brankas-typography-desktop-body-lg-semibold-font-weight)',
              lineHeight: 'var(--brankas-typography-desktop-body-lg-semibold-line-height)',
            }}
          >
            JL
          </span>
          <div style={{ display: 'grid', gap: 4, flex: 1 }}>
            <strong
              style={{
                fontFamily: 'var(--brankas-typography-desktop-body-md-semibold-font-family)',
                fontSize: 'var(--brankas-typography-desktop-body-md-semibold-font-size)',
                fontWeight: 'var(--brankas-typography-desktop-body-md-semibold-font-weight)',
                lineHeight: 'var(--brankas-typography-desktop-body-md-semibold-line-height)',
                color: 'var(--color-text-default)',
              }}
            >
              John Legend
            </strong>
            <span
              style={{
                fontFamily: 'var(--brankas-typography-desktop-body-sm-regular-font-family)',
                fontSize: 'var(--brankas-typography-desktop-body-sm-regular-font-size)',
                fontWeight: 'var(--brankas-typography-desktop-body-sm-regular-font-weight)',
                lineHeight: 'var(--brankas-typography-desktop-body-sm-regular-line-height)',
                color: 'var(--color-text-subtlest)',
              }}
            >
              Member since 2024
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export const LoadingToContent: Story = {
  name: 'Pattern · Loading → content cycle',
  render: () => <CycleStory />,
  parameters: { controls: { disable: true } },
};
