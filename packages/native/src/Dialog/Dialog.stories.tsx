import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../Button/Button';
import { Dialog } from './Dialog';

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      width: 360,
      height: 320,
      borderRadius: 28,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#cbd5e1',
      backgroundColor: '#f1f5f9',
      position: 'relative',
    }}
  >
    {children}
  </View>
);

const meta = {
  title: 'Mobile UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    open: true,
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
    onDismiss: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal card centred on screen with a dim backdrop. Composes the `Overlay` primitive. Use for confirmations or short blocking decisions. For longer flows, choose `BottomSheet` instead.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=326-5365',
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultStory() {
  const [open, setOpen] = useState(true);
  return (
    <PhoneFrame>
      <View style={{ padding: 16 }}>
        <Button onPress={() => setOpen(true)}>Open dialog</Button>
      </View>
      <Dialog
        open={open}
        onDismiss={() => setOpen(false)}
        title="Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam"
        footer={
          <>
            <View style={{ flex: 1 }}>
              <Button variant="secondary" fullWidth onPress={() => setOpen(false)}>
                Button
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button variant="primary" fullWidth onPress={() => setOpen(false)}>
                Button
              </Button>
            </View>
          </>
        }
      />
    </PhoneFrame>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
  parameters: { controls: { disable: true } },
};

function DestructiveStory() {
  const [open, setOpen] = useState(true);
  return (
    <PhoneFrame>
      <View style={{ padding: 16 }}>
        <Button variant="tertiaryRed" onPress={() => setOpen(true)}>
          Delete account
        </Button>
      </View>
      <Dialog
        open={open}
        onDismiss={() => setOpen(false)}
        title="Delete this account?"
        description="This will permanently remove all your data. This action cannot be undone."
        footer={
          <>
            <View style={{ flex: 1 }}>
              <Button variant="secondary" fullWidth onPress={() => setOpen(false)}>
                Cancel
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button variant="primary" fullWidth onPress={() => setOpen(false)}>
                Delete
              </Button>
            </View>
          </>
        }
      />
    </PhoneFrame>
  );
}

export const Destructive: Story = {
  name: 'Pattern · destructive confirmation',
  render: () => <DestructiveStory />,
  parameters: { controls: { disable: true } },
};
