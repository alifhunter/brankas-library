import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Checkbox } from './Checkbox';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=44-278';

const meta = {
  title: 'Desktop UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    description: undefined,
    helperText: undefined,
    errorMessage: undefined,
    size: 'default',
    disabled: false,
    defaultChecked: false,
    indeterminate: false,
    error: false,
    state: 'default',
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Independent binary choices or multi-select groups. Supports checked, unchecked, indeterminate, disabled, and error states with optional description/helper/error message.',
      },
    },
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    checked: { control: false },
    defaultChecked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    size: {
      control: 'inline-radio',
      options: ['default', 'small'],
    },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover', 'focused', 'disabled'],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function CheckboxGroupStory(args: ComponentProps<typeof Checkbox>) {
  const [selected, setSelected] = useState<string[]>(['jawa-barat', 'jawa-tengah']);
  const options = [
    { value: 'dki-jakarta', label: 'DKI Jakarta' },
    { value: 'jawa-barat', label: 'Jawa Barat' },
    { value: 'jawa-tengah', label: 'Jawa Tengah' },
    { value: 'jawa-timur', label: 'Jawa Timur' },
  ];

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {options.map((option) => (
        <Checkbox
          {...args}
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selected.includes(option.value)}
          onChange={(event) => {
            const isChecked = event.currentTarget.checked;
            setSelected((prev) =>
              isChecked ? [...prev, option.value] : prev.filter((v) => v !== option.value),
            );
            args.onChange?.(event);
          }}
        />
      ))}
    </div>
  );
}

function MatrixItem({
  state,
  checked,
  indeterminate,
  error,
}: {
  state: 'default' | 'hover' | 'focused' | 'disabled';
  checked?: boolean;
  indeterminate?: boolean;
  error?: boolean;
}) {
  return (
    <Checkbox
      aria-label={`${state} ${error ? 'error ' : ''}${
        indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'
      }`}
      state={state}
      checked={checked}
      indeterminate={indeterminate}
      error={error}
      readOnly
    />
  );
}

function FigmaMatrixStory() {
  const states: Array<'default' | 'hover' | 'focused' | 'disabled'> = [
    'default',
    'hover',
    'focused',
    'disabled',
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, min-content)',
        rowGap: '20px',
        columnGap: '80px',
        alignItems: 'center',
      }}
    >
      {states.map((state) => (
        <MatrixItem key={`unchecked-${state}`} state={state} checked={false} />
      ))}
      {states.map((state) => (
        <MatrixItem key={`checked-${state}`} state={state} checked />
      ))}
      {states.map((state) => (
        <MatrixItem key={`indeterminate-${state}`} state={state} indeterminate />
      ))}
      {states.map((state) => (
        <MatrixItem key={`error-${state}`} state={state} error />
      ))}
    </div>
  );
}

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Send weekly digest',
    description: 'A summary of activity from the past 7 days.',
  },
};

export const LabelOverflow: Story = {
  args: {
    label: 'Label will overflow if wider than container.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200, padding: 10, background: '#fff', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
};

export const Error: Story = {
  args: {
    label: 'I accept the terms',
    error: true,
    errorMessage: 'Error message',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    disabled: true,
    defaultChecked: true,
    label: 'Selected disabled',
  },
};

export const FigmaMatrix: Story = {
  render: () => <FigmaMatrixStory />,
  parameters: {
    controls: { disable: true },
  },
};

export const Group: Story = {
  render: (args) => <CheckboxGroupStory {...args} />,
  args: { label: undefined },
};

export const InteractionToggle: Story = {
  args: { label: 'Stay signed in?' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: /stay signed in/i });

    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onChange).toHaveBeenCalled();
  },
};
