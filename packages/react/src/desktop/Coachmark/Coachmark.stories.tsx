import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Coachmark } from './Coachmark';
import type { CoachmarkPosition } from './Coachmark.types';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=342-8440';

const meta = {
  title: 'Desktop UI/Coachmark',
  component: Coachmark,
  tags: ['autodocs'],
  args: {
    title: 'Title',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
    position: 'top-center',
    close: true,
    config: false,
    totalSteps: 2,
    currentStep: 1,
    onDismiss: fn(),
    onPrimaryAction: fn(),
    onSecondaryAction: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Floating popover that introduces a feature, used during onboarding or product tours. Eight arrow positions, optional carousel dots and footer buttons for multi-step tours.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-center',
        'top-left',
        'top-right',
        'bottom-center',
        'bottom-left',
        'bottom-right',
        'left-center',
        'right-center',
      ] satisfies CoachmarkPosition[],
    },
  },
} satisfies Meta<typeof Coachmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithConfig: Story = {
  args: { config: true },
};

export const WithoutClose: Story = {
  args: { close: false },
};

export const ThreeSteps: Story = {
  args: { config: true, totalSteps: 3, currentStep: 2 },
};

export const BottomCenter: Story = { args: { position: 'bottom-center' } };
export const TopLeft: Story = { args: { position: 'top-left' } };
export const TopRight: Story = { args: { position: 'top-right' } };
export const BottomLeft: Story = { args: { position: 'bottom-left' } };
export const BottomRight: Story = { args: { position: 'bottom-right' } };
export const LeftCenter: Story = { args: { position: 'left-center' } };
export const RightCenter: Story = { args: { position: 'right-center' } };

export const AllPositions: Story = {
  render: () => {
    const positions: CoachmarkPosition[] = [
      'top-left',
      'top-center',
      'top-right',
      'left-center',
      'right-center',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ];
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, max-content)',
          rowGap: 64,
          columnGap: 32,
          padding: 32,
        }}
      >
        {positions.map((position) => (
          <Coachmark key={position} position={position} title={position} />
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
