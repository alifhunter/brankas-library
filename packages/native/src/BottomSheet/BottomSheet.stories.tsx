import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fn } from 'storybook/test';
import { Button } from '../Button/Button';
import { BottomSheet } from './BottomSheet';

const FIGMA_URL =
  'https://www.figma.com/design/e7YPdAPyyiKTKwASV1j1W8/Mobile-UI-Kit?node-id=241-622';

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      width: 360,
      height: 640,
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
  title: 'Mobile UI/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal-style sheet that anchors to the bottom edge over a dim backdrop. Two snap points (content height up to 50% / full-height ≈95%); drag the handle to expand or dismiss. Composes the Overlay primitive for the backdrop. Accepts a free-form `footer` ReactNode and optional `illustration`, `title`, `supportingText`, and arbitrary `children`. Requires GestureHandlerRootView and SafeAreaProvider at the app root.',
      },
    },
    design: { type: 'figma', url: FIGMA_URL },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Story />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    ),
  ],
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function TitleOnlyStory() {
  const [open, setOpen] = useState(true);
  return (
    <PhoneFrame>
      <View style={{ padding: 16 }}>
        <Button onPress={() => setOpen(true)}>Open sheet</Button>
      </View>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        title="Title"
        supportingText="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam"
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
  render: () => <TitleOnlyStory />,
  parameters: { controls: { disable: true } },
};

function WithIllustrationStory() {
  const [open, setOpen] = useState(true);
  return (
    <PhoneFrame>
      <View style={{ padding: 16 }}>
        <Button onPress={() => setOpen(true)}>Open sheet</Button>
      </View>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        title="Insurance"
        supportingText="Protect what matters most. Choose a plan in under a minute."
        illustration={
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#f6f9fe',
              borderWidth: 1,
              borderColor: '#d8e7f7',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 48 }}>🛡️</Text>
          </View>
        }
        footer={
          <View style={{ flex: 1 }}>
            <Button variant="primary" fullWidth onPress={() => setOpen(false)}>
              Get started
            </Button>
          </View>
        }
      />
    </PhoneFrame>
  );
}

export const WithIllustration: Story = {
  render: () => <WithIllustrationStory />,
  parameters: { controls: { disable: true } },
};

function CustomContentStory() {
  const [open, setOpen] = useState(true);
  return (
    <PhoneFrame>
      <View style={{ padding: 16 }}>
        <Button onPress={() => setOpen(true)}>Open sheet</Button>
      </View>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        title="Select bank"
        supportingText="Choose where to transfer the funds."
        footer={
          <View style={{ flex: 1 }}>
            <Button variant="primary" fullWidth onPress={() => setOpen(false)}>
              Continue
            </Button>
          </View>
        }
      >
        {['Sinarmas', 'BCA', 'Mandiri', 'BRI', 'BNI'].map((bank) => (
          <View
            key={bank}
            style={{
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#f1f5f9',
            }}
          >
            <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#0f172a' }}>
              {bank}
            </Text>
          </View>
        ))}
      </BottomSheet>
    </PhoneFrame>
  );
}

export const CustomContent: Story = {
  render: () => <CustomContentStory />,
  parameters: { controls: { disable: true } },
};

function ScrollableStory() {
  const [open, setOpen] = useState(true);
  return (
    <PhoneFrame>
      <View style={{ padding: 16 }}>
        <Button onPress={() => setOpen(true)}>Open scrollable sheet</Button>
      </View>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        title="Long list"
        supportingText="Drag the handle up to expand. Content scrolls once expanded."
        footer={
          <View style={{ flex: 1 }}>
            <Button variant="primary" fullWidth onPress={() => setOpen(false)}>
              Done
            </Button>
          </View>
        }
      >
        {Array.from({ length: 20 }, (_, i) => (
          <View
            key={i}
            style={{
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#f1f5f9',
            }}
          >
            <Text style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#0f172a' }}>
              Item #{i + 1}
            </Text>
          </View>
        ))}
      </BottomSheet>
    </PhoneFrame>
  );
}

export const Scrollable: Story = {
  render: () => <ScrollableStory />,
  parameters: { controls: { disable: true } },
};

function ControlledStory() {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  return (
    <PhoneFrame>
      <View style={{ padding: 16, gap: 12 }}>
        <Button variant="tertiaryRed" onPress={() => setOpen(true)}>
          Delete account
        </Button>
        {confirmed ? (
          <Text style={{ fontFamily: 'monospace', color: '#475569' }}>{confirmed}</Text>
        ) : null}
      </View>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        title="Delete account?"
        supportingText="This will permanently remove all your data. This action cannot be undone."
        footer={
          <>
            <View style={{ flex: 1 }}>
              <Button variant="secondary" fullWidth onPress={() => setOpen(false)}>
                Cancel
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                variant="primary"
                fullWidth
                onPress={() => {
                  setConfirmed('Account deleted at ' + new Date().toLocaleTimeString());
                  setOpen(false);
                }}
              >
                Delete
              </Button>
            </View>
          </>
        }
      />
    </PhoneFrame>
  );
}

export const Pattern: Story = {
  name: 'Pattern · destructive confirmation',
  render: () => <ControlledStory />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'A common pattern: render a sheet to confirm a destructive action. Use `tertiaryRed` button to surface the destructive action elsewhere in the UI.',
      },
    },
  },
};
