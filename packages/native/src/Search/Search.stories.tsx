import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Search } from './Search';

const meta = {
  title: 'Mobile UI/Search',
  component: Search,
  tags: ['autodocs'],
  args: { variant: 'white', onChangeText: fn() },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Single-line search input. 52×328 pill (radius 12, 20×12 padding). When empty, shows a placeholder and a search magnifier icon on the right. When filled, swaps the icon for a black filled X that clears the value on tap.\n\n**Variants:**\n- `white` — for use over a coloured surface (e.g. inside the Header).\n- `grey` — for a standalone search bar on a plain screen, uses `background.subtle`.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/LoMc1DCcDLBmafSJsZEkkk/Simobi-Design-System?node-id=2569-9467',
    },
  },
  decorators: [(Story) => <View style={{ width: 328 }}><Story /></View>],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WhiteEmpty: Story = {
  args: { variant: 'white' },
  decorators: [(Story) => (
    <View style={{ width: 328, padding: 16, backgroundColor: '#c10e0e', borderRadius: 12 }}>
      <Story />
    </View>
  )],
};

export const WhiteFilled: Story = {
  args: { variant: 'white', defaultValue: 'Input field body large' },
  decorators: [(Story) => (
    <View style={{ width: 328, padding: 16, backgroundColor: '#c10e0e', borderRadius: 12 }}>
      <Story />
    </View>
  )],
};

export const GreyEmpty: Story = {
  args: { variant: 'grey', placeholder: 'Search by transaction name' },
};

export const GreyFilled: Story = {
  args: { variant: 'grey', defaultValue: 'Input field body large' },
};

export const Disabled: Story = {
  args: { variant: 'grey', defaultValue: 'Cannot edit', disabled: true },
};

function ControlledStory() {
  const [v, setV] = useState('');
  return (
    <View style={{ width: 328, gap: 8 }}>
      <Search variant="grey" value={v} onChangeText={setV} placeholder="Search…" />
      <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
        Query: {v || '(empty)'}
      </Text>
    </View>
  );
}

export const Controlled: Story = {
  name: 'Pattern · controlled',
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};
