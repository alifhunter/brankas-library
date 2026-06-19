import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { View } from 'react-native';
import { Button } from './Button';
import type { ButtonSize, ButtonVariant } from './Button.types';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=168-14371';

const meta = {
  title: 'Mobile UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'large',
    disabled: false,
    loading: false,
    fullWidth: false,
    onPress: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'Touch-target button for React Native. Seven variants, three sizes, plus pressed/disabled/loading states.\n\n- **Primary** — most important action in a flow.\n- **Secondary** — second-most important action.\n- **Tertiary** — neutral action with no visual weight; use freely but do not overuse.\n- **Tertiary invert** — like tertiary but with a subtle border on a white fill; for use on lightly tinted or layered surfaces where pure tertiary would lack definition.\n- **Tertiary blue** — positive or confirmative actions (approve, enable, proceed).\n- **Tertiary red** — destructive or high-risk actions (delete, irreversible changes). The red prompts caution.\n- **Glassmorphism** — translucent button for placement over photography, gradients, or other dark/busy backgrounds.',
      },
    },
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'tertiaryInvert',
        'tertiaryBlue',
        'tertiaryRed',
        'glassmorphism',
      ] satisfies ButtonVariant[],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'] satisfies ButtonSize[],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };
export const Tertiary: Story = { args: { variant: 'tertiary' } };
export const TertiaryInvert: Story = { args: { variant: 'tertiaryInvert' } };
export const TertiaryBlue: Story = { args: { variant: 'tertiaryBlue', children: 'Approve' } };
export const TertiaryRed: Story = { args: { variant: 'tertiaryRed', children: 'Delete account' } };
export const Glassmorphism: Story = {
  args: { variant: 'glassmorphism' },
  decorators: [
    (Story) => (
      <View
        style={{
          padding: 24,
          backgroundColor: '#152433',
          borderRadius: 16,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const Large: Story = { args: { size: 'large' } };
export const Medium: Story = { args: { size: 'medium' } };
export const Small: Story = { args: { size: 'small' } };

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <View style={{ width: 320 }}>
        <Story />
      </View>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => {
    const lightVariants: ButtonVariant[] = [
      'primary',
      'secondary',
      'tertiary',
      'tertiaryInvert',
      'tertiaryBlue',
      'tertiaryRed',
    ];
    return (
      <View style={{ gap: 16 }}>
        <View style={{ gap: 12, alignItems: 'flex-start' }}>
          {lightVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </View>
        <View
          style={{
            gap: 12,
            alignItems: 'flex-start',
            padding: 16,
            backgroundColor: '#152433',
            borderRadius: 16,
          }}
        >
          <Button variant="glassmorphism">glassmorphism</Button>
        </View>
      </View>
    );
  },
  parameters: { controls: { disable: true } },
};

export const AllSizes: Story = {
  render: () => {
    const sizes: ButtonSize[] = ['small', 'medium', 'large'];
    return (
      <View style={{ gap: 12, alignItems: 'flex-start' }}>
        {sizes.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </View>
    );
  },
  parameters: { controls: { disable: true } },
};

export const StateMatrix: Story = {
  render: () => {
    const lightVariants: ButtonVariant[] = [
      'primary',
      'secondary',
      'tertiary',
      'tertiaryInvert',
      'tertiaryBlue',
      'tertiaryRed',
    ];
    return (
      <View style={{ gap: 16 }}>
        {lightVariants.map((variant) => (
          <View key={variant} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Button variant={variant}>Active</Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
            <Button variant={variant} loading>
              Loading
            </Button>
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            padding: 16,
            backgroundColor: '#152433',
            borderRadius: 16,
          }}
        >
          <Button variant="glassmorphism">Active</Button>
          <Button variant="glassmorphism" disabled>
            Disabled
          </Button>
          <Button variant="glassmorphism" loading>
            Loading
          </Button>
        </View>
      </View>
    );
  },
  parameters: { controls: { disable: true } },
};
