import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TextArea } from './TextArea';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=126-315';

const meta = {
  title: 'Desktop UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    label: 'Title',
    helperText: 'Helper text di atas text area',
    helperPosition: 'above',
    counterText: '0/250',
    placeholder: 'Content',
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Multi-line free-form input with helper text, character counter, and validation. Helper text can sit above or below the textarea; the bottom-right corner is a vertical resize handle.',
      },
    },
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    helperPosition: {
      control: 'inline-radio',
      options: ['above', 'below'],
    },
    state: {
      control: 'select',
      options: [undefined, 'default', 'filled', 'focused', 'focused-filled', 'disabled', 'error'],
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HelperBelow: Story = {
  args: { helperPosition: 'below', helperText: 'Helper text di bawah text area' },
};

export const Filled: Story = {
  args: { defaultValue: 'Filled' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Disabled' },
};

export const Error: Story = {
  args: {
    helperPosition: 'below',
    errorMessage: 'Error text di bawah text area',
  },
};

export const Required: Story = {
  args: { required: true },
};

function CountedStory() {
  const max = 120;
  const [value, setValue] = useState('');
  const remaining = max - value.length;
  const error =
    value.length > max ? `Maximum ${max} characters` : remaining < 20 ? undefined : undefined;

  return (
    <TextArea
      label="Why are you contacting us?"
      helperPosition="below"
      helperText="Share enough detail so we can route this to the right team."
      counterText={`${value.length}/${max}`}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      {...(error !== undefined ? { errorMessage: error } : {})}
    />
  );
}

export const InteractiveCounter: Story = {
  name: 'Pattern · Live character counter',
  render: () => <CountedStory />,
  parameters: { controls: { disable: true } },
};

export const FigmaMatrix: Story = {
  name: 'Pattern · Figma state matrix',
  render: () => {
    const positions = ['above', 'below'] as const;
    const states = [
      { label: 'Default', state: undefined as const },
      { label: 'Filled', state: undefined, defaultValue: 'Filled' },
      { label: 'Focused', state: 'focused' as const },
      { label: 'Focused Filled', state: 'focused-filled' as const, defaultValue: 'Focused Filled' },
      { label: 'Disabled', state: undefined, disabled: true, defaultValue: 'Disabled' },
      { label: 'Error', state: undefined, errorMessage: 'Error text di bawah text area' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: 32, rowGap: 24 }}>
        {positions.map((pos) => (
          <div key={pos} style={{ display: 'grid', gap: 20 }}>
            <strong style={{ textTransform: 'capitalize' }}>{pos}</strong>
            {states.map((s) => (
              <TextArea
                key={`${pos}-${s.label}`}
                label="Title"
                helperPosition={pos}
                helperText={
                  pos === 'above' ? 'Helper text di atas text area' : 'Helper text di bawah text area'
                }
                counterText="0/250"
                placeholder="Content"
                state={s.state}
                disabled={s.disabled}
                defaultValue={s.defaultValue}
                errorMessage={s.errorMessage}
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
