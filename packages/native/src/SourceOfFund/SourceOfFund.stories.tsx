import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { AccountItem } from '../AccountItem/AccountItem';
import { SourceOfFund } from './SourceOfFund';

const CardArt = ({ color = '#152433', label }: { color?: string; label: string }) => (
  <View style={{ flex: 1, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: '#ffffff', fontSize: 9, fontWeight: '700' }}>{label}</Text>
  </View>
);

const SampleAccount = (
  <AccountItem
    artwork={<CardArt color="#d4a017" label="GOLD" />}
    name="Simas Gold"
    accountNumber="0057150556"
    balance="Rp25.000.000"
    chevron={false}
  />
);

const meta = {
  title: 'Mobile UI/SourceOfFund',
  component: SourceOfFund,
  tags: ['autodocs'],
  args: { label: 'Source account', variant: 'card', onPress: fn() },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'White elevated card with a "Source account" label, used to surface the funding-source account inside a transfer or top-up flow.\n\nThree visual variants:\n- **card** — default white shadowed card. Pass an `<AccountItem chevron={false}>` as children.\n- **selector** — same card but no label, used inside a bottom-sheet picker.\n- **empty** — placeholder card with a greyed card-outline icon and "No account selected".\n\n`disabled` and `error` are orthogonal modifiers. Error renders a 0.5px red border + an info-icon + caption below the card.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LoMc1DCcDLBmafSJsZEkkk/Simobi-Design-System?node-id=832-19892',
    },
  },
  decorators: [(Story) => <View style={{ width: 360, padding: 16 }}><Story /></View>],
} satisfies Meta<typeof SourceOfFund>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: (args) => <SourceOfFund {...args}>{SampleAccount}</SourceOfFund>,
};

export const Selector: Story = {
  args: { variant: 'selector' },
  render: (args) => (
    <SourceOfFund {...args}>
      <AccountItem
        artwork={<CardArt color="#9f1919" label="PAY" />}
        name="Simas Payroll"
        accountNumber="0057150556"
        balance="Rp25.000.000"
        badge="Default"
        chevron={false}
      />
    </SourceOfFund>
  ),
};

export const Empty: Story = {
  args: { variant: 'empty' },
  render: (args) => <SourceOfFund {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <SourceOfFund {...args}>
      <AccountItem
        artwork={<CardArt color="#888" label="OFF" />}
        name="Simas Payroll"
        accountNumber="0057150556"
        balance="Rp25.000.000"
        chevron={false}
        disabled
      />
    </SourceOfFund>
  ),
};

export const Error: Story = {
  args: { error: 'Error message' },
  render: (args) => <SourceOfFund {...args}>{SampleAccount}</SourceOfFund>,
};

export const Matrix: Story = {
  name: 'Pattern · variant matrix',
  render: () => (
    <View style={{ width: 360, padding: 16, gap: 16 }}>
      <SourceOfFund onPress={fn()}>{SampleAccount}</SourceOfFund>
      <SourceOfFund variant="empty" onPress={fn()} />
      <SourceOfFund disabled onPress={fn()}>
        <AccountItem
          artwork={<CardArt color="#888" label="OFF" />}
          name="Simas Payroll"
          accountNumber="0057150556"
          balance="Rp25.000.000"
          chevron={false}
          disabled
        />
      </SourceOfFund>
      <SourceOfFund error="Error message" onPress={fn()}>
        {SampleAccount}
      </SourceOfFund>
    </View>
  ),
  parameters: { controls: { disable: true } },
};
