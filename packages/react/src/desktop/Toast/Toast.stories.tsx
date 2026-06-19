import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Toast } from './Toast';
import { useIsolatedToastSystem } from './Toaster';
import type { ToastPosition, ToastType } from './Toast.types';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=46-2990';

const meta = {
  title: 'Desktop UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    type: 'general',
    children: 'Generic toast',
    close: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Temporary non-blocking feedback. Ships both the visual primitive and a `<Toaster>` manager with imperative `toast.success()` API. Auto-dismiss with hover pause, six placements, and optional action button.',
      },
    },
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_DESIGN_URL },
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['general', 'success', 'warning', 'information', 'error'] satisfies ToastType[],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ----- Visual primitive ----- */

export const General: Story = {};
export const Success: Story = { args: { type: 'success', children: 'Success toast' } };
export const Warning: Story = { args: { type: 'warning', children: 'Warning toast' } };
export const Information: Story = { args: { type: 'information', children: 'Information toast' } };
export const Error: Story = { args: { type: 'error', children: 'Error toast' } };

export const WithClose: Story = {
  args: { type: 'success', children: 'Success toast', close: true },
};

export const WithAction: Story = {
  args: {
    type: 'general',
    children: 'Item deleted',
    close: true,
    action: { label: 'Undo', onClick: () => {} },
  },
};

export const FigmaMatrix: Story = {
  name: 'Visual · Figma matrix',
  render: () => {
    const types: ToastType[] = ['general', 'success', 'warning', 'information', 'error'];
    const labels: Record<ToastType, string> = {
      general: 'Generic toast',
      success: 'Success toast',
      warning: 'Warning toast',
      information: 'Information toast',
      error: 'Error toast',
    };
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        {types.flatMap((type) => [
          <Toast key={`${type}-plain`} type={type}>
            {labels[type]}
          </Toast>,
          <Toast key={`${type}-close`} type={type} close>
            {labels[type]}
          </Toast>,
        ])}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

/* ----- Imperative API patterns — each story uses its own isolated system ----- */

function ImperativeApiStory() {
  const { toast, Toaster } = useIsolatedToastSystem();

  return (
    <>
      <Toaster position="top-right" />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => toast.general('Saved as draft')}>General</Button>
        <Button onClick={() => toast.success('Changes saved')}>Success</Button>
        <Button onClick={() => toast.warning('Storage almost full')}>Warning</Button>
        <Button onClick={() => toast.information('New features available')}>Information</Button>
        <Button onClick={() => toast.error('Upload failed')}>Error</Button>
        <Button variant="tertiary" onClick={() => toast.dismiss()}>
          Dismiss all
        </Button>
      </div>
    </>
  );
}

export const ImperativeApi: Story = {
  name: 'Pattern · Imperative API',
  render: () => <ImperativeApiStory />,
  parameters: { controls: { disable: true } },
};

function UndoPatternStory() {
  const { toast, Toaster } = useIsolatedToastSystem();

  return (
    <>
      <Toaster position="top-right" />
      <Button
        variant="danger-primary"
        onClick={() =>
          toast('Item moved to trash', {
            type: 'general',
            close: true,
            duration: 6000,
            action: {
              label: 'Undo',
              onClick: () => toast.success('Restored', { duration: 2500 }),
            },
          })
        }
      >
        Delete item
      </Button>
    </>
  );
}

export const UndoPattern: Story = {
  name: 'Pattern · Undo action',
  render: () => <UndoPatternStory />,
  parameters: { controls: { disable: true } },
};

function PositionsAndStackStory() {
  const { toast, Toaster } = useIsolatedToastSystem();
  const [position, setPosition] = useState<ToastPosition>('top-right');

  const positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  useEffect(() => () => toast.dismiss(), [toast]);

  const fire = (next: ToastPosition) => {
    toast.dismiss();
    setPosition(next);
    window.setTimeout(() => {
      for (let i = 1; i <= 3; i += 1) {
        window.setTimeout(() => {
          toast.information(`${next} · ${i}`, { duration: 6000 });
        }, i * 200);
      }
    }, 0);
  };

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Toaster key={position} position={position} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {positions.map((p) => (
          <Button
            key={p}
            variant={p === position ? 'primary' : 'secondary'}
            onClick={() => fire(p)}
          >
            {p}
          </Button>
        ))}
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--brankas-typography-desktop-body-sm-regular-font-family)',
          fontSize: 'var(--brankas-typography-desktop-body-sm-regular-font-size)',
          color: 'var(--color-text-subtle)',
        }}
      >
        Each story uses an isolated toast system so it won't leak into other Toasters on the page.
      </p>
    </div>
  );
}

export const PositionsAndStack: Story = {
  name: 'Pattern · Position + stacking',
  render: () => <PositionsAndStackStory />,
  parameters: { controls: { disable: true } },
};
