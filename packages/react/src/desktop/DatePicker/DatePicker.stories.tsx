import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DatePicker } from './DatePicker';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=351-21042';

const meta = {
  title: 'Desktop UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {
    defaultMonth: new Date(2025, 11, 1),
    defaultValue: new Date(2025, 11, 12),
    showInfo: false,
    showActions: false,
    weekStartsOn: 0,
    onChange: fn(),
    onReset: fn(),
    onCancel: fn(),
    onConfirm: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Real interactive calendar for selecting a date, month, or year. Three views (date grid, month, year), min/max constraints, Sunday/Monday week start, optional info and Reset/Cancel/Confirm actions.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    value: { control: false },
    month: { control: false },
    defaultValue: { control: false },
    defaultMonth: { control: false },
    weekStartsOn: {
      control: 'inline-radio',
      options: [0, 1],
    },
    view: {
      control: 'inline-radio',
      options: [undefined, 'date', 'month', 'year'],
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SixRowMonth: Story = {
  args: {
    defaultMonth: new Date(2025, 10, 1), // November 2025 has 6 visible weeks
    defaultValue: new Date(2025, 10, 7),
  },
};

export const MonthSelector: Story = {
  args: {
    defaultView: 'month',
  },
};

export const YearSelector: Story = {
  args: {
    defaultView: 'year',
  },
};

export const WithInfo: Story = {
  args: {
    showInfo: true,
    infoMessage: 'Select a date within the booking window.',
  },
};

export const WithActions: Story = {
  args: {
    showActions: true,
  },
};

export const WithInfoAndActions: Story = {
  args: {
    showInfo: true,
    showActions: true,
  },
};

export const ConstrainedRange: Story = {
  args: {
    defaultMonth: new Date(2025, 11, 1),
    defaultValue: null,
    min: new Date(2025, 11, 10),
    max: new Date(2025, 11, 20),
    showInfo: true,
    infoMessage: 'Available range: Dec 10 – Dec 20',
  },
};

export const MondayWeekStart: Story = {
  args: {
    weekStartsOn: 1,
  },
};

function ControlledStory() {
  const [value, setValue] = useState<Date | null>(new Date(2025, 11, 12));
  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
      <DatePicker
        value={value}
        onChange={setValue}
        defaultMonth={new Date(2025, 11, 1)}
        showActions
        onReset={() => setValue(null)}
      />
      <output style={{ fontFamily: 'monospace', fontSize: 13 }}>
        Selected: {value ? value.toDateString() : '—'}
      </output>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};
