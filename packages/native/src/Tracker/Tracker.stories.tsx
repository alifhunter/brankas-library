import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tracker } from './Tracker';
import type { TrackerStep } from './Tracker.types';

const STEPS: TrackerStep[] = [
  { key: '1', label: 'Verify identity', supportingText: 'Step 1', status: 'completed' },
  { key: '2', label: 'Choose plan', supportingText: 'Step 2', status: 'active' },
  { key: '3', label: 'Confirm', supportingText: 'Step 3', status: 'pending' },
];

const meta = {
  title: 'Mobile UI/Tracker',
  component: Tracker,
  tags: ['autodocs'],
  args: { steps: STEPS, size: 'medium' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Vertical step tracker. Each step renders an icon by status (`completed` filled blue check, `active` blue ring, `pending` neutral ring), a bold label, optional supporting text, and a trailing chevron. Two sizes via the `size` prop — `medium` (24px icon) or `large` (32px icon). Steps with `onPress` become tappable.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=326-5119',
    },
  },
  decorators: [(Story) => <View style={{ width: 320 }}><Story /></View>],
} satisfies Meta<typeof Tracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = { args: { size: 'medium' } };
export const Large: Story = { args: { size: 'large' } };

export const Mixed: Story = {
  args: {
    size: 'medium',
    steps: [
      { key: '1', label: 'Account created', supportingText: '12 Apr 2026', status: 'completed' },
      { key: '2', label: 'KYC submitted', supportingText: '12 Apr 2026', status: 'completed' },
      { key: '3', label: 'Under review', supportingText: 'In progress', status: 'active' },
      { key: '4', label: 'Funds disbursed', supportingText: 'Pending', status: 'pending' },
    ],
  },
};

export const Interactive: Story = {
  args: {
    steps: STEPS.map((s) => ({ ...s, onPress: () => console.log(s.key) })),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tappable steps. Use this for navigation back to a completed step, or to show details for the active step.',
      },
    },
  },
};
