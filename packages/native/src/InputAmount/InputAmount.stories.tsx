import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { InputAmount } from './InputAmount';
import { Checkbox } from '../Checkbox/Checkbox';

const FlagDot = ({ color = '#3c3b6e' }: { color?: string }) => (
  <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: color }} />
);

const meta = {
  title: 'Mobile UI/InputAmount',
  component: InputAmount,
  tags: ['autodocs'],
  args: {
    label: 'Title',
    onValueChange: fn(),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Large currency input on an elevated card. Renders the prefix (default `Rp`), the formatted amount with `Intl.NumberFormat` thousand separators (default locale `id-ID`), a divider line, and an optional info or error caption below.\n\n**Auto-scale:** when the displayed amount would exceed the row width, the font size is interpolated down from `maxFontSize` (32) toward `minFontSize` (16) so the number stays fully readable — never truncated with `…`, per the Simobi rule.\n\nPass a `currency` object (code + flag + rate + onPress) to swap the simple label for a currency selector row.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LoMc1DCcDLBmafSJsZEkkk/Simobi-Design-System?node-id=4524-15419',
    },
  },
  decorators: [(Story) => <View style={{ padding: 16, backgroundColor: '#f6f9fe' }}><Story /></View>],
} satisfies Meta<typeof InputAmount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: '1000' },
};

export const WithInfo: Story = {
  args: {
    defaultValue: '1000',
    info: 'The Rp100.000 will be held as a minimum balance.',
  },
};

export const Error: Story = {
  args: { defaultValue: '1000', error: 'Insufficient balance in your source account.' },
};

export const Disabled: Story = {
  args: { defaultValue: '1000', disabled: true },
};

export const CurrencyPicker: Story = {
  args: {
    label: 'Title',
    defaultValue: '1000',
    currency: { code: 'USD', flag: <FlagDot />, rate: '$1 = S$1.36', onPress: fn() },
  },
};

export const LongAmount: Story = {
  name: 'Auto-scale · long amount',
  args: {
    defaultValue: '999999999999',
    info: 'The font shrinks instead of using an ellipsis.',
  },
};

function ControlledStory() {
  const [v, setV] = useState('0');
  return (
    <View style={{ padding: 16, backgroundColor: '#f6f9fe', gap: 16 }}>
      <InputAmount label="Amount" value={v} onValueChange={setV} />
      <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
        Raw digits: {v || '(empty)'}
      </Text>
    </View>
  );
}

export const Controlled: Story = {
  name: 'Pattern · controlled',
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};

function DoubleInputStory() {
  const [from, setFrom] = useState('1000');
  const [to, setTo] = useState('0');
  return (
    <View style={{ padding: 16, backgroundColor: '#f6f9fe', gap: 12 }}>
      <InputAmount label="Title 1" value={from} onValueChange={setFrom} />
      <InputAmount label="Title 2" value={to} onValueChange={setTo} />
    </View>
  );
}

export const DoubleInput: Story = {
  name: 'Pattern · double input',
  render: () => <DoubleInputStory />,
  parameters: { controls: { disable: true } },
};

function WithCheckboxStory() {
  const [amount, setAmount] = useState('0');
  const [initial, setInitial] = useState(false);
  return (
    <View style={{ padding: 16, backgroundColor: '#f6f9fe' }}>
      <InputAmount label="Title" value={amount} onValueChange={setAmount} info={undefined} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginTop: 12,
          paddingLeft: 4,
        }}
      >
        <Checkbox checked={initial} onChange={setInitial} />
        <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#373d3f' }}>
          Initial deposit
        </Text>
      </View>
    </View>
  );
}

export const WithCheckbox: Story = {
  name: 'Pattern · with checkbox',
  render: () => <WithCheckboxStory />,
  parameters: { controls: { disable: true } },
};

function QuickPercentsStory() {
  const [amount, setAmount] = useState('0');
  const percents = ['10%', '20%', '30%', '40%', '50%'];
  return (
    <View style={{ padding: 16, backgroundColor: '#f6f9fe' }}>
      <InputAmount label="Initial deposit" value={amount} onValueChange={setAmount} />
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
        {percents.map((p) => (
          <Pressable
            key={p}
            onPress={fn()}
            style={{
              height: 36,
              paddingHorizontal: 14,
              borderRadius: 999,
              backgroundColor: '#f2f4f5',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: 14 }}>
              {p}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export const QuickPercents: Story = {
  name: 'Pattern · quick percentages',
  render: () => <QuickPercentsStory />,
  parameters: { controls: { disable: true } },
};
