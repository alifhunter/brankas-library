import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Banner } from './Banner';

const FIGMA_DESIGN_URL_SECTION = 'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=105-6789&t=cbDdJkf2R9sCvLxn-4';
const FIGMA_DESIGN_URL_PAGE = 'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=107-7093&t=cbDdJkf2R9sCvLxn-4';
const FIGMA_DESIGN_URL_MESSAGE = 'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=107-7105&t=cbDdJkf2R9sCvLxn-4';
const BANNER_DESIGN_TABS = [
  {
    name: 'Section',
    type: 'figma',
    url: FIGMA_DESIGN_URL_SECTION,
  },
  {
    name: 'Page',
    type: 'figma',
    url: FIGMA_DESIGN_URL_PAGE,
  },
  {
    name: 'Message',
    type: 'figma',
    url: FIGMA_DESIGN_URL_MESSAGE,
  },
] as const;

const LONG_MESSAGE =
  'Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.';

function MessageHarness() {
  const [state, setState] = useState<'collapsed' | 'expanded'>('collapsed');

  return (
    <Banner
      variant="message"
      intent="orange"
      title="Title"
      message={LONG_MESSAGE}
      showReadMore
      state={state}
      onStateChange={setState}
    />
  );
}

const meta = {
  title: 'Desktop UI/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: {
    variant: 'section',
    intent: 'informational',
    size: 'default',
    title: 'Title',
    message: LONG_MESSAGE,
    showIcon: true,
    showCloseButton: false,
    showReadMore: true,
    state: 'collapsed',
  },
  argTypes: {
    className: { control: false },
    onClose: { control: false },
    onStateChange: { control: false },
    variant: {
      control: 'inline-radio',
      options: ['section', 'page', 'message'],
    },
    intent: {
      control: 'inline-radio',
      options: ['informational', 'warning', 'error', 'orange', 'red', 'blue'],
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'small'],
    },
    state: {
      control: 'inline-radio',
      options: ['collapsed', 'expanded'],
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Page, section, or message-level feedback that needs more space than a toast. Three variants (section, page, message) with informational/warning/error intents and an optional close button.',
      },
    },
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL_SECTION,
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesignReferenceTabs: Story = {
  name: 'Design References',
  args: {
    variant: 'section',
    intent: 'informational',
    size: 'default',
    showCloseButton: false,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis',
  },
  parameters: {
    design: BANNER_DESIGN_TABS,
  },
};

export const SectionInformationalDefault: Story = {
  args: {
    variant: 'section',
    intent: 'informational',
    size: 'default',
    showCloseButton: false,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis',
  },
  parameters: {
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL_SECTION,
    },
  },
};

export const SectionWarningSmall: Story = {
  args: {
    variant: 'section',
    intent: 'warning',
    size: 'small',
    showCloseButton: true,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis',
  },
};

export const SectionErrorDefault: Story = {
  args: {
    variant: 'section',
    intent: 'error',
    size: 'default',
    showCloseButton: true,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis',
  },
};

export const PageWarning: Story = {
  args: {
    variant: 'page',
    intent: 'warning',
    message: 'Sedang ada kendala di server...',
  },
  parameters: {
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL_PAGE,
    },
  },
};

export const PageError: Story = {
  args: {
    variant: 'page',
    intent: 'error',
    showCloseButton: true,
    message: 'Koneksi internet terputus. Silakan...',
  },
};

export const MessageOrangeCollapsed: Story = {
  args: {
    variant: 'message',
    intent: 'orange',
    state: 'collapsed',
    title: 'Title',
    showReadMore: true,
    message: LONG_MESSAGE,
  },
  parameters: {
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL_MESSAGE,
    },
  },
};

export const MessageRedExpanded: Story = {
  args: {
    variant: 'message',
    intent: 'red',
    state: 'expanded',
    title: 'Title',
    showReadMore: true,
    message: LONG_MESSAGE,
  },
};

export const MessageBlueCollapsed: Story = {
  args: {
    variant: 'message',
    intent: 'blue',
    state: 'collapsed',
    title: 'Title',
    showReadMore: true,
    message: LONG_MESSAGE,
  },
};

export const MessageWithCloseButton: Story = {
  args: {
    variant: 'message',
    intent: 'orange',
    state: 'collapsed',
    title: 'Title',
    showCloseButton: true,
    showReadMore: true,
    message: LONG_MESSAGE,
  },
};

export const MessageInteractionToggle: Story = {
  render: () => <MessageHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const readMore = canvas.getByRole('button', { name: 'Read more' });
    await userEvent.click(readMore);
    await expect(canvas.getByRole('button', { name: 'Show less' })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Show less' }));
    await expect(canvas.getByRole('button', { name: 'Read more' })).toBeInTheDocument();
  },
};
