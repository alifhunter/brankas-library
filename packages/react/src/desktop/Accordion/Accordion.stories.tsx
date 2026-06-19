import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Accordion } from './Accordion';
import type { AccordionProps } from './Accordion.types';

const FIGMA_DESIGN_URL = 'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=351-15576&t=cbDdJkf2R9sCvLxn-4';

function StoryHarness(args: AccordionProps) {
  const { defaultOpen = false, onOpenChange, ...rest } = args;
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <Accordion
      {...rest}
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        onOpenChange?.(nextOpen);
      }}
    />
  );
}

const meta = {
  title: 'Desktop UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    title: 'Title',
    state: 'default',
    defaultOpen: false,
    showLeadingIcon: true,
    actionLabel: undefined,
    onOpenChange: fn(),
    onActionClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Progressively disclose supporting content without leaving the page. The header is a button that toggles a panel below it; multiple accordions can be open at once.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    open: { control: false },
    children: { control: false },
    className: { control: false },
    contentClassName: { control: false },
    leadingIcon: { control: false },
    onOpenChange: { control: false },
    onActionClick: { control: false },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover'],
    },
    defaultOpen: {
      control: 'boolean',
    },
  },
  render: (args) => <StoryHarness {...args} />,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CollapsedDefault: Story = {};

export const CollapsedHover: Story = {
  args: {
    state: 'hover',
  },
};

export const ExpandedDefault: Story = {
  args: {
    defaultOpen: true,
  },
};

export const ExpandedHover: Story = {
  args: {
    defaultOpen: true,
    state: 'hover',
  },
};

export const WithActionButton: Story = {
  args: {
    actionLabel: 'Button',
  },
};

export const WithCustomContent: Story = {
  args: {
    defaultOpen: true,
    children: (
      <div
        style={{
          padding: 16,
          border: '1px solid #e0e6ed',
          borderRadius: 12,
          background: '#ffffff',
          display: 'grid',
          gap: 8,
        }}
      >
        <strong style={{ fontSize: 14, lineHeight: '20px' }}>Accordion content</strong>
        <span style={{ fontSize: 13, lineHeight: '18px', color: '#5e5e5e' }}>
          This area can render any local component.
        </span>
      </div>
    ),
  },
};

export const InteractionToggle: Story = {
  args: {
    title: 'FAQ',
    defaultOpen: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'FAQ' });

    await userEvent.click(trigger);

    await expect(canvas.getByRole('region')).toBeInTheDocument();
    await expect(args.onOpenChange).toHaveBeenCalledWith(true);

    await userEvent.click(trigger);

    await expect(canvas.queryByRole('region')).not.toBeInTheDocument();
    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};
