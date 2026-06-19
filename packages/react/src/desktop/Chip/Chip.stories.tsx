import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Chip } from './Chip';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=344-3706';

const meta = {
  title: 'Desktop UI/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    children: 'Filter',
    selected: false,
    state: 'default',
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Pill-shaped toggle for filters, removable criteria, or category selection. Renders `aria-pressed` to expose selected state; supports leading/trailing icons and a badge slot.',
      },
    },
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    badge: { control: 'text' },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover'],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M6.5 2v3M13.5 2v3M3 7.5h14M16.5 7v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true, children: 'Selected' },
};

export const Hover: Story = {
  args: { state: 'hover' },
};

export const WithBadge: Story = {
  args: { children: 'Inbox', badge: 9 },
};

export const SelectedWithBadge: Story = {
  args: { selected: true, children: 'Active', badge: 9 },
};

export const SelectedWithLeadingIcon: Story = {
  args: { selected: true, children: 'Date range', leadingIcon: <CalendarIcon /> },
};

export const SelectedWithTrailingClose: Story = {
  args: {
    selected: true,
    children: 'Removable',
    trailingIcon: true,
    onTrailingIconClick: fn(),
  },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Unavailable' },
};

function GroupStory() {
  const filters = ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali'];
  const [active, setActive] = useState<string[]>(['Jawa Barat', 'Jawa Tengah']);

  const toggle = (label: string) => {
    setActive((prev) =>
      prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label],
    );
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {filters.map((label) => (
        <Chip key={label} selected={active.includes(label)} onClick={() => toggle(label)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}

export const FilterGroup: Story = {
  render: () => <GroupStory />,
  parameters: { controls: { disable: true } },
};

export const FigmaMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 16 }}>
      <Chip>Unselect</Chip>
      <Chip state="hover">Unselect</Chip>
      <Chip selected trailingIcon>
        Selected
      </Chip>
      <Chip badge={9}>Unselect</Chip>
      <Chip state="hover" badge={9}>
        Unselect
      </Chip>
      <Chip selected badge={9}>
        Selected
      </Chip>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const InteractionToggle: Story = {
  args: { children: 'Toggle me' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button', { name: /toggle me/i });

    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
