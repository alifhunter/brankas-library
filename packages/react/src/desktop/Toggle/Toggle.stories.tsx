import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Toggle } from './Toggle';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=46-293&m=dev';

const meta = {
  title: 'Desktop UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    label: 'Enable notifications',
    description: undefined,
    helperText: undefined,
    size: 'default',
    disabled: false,
    defaultChecked: false,
    state: 'default',
    name: 'storybook-toggle',
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Immediate on/off setting that takes effect without form submission. Renders with `role="switch"` so screen readers announce on/off state. Use Checkbox when changes are submitted as part of a form.',
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
    size: {
      control: 'inline-radio',
      options: ['default', 'small'],
    },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover', 'focused', 'disabled'],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToggleGroupStory(args: ComponentProps<typeof Toggle>) {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      {...args}
      checked={checked}
      onChange={(event) => {
        setChecked(event.currentTarget.checked);
        args.onChange?.(event);
      }}
    />
  );
}

function MatrixItem({
  size,
  state,
  checked,
}: {
  size: 'default' | 'small';
  state: 'default' | 'hover' | 'focused' | 'disabled';
  checked: boolean;
}) {
  return <Toggle aria-label={`${state} ${checked ? 'on' : 'off'} ${size}`} size={size} state={state} checked={checked} readOnly />;
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
        columnGap: '55px',
        alignItems: 'center',
      }}
    >
      {states.map((state) => (
        <MatrixItem key={`default-off-${state}`} size="default" state={state} checked={false} />
      ))}
      {states.map((state) => (
        <MatrixItem key={`default-on-${state}`} size="default" state={state} checked />
      ))}
      {states.map((state) => (
        <MatrixItem key={`small-off-${state}`} size="small" state={state} checked={false} />
      ))}
      {states.map((state) => (
        <MatrixItem key={`small-on-${state}`} size="small" state={state} checked />
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

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    disabled: true,
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Use this for a binary on/off preference.',
  },
};

export const FigmaMatrix: Story = {
  render: () => <FigmaMatrixStory />,
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Playground: Story = {
  render: (args) => <ToggleGroupStory {...args} />,
};

export const InteractionSwitch: Story = {
  render: (args) => <ToggleGroupStory {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const toggle = canvas.getByRole('switch', { name: /enable notifications/i });
    await userEvent.click(toggle);

    await expect(toggle).toBeChecked();
    await expect(args.onChange).toHaveBeenCalled();
  },
};
