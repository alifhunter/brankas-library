import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Search } from './Search';
import { SearchResultPanel } from './SearchResultPanel';
import type { SearchResultPanelState } from './Search.types';

const FIGMA_SEARCH_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=367-501';
const FIGMA_PANEL_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=2463-10852';

const meta = {
  title: 'Desktop UI/Search',
  component: Search,
  tags: ['autodocs'],
  args: {
    showButton: false,
    showDropdown: false,
    showShortcutHint: true,
    showClearButton: true,
    onValueChange: fn(),
    onButtonClick: fn(),
    onClear: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Search input with optional dropdown trigger, action button, and result panel. Pair with `SearchResultPanel` for live type-to-find experiences with default/loading/result/empty states.',
      },
    },
    layout: 'padded',
    design: {
      type: 'figma',
      url: FIGMA_SEARCH_URL,
    },
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 707 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: 'Sinarmas Terang Silau' },
};

export const WithButton: Story = {
  args: { showButton: true, defaultValue: 'Sinarmas Terang Silau' },
};

export const WithDropdown: Story = {
  args: { showDropdown: true },
};

export const WithDropdownAndButton: Story = {
  args: { showDropdown: true, showButton: true },
};

export const WithoutShortcut: Story = {
  args: { showShortcutHint: false },
};

export const Disabled: Story = {
  args: { disabled: true },
};

function ControlledStory() {
  const [value, setValue] = useState('');
  const [panelState, setPanelState] = useState<SearchResultPanelState>('default');
  const [results, setResults] = useState<{ id: string; label: string; helper: string }[]>([]);

  const handleChange = (next: string) => {
    setValue(next);
    if (next.length === 0) {
      setPanelState('default');
      setResults([]);
      return;
    }
    if (next.length < 3) {
      setPanelState('default');
      return;
    }
    setPanelState('loading');
    window.setTimeout(() => {
      const all = [
        { id: '1', label: 'John Legend', helper: '001234' },
        { id: '2', label: 'Johnny Cash', helper: '001235' },
        { id: '3', label: 'John Doe', helper: '001236' },
        { id: '4', label: 'Jane Doe', helper: '001237' },
      ];
      const matching = all.filter((r) =>
        r.label.toLowerCase().includes(next.toLowerCase()),
      );
      setResults(matching);
      setPanelState(matching.length > 0 ? 'result' : 'empty');
    }, 400);
  };

  return (
    <div style={{ display: 'grid', gap: 12, width: 707 }}>
      <Search value={value} onValueChange={handleChange} />
      <SearchResultPanel
        state={panelState}
        items={results.map((r) => ({ ...r, onClick: () => setValue(r.label) }))}
      />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <Story />],
};

export const PanelDefault: Story = {
  name: 'Panel · Default',
  render: () => <SearchResultPanel state="default" />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA_PANEL_URL },
  },
};

export const PanelLoading: Story = {
  name: 'Panel · Loading',
  render: () => <SearchResultPanel state="loading" />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA_PANEL_URL },
  },
};

export const PanelEmpty: Story = {
  name: 'Panel · Empty',
  render: () => <SearchResultPanel state="empty" />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA_PANEL_URL },
  },
};

export const PanelResult: Story = {
  name: 'Panel · Result',
  render: () => (
    <SearchResultPanel
      state="result"
      items={[
        { id: '1', label: 'John Legend', helper: '001234' },
        { id: '2', label: 'John Legend', helper: '001234' },
        { id: '3', label: 'John Legend', helper: '001234' },
      ]}
    />
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA_PANEL_URL },
  },
};
