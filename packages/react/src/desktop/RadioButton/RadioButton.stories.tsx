import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { RadioButton } from './RadioButton';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=46-1710&m=dev';

const meta = {
  title: 'Desktop UI/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    description: undefined,
    helperText: undefined,
    size: 'default',
    disabled: false,
    defaultChecked: false,
    state: 'default',
    name: 'storybook-radio',
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Mutually exclusive choices in a visible option set. Groups via the native `name` prop; arrow keys move between radios in the same group. Use Select when the option list is long.',
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
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

function RadioGroupStory(args: ComponentProps<typeof RadioButton>) {
  const [value, setValue] = useState('option-a');

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <RadioButton
        {...args}
        name="plan"
        checked={value === 'option-a'}
        label="Plan A"
        description="Best for lightweight workflows."
        onChange={(event) => {
          setValue(event.currentTarget.value);
          args.onChange?.(event);
        }}
        value="option-a"
      />
      <RadioButton
        {...args}
        name="plan"
        checked={value === 'option-b'}
        label="Plan B"
        description="Works well for more advanced teams."
        onChange={(event) => {
          setValue(event.currentTarget.value);
          args.onChange?.(event);
        }}
        value="option-b"
      />
    </div>
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
  return (
    <RadioButton
      aria-label={`${state} ${checked ? 'checked' : 'unchecked'} ${size}`}
      size={size}
      state={state}
      checked={checked}
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
    helperText: 'Use this when only one option can be selected in a group.',
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
  render: (args) => <RadioGroupStory {...args} />,
};

export const InteractionSelection: Story = {
  render: (args) => <RadioGroupStory {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const optionB = canvas.getByRole('radio', { name: /plan b/i });
    await userEvent.click(optionB);

    await expect(optionB).toBeChecked();
    await expect(args.onChange).toHaveBeenCalled();
  },
};
