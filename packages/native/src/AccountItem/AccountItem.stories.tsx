import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { AccountItem } from './AccountItem';

/* Placeholder artwork — square block with a hint of colour to stand in for the
 * real Simas / Giro / Valas card images. Storybook can't import binary assets
 * from Figma, so consumers wire in their own <Image> or SVG. */
const CardArt = ({ color = '#152433', label }: { color?: string; label: string }) => (
  <View style={{ flex: 1, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: '#ffffff', fontSize: 9, fontWeight: '700' }}>{label}</Text>
  </View>
);

const meta = {
  title: 'Mobile UI/AccountItem',
  component: AccountItem,
  tags: ['autodocs'],
  args: {
    name: 'Simas Gold',
    accountNumber: '0057150556',
    balance: 'Rp25.000.000',
    badge: 'Default',
    chevron: true,
    onPress: fn(),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A bank account row. Left slot is a 36×44 rounded `artwork` (pass any ReactNode — typically an `<Image>` of the bank card art). Middle stacks the bold account name, the grey account number, and an optional balance. Right side optionally renders a "Default"-style pill and a chevron.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LoMc1DCcDLBmafSJsZEkkk/Simobi-Design-System?node-id=778-7767',
    },
  },
  decorators: [(Story) => <View style={{ width: 328 }}><Story /></View>],
} satisfies Meta<typeof AccountItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { artwork: <CardArt color="#d4a017" label="GOLD" /> },
};

export const WithoutBadge: Story = {
  args: { artwork: <CardArt color="#152433" label="DIGI" />, badge: undefined },
};

export const WithoutChevron: Story = {
  args: {
    artwork: <CardArt color="#9f1919" label="VALAS" />,
    chevron: false,
    balance: '$25.000.000',
    name: 'Simas Valas USD',
  },
};

export const Disabled: Story = {
  args: { artwork: <CardArt color="#888" label="OFF" />, disabled: true },
};

export const NoBalance: Story = {
  args: { artwork: <CardArt color="#152433" label="ACC" />, balance: undefined },
};

export const Gallery: Story = {
  render: () => (
    <View style={{ width: 328, gap: 16 }}>
      <AccountItem
        artwork={<CardArt color="#9f1919" label="PAYROLL" />}
        name="Simas Payroll"
        accountNumber="0057150556"
        balance="Rp25.000.000"
        badge="Default"
      />
      <AccountItem
        artwork={<CardArt color="#152433" label="DIGI" />}
        name="Simas Digi"
        accountNumber="0057150556"
        balance="Rp25.000.000"
        badge="Default"
      />
      <AccountItem
        artwork={<CardArt color="#d4a017" label="GOLD" />}
        name="Simas Gold"
        accountNumber="0057150556"
        balance="Rp25.000.000"
        badge="Default"
      />
      <AccountItem
        artwork={<CardArt color="#1c77c3" label="USD" />}
        name="Giro USD Personal"
        accountNumber="0057150556"
        balance="$25.000.000"
        badge="Default"
      />
      <AccountItem
        artwork={<CardArt color="#888" label="—" />}
        name="Simas Diamond"
        accountNumber="0057150556"
        balance="Rp25.000.000"
        badge="Default"
        disabled
      />
    </View>
  ),
  parameters: { controls: { disable: true } },
};
