import { ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Svg, { Path } from 'react-native-svg';
import { Header } from './Header';
import { Search } from '../Search/Search';
import { Button } from '../Button/Button';

const AddIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5v14M5 12h14" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const PhoneFrame = ({ children, height = 480 }: { children: React.ReactNode; height?: number }) => (
  <SafeAreaProvider>
    <View
      style={{
        width: 360,
        height,
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      {children}
    </View>
  </SafeAreaProvider>
);

const meta = {
  title: 'Mobile UI/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    title: 'Title',
    subtitle: 'Body description',
    onBack: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Brand page header with a red curved gradient background. Built around four common layouts:\n\n- **default** — back + title (H3) + optional subtitle + trailing actions\n- **centered** — back + centered H4 title + optional trailing\n- **search** — back + slot for a search field + optional trailing\n- **with progress** — adds a 3px progress bar above the title\n\n**Subtitle rule:** if longer than 140 characters, the subtitle drops to Body Medium 14/20 for readability (per the Simobi rule).\n\n**Scroll-shrink:** pass a Reanimated `SharedValue<number>` via `scrollY` and update it from your scroll handler — the header tightens its vertical padding, scales the title from 24→18, and fades out the subtitle past the threshold.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LoMc1DCcDLBmafSJsZEkkk/Simobi-Design-System?node-id=478-11566',
    },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <PhoneFrame>
      <Header {...args} />
    </PhoneFrame>
  ),
};

export const TitleOnly: Story = {
  args: { subtitle: undefined },
  render: (args) => (
    <PhoneFrame>
      <Header {...args} />
    </PhoneFrame>
  ),
};

export const LongSubtitle: Story = {
  args: {
    subtitle:
      'This is a long body description that exceeds the one hundred and forty character threshold so the Header switches to the Medium 14 typography for better readability when copy gets dense.',
  },
  render: (args) => (
    <PhoneFrame>
      <Header {...args} />
    </PhoneFrame>
  ),
};

export const WithTrailing: Story = {
  args: { trailing: <AddIcon /> },
  render: (args) => (
    <PhoneFrame>
      <Header {...args} />
    </PhoneFrame>
  ),
};

export const WithProgress: Story = {
  args: { progress: 0.55, subtitle: undefined },
  render: (args) => (
    <PhoneFrame>
      <Header {...args} />
    </PhoneFrame>
  ),
};

export const WithStepPill: Story = {
  args: { stepLabel: '4/7', subtitle: undefined },
  render: (args) => (
    <PhoneFrame>
      <Header {...args} />
    </PhoneFrame>
  ),
};

export const Centered: Story = {
  args: { variant: 'centered', title: 'Simas TARA', subtitle: undefined },
  render: (args) => (
    <PhoneFrame>
      <Header {...args} />
    </PhoneFrame>
  ),
};

export const SearchVariant: Story = {
  args: {
    variant: 'search',
    title: undefined,
    subtitle: undefined,
    searchSlot: (
      <Search variant="white" placeholder="Search by transaction name" containerStyle={{ flex: 1 }} />
    ),
  },
  render: (args) => (
    <PhoneFrame>
      <Header {...args} />
    </PhoneFrame>
  ),
};

export const Flat: Story = {
  args: { flat: true },
  render: (args) => (
    <PhoneFrame>
      <View style={{ backgroundColor: '#152433', flex: 1 }}>
        <Header {...args} />
      </View>
    </PhoneFrame>
  ),
};

function ScrollShrinkStory() {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  return (
    <PhoneFrame height={560}>
      <Header
        title="Portfolio"
        subtitle="Scroll the list below — the header shrinks once you pass 48 px."
        onBack={fn()}
        trailing={<AddIcon />}
        scrollY={scrollY}
      />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 16, gap: 12 }}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <View
            key={i}
            style={{
              padding: 14,
              borderRadius: 8,
              backgroundColor: '#f6f9fe',
              borderWidth: 1,
              borderColor: '#e8f1fb',
            }}
          >
            <Text style={{ fontFamily: 'Inter, sans-serif' }}>Transaction #{i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </PhoneFrame>
  );
}

export const ScrollShrink: Story = {
  name: 'Pattern · scroll-shrink',
  render: () => <ScrollShrinkStory />,
  parameters: { controls: { disable: true } },
};

export const Matrix: Story = {
  name: 'Pattern · variant matrix',
  render: () => (
    <View style={{ gap: 16, width: 360 }}>
      <PhoneFrame height={170}>
        <Header title="Title" subtitle="Body description" onBack={fn()} />
      </PhoneFrame>
      <PhoneFrame height={170}>
        <Header title="Title" subtitle="Body description" onBack={fn()} trailing={<AddIcon />} />
      </PhoneFrame>
      <PhoneFrame height={170}>
        <Header title="Title" progress={0.55} onBack={fn()} />
      </PhoneFrame>
      <PhoneFrame height={130}>
        <Header variant="centered" title="Simas TARA" onBack={fn()} />
      </PhoneFrame>
      <PhoneFrame height={140}>
        <Header
          variant="search"
          onBack={fn()}
          searchSlot={
            <Search variant="white" placeholder="Search by transaction name" containerStyle={{ flex: 1 }} />
          }
        />
      </PhoneFrame>
      <PhoneFrame height={170}>
        <Header
          title="Portfolio"
          onBack={fn()}
          subtitle={undefined}
          trailing={<Button size="small">New Product</Button>}
        />
      </PhoneFrame>
    </View>
  ),
  parameters: { controls: { disable: true } },
};
