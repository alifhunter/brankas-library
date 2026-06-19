import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import type { ButtonSize, ButtonVariant, ButtonVisualState } from './Button.types';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=118-4302';

const meta = {
  title: 'Desktop UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'extra-large',
    state: 'default',
    loading: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Explicit actions that submit, continue, confirm, or change UI state. Nine variants (primary/secondary/tertiary × default/blue/danger), four sizes, plus loading and disabled states. Use one primary action per surface.',
      },
    },
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'blue-primary',
        'blue-secondary',
        'blue-tertiary',
        'danger-primary',
        'danger-secondary',
        'danger-tertiary',
      ] satisfies ButtonVariant[],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large', 'extra-large'] satisfies ButtonSize[],
    },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover', 'focused', 'disabled'] satisfies ButtonVisualState[],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const LeftArrow = <span aria-hidden="true">←</span>;
const RightArrow = <span aria-hidden="true">→</span>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };
export const Tertiary: Story = { args: { variant: 'tertiary' } };

export const BluePrimary: Story = { args: { variant: 'blue-primary' } };
export const DangerPrimary: Story = { args: { variant: 'danger-primary' } };

export const HoverState: Story = { args: { state: 'hover' } };
export const FocusedState: Story = { args: { state: 'focused' } };
export const DisabledState: Story = { args: { state: 'disabled' } };
export const Loading: Story = { args: { loading: true } };

export const WithIcons: Story = {
  args: {
    leadingIcon: LeftArrow,
    trailingIcon: RightArrow,
  },
};

export const VariantStateMatrix: Story = {
  render: (args) => {
    const variants: ButtonVariant[] = [
      'primary',
      'secondary',
      'tertiary',
      'blue-primary',
      'blue-secondary',
      'blue-tertiary',
      'danger-primary',
      'danger-secondary',
      'danger-tertiary',
    ];
    const states: ButtonVisualState[] = ['default', 'hover', 'focused', 'disabled'];

    return (
      <div style={{ display: 'grid', gap: '12px' }}>
        {variants.map((variant) => (
          <div key={variant} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {states.map((state) => (
              <Button key={`${variant}-${state}`} {...args} variant={variant} state={state}>
                {`${variant}-${state}`}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
