import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../Button/Button';
import { Dropdown } from './Dropdown';
import { DropdownItem } from './DropdownItem';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=461-3230';

const meta = {
  title: 'Desktop UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Floating action menu triggered by a button. Choosing an item performs the action and closes the menu. Items support default/danger/disabled variants and leading/trailing icon slots.',
      },
    },
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownItem onClick={fn()}>1st menu item</DropdownItem>
      <DropdownItem onClick={fn()}>2nd menu item</DropdownItem>
      <DropdownItem onClick={fn()}>3rd menu item</DropdownItem>
      <DropdownItem disabled>4th menu item</DropdownItem>
      <DropdownItem variant="danger" onClick={fn()}>
        5th menu item
      </DropdownItem>
    </Dropdown>
  ),
};

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M7.5 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const WithIcons: Story = {
  render: () => (
    <Dropdown>
      <DropdownItem leadingIcon={<PlusIcon />} onClick={fn()}>
        New file
      </DropdownItem>
      <DropdownItem leadingIcon={<PlusIcon />} trailingIcon={<ChevronRightIcon />}>
        Templates
      </DropdownItem>
      <DropdownItem leadingIcon={<PlusIcon />} onClick={fn()}>
        Import
      </DropdownItem>
    </Dropdown>
  ),
};

export const Scrollable: Story = {
  render: () => (
    <Dropdown maxHeight={240}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <DropdownItem key={idx} onClick={fn()}>
          Menu item {idx + 1}
        </DropdownItem>
      ))}
    </Dropdown>
  ),
};

function TriggerStory() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const pick = (label: string) => {
    setPicked(label);
    setOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
        <Button onClick={() => setOpen((v) => !v)}>Open menu</Button>
        {open ? (
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 1 }}>
            <Dropdown>
              <DropdownItem onClick={() => pick('Edit')}>Edit</DropdownItem>
              <DropdownItem onClick={() => pick('Duplicate')}>Duplicate</DropdownItem>
              <DropdownItem onClick={() => pick('Archive')}>Archive</DropdownItem>
              <DropdownItem disabled>Locked</DropdownItem>
              <DropdownItem variant="danger" onClick={() => pick('Delete')}>
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        ) : null}
      </div>
      <output style={{ fontFamily: 'monospace', fontSize: 13 }}>
        Last action: {picked ?? '—'}
      </output>
    </div>
  );
}

export const InteractiveTrigger: Story = {
  render: () => <TriggerStory />,
  parameters: { controls: { disable: true } },
};
