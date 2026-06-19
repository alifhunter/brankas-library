import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Svg, { Path } from 'react-native-svg';
import { TextField } from './TextField';
import { PersonIcon } from '../internal/icons';

const ChevronDown = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9l6 6 6-6" stroke="#121516" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const meta = {
  title: 'Mobile UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Title Body Large', onChangeText: fn() },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Single-line input with a floating label. When empty and unfocused the label sits centred as the placeholder (16/24 subtlest). On focus or when filled, it shrinks to a small caption at the top (12/16 semibold) and the value (16/24) renders below it.\n\nThe field uses `background.cool-light` by default, `background.disabled` when disabled, and a red border with an inline error icon and caption when `error` is set.\n\nOptional `leadingIcon` slot for icons (e.g. user, search), `prefix` for currency symbols (`"Rp"`), `trailingIcon` for actions like a chevron, and `clearable` for an inline X that clears the value.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=290-20041',
    },
  },
  decorators: [(Story) => <View style={{ width: 328 }}><Story /></View>],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'Input Field Body Large' } };
export const WithHint: Story = { args: { hint: 'Text Body Small' } };
export const Disabled: Story = { args: { defaultValue: 'Input Field Body Large', disabled: true } };
export const Error: Story = { args: { defaultValue: 'Input Field Body Large', error: 'Text Body Small' } };
export const ErrorEmpty: Story = { args: { error: 'Text Body Small' } };
export const Clearable: Story = {
  args: { defaultValue: 'Sinarmas Terang Silau', clearable: true },
};

export const WithLeadingIcon: Story = {
  args: {
    label: 'Account holder',
    defaultValue: 'Ginanjar Prabowo',
    leadingIcon: <PersonIcon size={20} color="#121516" />,
  },
};

export const CurrencyPrefix: Story = {
  args: {
    label: 'Amount',
    defaultValue: '2.000.000',
    prefix: 'Rp ',
  },
};

export const Dropdown: Story = {
  args: {
    label: 'Bank account',
    defaultValue: 'Bank Sinarmas — 123 456 789',
    trailingIcon: <ChevronDown />,
  },
};

function ControlledStory() {
  const [value, setValue] = useState('');
  return (
    <View style={{ width: 328, gap: 8 }}>
      <TextField label="Card number" value={value} onChangeText={setValue} clearable />
      <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>Length: {value.length}</Text>
    </View>
  );
}

export const Controlled: Story = {
  name: 'Pattern · controlled',
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};

export const Matrix: Story = {
  name: 'Pattern · state matrix',
  render: () => (
    <View style={{ width: 328, gap: 16 }}>
      <TextField label="Default" />
      <TextField label="Filled" defaultValue="Input Field Body Large" />
      <TextField label="Disabled" defaultValue="Input Field Body Large" disabled />
      <TextField label="Error" defaultValue="Input Field Body Large" error="Text Body Small" />
      <TextField label="With icon" defaultValue="Hi" leadingIcon={<PersonIcon size={20} color="#121516" />} />
      <TextField label="Currency" defaultValue="2.000.000" prefix="Rp " />
      <TextField label="Dropdown" defaultValue="Bank Sinarmas" trailingIcon={<ChevronDown />} />
    </View>
  ),
  parameters: { controls: { disable: true } },
};
