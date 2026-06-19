import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbItem } from './Breadcrumb.types';

const FIGMA_DESIGN_URL = 'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=325-60782&t=cbDdJkf2R9sCvLxn-4';

const FRAME_1_ITEMS: BreadcrumbItem[] = [{ label: 'Root' }, { label: 'Placeholder' }];
const FRAME_2_ITEMS: BreadcrumbItem[] = [{ label: 'Root' }, { label: 'Placeholder' }, { label: 'Placeholder' }];
const FRAME_3_ITEMS: BreadcrumbItem[] = [
  { label: 'Root' },
  { label: 'Placeholder' },
  { label: 'Root' },
  { label: 'Placeholder' },
];
const FRAME_4_ITEMS: BreadcrumbItem[] = [
  { label: 'Root' },
  { label: 'Placeholder' },
  { label: 'Placeholder' },
  { label: 'Placeholder' },
  { label: 'Placeholder' },
];
const FRAME_5_ITEMS: BreadcrumbItem[] = [
  { label: 'Root' },
  { label: 'Placeholder' },
  { label: 'Placeholder' },
  { label: 'Placeholder' },
  { label: 'Placeholder' },
  { label: 'Placeholder' },
];

const meta = {
  title: 'Desktop UI/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: FRAME_1_ITEMS,
    collapseAfter: 5,
    onItemClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Show hierarchy and let users navigate to parent pages. Wraps in a `nav` landmark, supports `collapseAfter` to truncate long paths, and marks the current page non-clickable.',
      },
    },
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    className: { control: false },
    items: { control: false },
    onItemClick: { control: false },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Frame1: Story = {
  args: {
    items: FRAME_1_ITEMS,
  },
};

export const Frame2: Story = {
  args: {
    items: FRAME_2_ITEMS,
  },
};

export const Frame3: Story = {
  args: {
    items: FRAME_3_ITEMS,
  },
};

export const Frame4: Story = {
  args: {
    items: FRAME_4_ITEMS,
  },
};

export const Frame5WithEllipsis: Story = {
  args: {
    items: FRAME_5_ITEMS,
    collapseAfter: 5,
  },
};

export const InteractionClick: Story = {
  args: {
    items: FRAME_2_ITEMS,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByRole('button', { name: 'Root' });

    await userEvent.click(root);

    await expect(args.onItemClick).toHaveBeenCalled();
  },
};
