import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Badge } from './Badge';

const FIGMA_DESIGN_URL = 'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=84-4540&t=cbDdJkf2R9sCvLxn-4';

const meta = {
  title: 'Desktop UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    type: 'number',
    color: 'gray',
    text: '9',
  },
  parameters: {
    docs: {
      description: {
        component: 'Counts, short labels, or lightweight emphasis on a parent element. Four colors (gray, primary, blue, red) and three types (number, dot, new).',
      },
    },
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    className: { control: false },
    type: {
      control: 'inline-radio',
      options: ['number', 'dot', 'new'],
    },
    color: {
      control: 'inline-radio',
      options: ['gray', 'primary', 'red', 'blue'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumberGray: Story = {};

export const NumberRed: Story = {
  args: {
    color: 'red',
  },
};

export const NumberBlue: Story = {
  args: {
    color: 'blue',
  },
};

export const NumberPrimary: Story = {
  args: {
    color: 'primary',
  },
};

export const DotRed: Story = {
  args: {
    type: 'dot',
    color: 'red',
  },
};

export const DotBlue: Story = {
  args: {
    type: 'dot',
    color: 'blue',
  },
};

export const NewRed: Story = {
  args: {
    type: 'new',
    color: 'red',
  },
};

export const NewBlue: Story = {
  args: {
    type: 'new',
    color: 'blue',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      data-testid="badge-grid"
      style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: '40px 40px 56px',
        alignItems: 'center',
      }}
    >
      <Badge type="number" color="gray" text="9" />
      <div />
      <div />

      <Badge type="number" color="red" text="9" />
      <Badge type="dot" color="red" />
      <Badge type="new" color="red" />

      <Badge type="number" color="blue" text="9" />
      <Badge type="dot" color="blue" />
      <Badge type="new" color="blue" />

      <Badge type="number" color="primary" text="9" />
      <div />
      <div />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badgeElements = canvas.getByTestId('badge-grid').querySelectorAll('.ui-badge');
    await expect(badgeElements.length).toBe(8);
  },
};
