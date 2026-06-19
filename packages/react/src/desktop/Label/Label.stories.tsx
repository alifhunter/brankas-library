import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Label } from './Label';
import type { LabelVariant } from './Label.types';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=468-6826';

const meta = {
  title: 'Desktop UI/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Warning label',
    variant: 'warning',
    icon: true,
  },
  parameters: {
    docs: {
      description: {
        component: 'Pill-shaped label for status, sentiment, or classification. Five variants (neutral, information, positive, warning, negative) with optional icon. Becomes interactive when `onClick` is set.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['neutral', 'information', 'positive', 'warning', 'negative'],
    },
    icon: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Information: Story = {
  args: { variant: 'information', children: 'Information' },
};

export const Positive: Story = {
  args: { variant: 'positive', children: 'Positive' },
};

export const Negative: Story = {
  args: { variant: 'negative', children: 'Negative' },
};

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Neutral' },
};

export const WithoutIcon: Story = {
  args: { icon: false },
};

export const Interactive: Story = {
  args: {
    variant: 'information',
    children: 'Click me',
    onClick: fn(),
  },
};

export const Matrix: Story = {
  render: () => {
    const variants: LabelVariant[] = ['warning', 'information', 'positive', 'negative', 'neutral'];
    const labels: Record<LabelVariant, string> = {
      warning: 'Warning label',
      information: 'Information',
      positive: 'Positive',
      negative: 'Negative',
      neutral: 'Neutral',
    };
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, max-content)', gap: 12 }}>
        {variants.map((v) => (
          <Label key={`${v}-icon`} variant={v}>
            {labels[v]}
          </Label>
        ))}
        {variants.map((v) => (
          <Label key={`${v}-noicon`} variant={v} icon={false}>
            {labels[v]}
          </Label>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
