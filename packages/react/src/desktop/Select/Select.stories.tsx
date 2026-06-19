import { useEffect, useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SelectButton } from './SelectButton';
import { SelectItem } from './SelectItem';
import { SelectPanel } from './SelectPanel';

const FIGMA_BUTTON_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=614-8368';
const FIGMA_PANEL_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=417-3794';

const meta = {
  title: 'Desktop UI/Select',
  component: SelectButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Choose one or more values from a known option set. Trigger reflects current selection; panel supports search, scrolling, multi-select with Apply, and a no-data empty state.',
      },
    },
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_BUTTON_URL },
  },
} satisfies Meta<typeof SelectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const COUNTRIES = [
  'Indonesia',
  'Singapore',
  'Malaysia',
  'Philippines',
  'Thailand',
  'Vietnam',
  'Cambodia',
  'Laos',
  'Myanmar',
  'Brunei',
];

/* ---------- SelectButton presentational ---------- */

export const ButtonDefault: Story = {
  args: { value: 'Select 1', badge: 9, onClick: fn() },
  name: 'Button · Default',
};

export const ButtonHover: Story = {
  args: { value: 'Select 1', badge: 9, state: 'hover' },
  name: 'Button · Hover',
};

export const ButtonFocused: Story = {
  args: { value: 'Select 1', badge: 9, state: 'focused' },
  name: 'Button · Focused',
};

export const ButtonDisabled: Story = {
  args: { value: 'Select 1', badge: 9, disabled: true },
  name: 'Button · Disabled',
};

export const ButtonWithLabel: Story = {
  args: { label: 'Label', value: 'Select 1', badge: 9 },
  name: 'Button · With inline label',
};

export const ButtonWithoutBadge: Story = {
  args: { value: 'Select 1' },
  name: 'Button · Without badge',
};

export const ButtonPlaceholder: Story = {
  args: { placeholder: 'Status' },
  name: 'Button · Placeholder only',
};

export const ButtonWithHelper: Story = {
  args: { value: 'Select 1', helperText: 'Choose your preferred option.' },
  name: 'Button · Helper text',
};

/* ---------- SelectPanel presentational ---------- */

export const PanelDefault: Story = {
  name: 'Panel · Default',
  render: () => (
    <SelectPanel>
      <SelectItem onClick={fn()}>1st menu item</SelectItem>
      <SelectItem onClick={fn()}>2nd menu item</SelectItem>
      <SelectItem onClick={fn()}>3rd menu item</SelectItem>
    </SelectPanel>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA_PANEL_URL },
  },
};

export const PanelScrollable: Story = {
  name: 'Panel · Scrollable',
  render: () => (
    <SelectPanel maxHeight={200}>
      {COUNTRIES.map((c) => (
        <SelectItem key={c} onClick={fn()}>
          {c}
        </SelectItem>
      ))}
    </SelectPanel>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA_PANEL_URL },
  },
};

export const PanelSearch: Story = {
  name: 'Panel · Search',
  render: () => (
    <SelectPanel searchable showApplyButton>
      <SelectItem onClick={fn()}>1st menu item</SelectItem>
      <SelectItem onClick={fn()}>2nd menu item</SelectItem>
      <SelectItem onClick={fn()}>3rd menu item</SelectItem>
      <SelectItem onClick={fn()}>4th menu item</SelectItem>
    </SelectPanel>
  ),
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA_PANEL_URL },
  },
};

export const PanelNoData: Story = {
  name: 'Panel · No data',
  render: () => <SelectPanel empty />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA_PANEL_URL },
  },
};

/* ---------- Interactive pattern: trigger + panel ---------- */

function SingleSelectStory() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <SelectButton
        label="Country"
        value={value ?? undefined}
        placeholder="Select a country"
        open={open}
        onClick={() => setOpen((v) => !v)}
      />
      {open ? (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 1 }}>
          <SelectPanel>
            {COUNTRIES.map((c) => (
              <SelectItem
                key={c}
                selected={c === value}
                onClick={() => {
                  setValue(c);
                  setOpen(false);
                }}
              >
                {c}
              </SelectItem>
            ))}
          </SelectPanel>
        </div>
      ) : null}
    </div>
  );
}

export const SingleSelectPattern: Story = {
  name: 'Pattern · Single select',
  render: () => <SingleSelectStory />,
  parameters: { controls: { disable: true } },
};

function SearchableMultiSelectStory() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState<Set<string>>(new Set());
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const filtered = useMemo(
    () => COUNTRIES.filter((c) => c.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggle = (c: string) => {
    setDraft((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const openPanel = () => {
    setDraft(new Set(applied));
    setOpen(true);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <SelectButton
        label="Country"
        value={applied.size === 0 ? undefined : `${applied.size} selected`}
        placeholder="All countries"
        badge={applied.size > 0 ? applied.size : undefined}
        open={open}
        onClick={() => (open ? setOpen(false) : openPanel())}
      />
      {open ? (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 1 }}>
          <SelectPanel
            searchable
            searchValue={query}
            onSearchChange={setQuery}
            showApplyButton
            applyLabel="Apply"
            empty={filtered.length === 0}
            onApply={() => {
              setApplied(new Set(draft));
              setOpen(false);
            }}
          >
            {filtered.map((c) => (
              <SelectItem key={c} selected={draft.has(c)} onClick={() => toggle(c)}>
                {c}
              </SelectItem>
            ))}
          </SelectPanel>
        </div>
      ) : null}
    </div>
  );
}

export const SearchableMultiSelectPattern: Story = {
  name: 'Pattern · Searchable multi-select',
  render: () => <SearchableMultiSelectStory />,
  parameters: { controls: { disable: true } },
};
