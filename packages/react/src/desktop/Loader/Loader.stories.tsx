import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from './Loader';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=952-518';

const meta = {
  title: 'Desktop UI/Loader',
  component: Loader,
  tags: ['autodocs'],
  args: {
    size: 64,
    inverse: false,
    label: 'Loading',
  },
  parameters: {
    docs: {
      description: {
        component: 'Indeterminate SVG spinner for short waits when total progress is unknown. Color is editable via `color` prop or `currentColor` inheritance; respects `prefers-reduced-motion`.',
      },
    },
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 128, step: 4 } },
    thickness: { control: { type: 'range', min: 1, max: 16, step: 1 } },
    color: { control: 'color' },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 24 } };
export const Medium: Story = { args: { size: 40 } };
export const Large: Story = { args: { size: 96 } };

export const Inverse: Story = {
  args: { inverse: true },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: '#152433', borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomColor: Story = {
  args: { color: 'var(--color-text-information)' },
};

export const RedAccent: Story = {
  args: { color: '#ed1c24' },
};

export const InheritedColor: Story = {
  render: (args) => (
    <div style={{ color: '#8347ad' /* purple */ }}>
      <Loader {...args} />
    </div>
  ),
};

export const SizeScale: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Loader size={16} />
      <Loader size={24} />
      <Loader size={40} />
      <Loader size={64} />
      <Loader size={96} />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
