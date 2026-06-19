import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TextField } from './TextField';

const FIGMA_DESIGN_URL = 'https://www.figma.com/file/REPLACE_WITH_TEXTFIELD_FIGMA_URL';

const meta = {
  title: 'Desktop UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Title',
    placeholder: 'Content',
    size: '48px',
    state: 'default',
    helperTextTop: undefined,
    helperText: 'Helper text di bawah text area',
    errorMessage: undefined,
    counterText: undefined,
    disabled: false,
    required: false,
    showLeadingIcon: true,
    showTrailingIcon: true,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Single-line free-form input for short text, IDs, emails, and similar entries. Supports leading/trailing icons, helper text, counter, and validation states (focused, filled, error).',
      },
    },
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['48px', 'default'],
    },
    state: {
      control: 'inline-radio',
      options: ['default', 'focused', 'typing', 'filled', 'disabled', 'error-default', 'error-filled'],
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledTextFieldStory(args: ComponentProps<typeof TextField>) {
  const [value, setValue] = useState('');

  return (
    <TextField
      {...args}
      value={value}
      onChange={(event) => {
        setValue(event.currentTarget.value);
        args.onChange?.(event);
      }}
    />
  );
}

export const Default48: Story = {
  args: {
    size: '48px',
    state: 'default',
  },
};

export const DefaultCompact: Story = {
  args: {
    size: 'default',
    state: 'default',
  },
};

export const Focused: Story = {
  args: {
    size: '48px',
    state: 'focused',
  },
};

export const Filled: Story = {
  args: {
    size: '48px',
    state: 'filled',
    value: 'Filled',
  },
};

export const Disabled: Story = {
  args: {
    size: '48px',
    state: 'disabled',
    value: 'Filled',
  },
};

export const ErrorDefault: Story = {
  args: {
    size: '48px',
    state: 'error-default',
    errorMessage: 'Error text di bawah text area',
    helperText: undefined,
  },
};

export const ErrorFilled: Story = {
  args: {
    size: '48px',
    state: 'error-filled',
    value: 'Filled',
    errorMessage: 'Error text di bawah text area',
    helperText: undefined,
  },
};

export const WithTopHelperAndCounter: Story = {
  args: {
    helperTextTop: 'Helper text di atas text area',
    helperText: 'Helper text di bawah text area',
    counterText: '0/250',
  },
};

export const Controlled: Story = {
  render: (args) => <ControlledTextFieldStory {...args} />,
};

export const InteractionTyping: Story = {
  args: {
    label: 'Search',
    placeholder: 'Find component',
    helperText: undefined,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Search');

    await userEvent.type(input, 'Button');

    await expect(input).toHaveValue('Button');
    await expect(args.onChange).toHaveBeenCalled();
  },
};
