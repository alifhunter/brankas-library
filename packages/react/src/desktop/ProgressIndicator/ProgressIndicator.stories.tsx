import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../Button/Button';
import { ProgressIndicator } from './ProgressIndicator';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=2514-5486';

const defaultSteps = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
];

const meta = {
  title: 'Desktop UI/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
  args: {
    steps: defaultSteps,
    currentStep: 1,
    onStepClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Horizontal step sequence showing where the user is in a multi-step flow. Renders completed (check), current (number + underline), and upcoming (gray) states; supports optional click-to-jump-back.',
      },
    },
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    currentStep: { control: { type: 'number', min: 1, max: 5 } },
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondStep: Story = {
  args: { currentStep: 2 },
};

export const Completed: Story = {
  args: { currentStep: 4, steps: [...defaultSteps, { label: 'Done' }] },
};

export const FiveSteps: Story = {
  args: {
    currentStep: 3,
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Verification' },
      { label: 'Review' },
      { label: 'Submit' },
    ],
  },
};

export const NotClickable: Story = {
  args: { currentStep: 2 },
  argTypes: { onStepClick: { control: false } },
  render: ({ onStepClick: _ignored, ...args }) => <ProgressIndicator {...args} />,
};

function MultiStepFlowStory() {
  const steps = [
    { label: 'Account info' },
    { label: 'Identity check' },
    { label: 'Review & submit' },
  ];
  const [step, setStep] = useState(1);
  const total = steps.length;

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <ProgressIndicator steps={steps} currentStep={step} onStepClick={setStep} />
      <div
        style={{
          padding: 32,
          background: 'var(--color-background-subtlest, #f7f7f7)',
          borderRadius: 12,
          minHeight: 160,
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'var(--brankas-typography-desktop-heading-h4-semibold-font-family)',
          fontSize: 20,
          fontWeight: 600,
          color: 'var(--color-text-default)',
        }}
      >
        Page {step} of {total} · {steps[step - 1]?.label}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <Button
          variant="secondary"
          size="large"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          size="large"
          onClick={() => setStep((s) => Math.min(total, s + 1))}
          disabled={step === total}
        >
          {step === total ? 'Submit' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}

export const MultiStepFlow: Story = {
  render: () => <MultiStepFlowStory />,
  parameters: { controls: { disable: true } },
};
