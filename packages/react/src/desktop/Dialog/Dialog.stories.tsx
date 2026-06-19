import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Dialog } from './Dialog';
import type { DialogSize, DialogType } from './Dialog.types';

const FIGMA_DESIGN_URL = 'https://www.figma.com/file/REPLACE_WITH_DIALOG_FIGMA_URL';

type StoryHarnessProps = {
  title: string;
  type: DialogType;
  size: DialogSize;
  subtitle?: string;
  description?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  showSecondaryAction?: boolean;
  children?: ReactNode;
};

function StoryHarness(props: StoryHarnessProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ minHeight: 260, display: 'grid', placeItems: 'center' }}>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={props.title}
        type={props.type}
        size={props.size}
        subtitle={props.subtitle}
        description={props.description}
        closeOnOverlayClick={props.closeOnOverlayClick}
        closeOnEsc={props.closeOnEsc}
        showCloseButton={props.showCloseButton}
        showSecondaryAction={props.showSecondaryAction}
        onPrimaryAction={() => setOpen(false)}
        onSecondaryAction={() => setOpen(false)}
        onDeleteAction={() => setOpen(false)}
        onDraftAction={() => setOpen(false)}
      >
        {props.children}
      </Dialog>
    </div>
  );
}

const meta = {
  title: 'Desktop UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Focused decisions, confirmations, and short data-entry flows. Four types (informational, confirmation, destructive, data-entry) and three sizes. Traps focus, supports Escape and overlay-click to close.',
      },
    },
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  args: {
    open: false,
    onOpenChange: fn(),
    title: 'Information alert',
    type: 'informational',
    size: 'small',
    closeOnOverlayClick: true,
    closeOnEsc: true,
    showCloseButton: true,
    showSecondaryAction: true,
  },
  argTypes: {
    open: { control: false },
    onOpenChange: { control: false },
    onPrimaryAction: { control: false },
    onSecondaryAction: { control: false },
    onDeleteAction: { control: false },
    onDraftAction: { control: false },
    children: { control: false },
    type: {
      control: 'inline-radio',
      options: ['informational', 'confirmation', 'destructive', 'data-entry'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
  render: (args) => (
    <StoryHarness
      title={args.title ?? 'Information alert'}
      type={args.type ?? 'informational'}
      size={args.size ?? 'small'}
      subtitle={args.subtitle}
      description={args.description}
      closeOnEsc={args.closeOnEsc}
      closeOnOverlayClick={args.closeOnOverlayClick}
      showCloseButton={args.showCloseButton}
      showSecondaryAction={args.showSecondaryAction}
    >
      {args.children}
    </StoryHarness>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InformationalSmall: Story = {
  args: {
    title: 'Information alert',
    type: 'informational',
    size: 'small',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));

    await expect(within(document.body).getByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument();
    });
  },
};

export const ConfirmationMedium: Story = {
  args: {
    title: 'Confirmation alert',
    type: 'confirmation',
    size: 'medium',
  },
};

export const DestructiveMedium: Story = {
  args: {
    title: 'Destructive alert',
    type: 'destructive',
    size: 'medium',
  },
};

export const DataEntrySmall: Story = {
  args: {
    title: 'Data entry',
    type: 'data-entry',
    size: 'small',
  },
};

export const DataEntryLarge: Story = {
  args: {
    title: 'Data entry',
    type: 'data-entry',
    size: 'large',
  },
};

export const NonDismissable: Story = {
  args: {
    title: 'Confirmation alert',
    type: 'confirmation',
    size: 'small',
    closeOnEsc: false,
    closeOnOverlayClick: false,
  },
};
