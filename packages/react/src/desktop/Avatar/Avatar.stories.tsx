import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Avatar } from './Avatar';

const FIGMA_DESIGN_URL = 'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=42-627&t=cbDdJkf2R9sCvLxn-4';

const demoAvatarImage =
  'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%25%22%20x2%3D%22100%25%22%20y1%3D%220%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23e8edf3%22/%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23c8d0db%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22/%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2226%22%20r%3D%2212%22%20fill%3D%22%23f8d2bf%22/%3E%3Cpath%20d%3D%22M14%2062c3-12%2013-18%2018-18s15%206%2018%2018%22%20fill%3D%22%231e2630%22/%3E%3Cpath%20d%3D%22M18%2024c1-8%206-14%2014-14s13%206%2014%2014c-4-4-9-7-14-7s-10%203-14%207Z%22%20fill%3D%22%232f3a47%22/%3E%3C/svg%3E';

const meta = {
  title: 'Desktop UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    type: 'image',
    size: 'large',
    src: demoAvatarImage,
    alt: 'User avatar',
    initials: 'UN',
  },
  parameters: {
    docs: {
      description: {
        component: 'Represent people, accounts, or entities in compact identity surfaces. Supports image, initials, or icon fallback in three sizes.',
      },
    },
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    className: { control: false },
    icon: { control: false },
    type: {
      control: 'inline-radio',
      options: ['image', 'icon', 'initial'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageLarge: Story = {};

export const IconLarge: Story = {
  args: {
    type: 'icon',
  },
};

export const InitialLarge: Story = {
  args: {
    type: 'initial',
  },
};

export const AllTypesAndSizes: Story = {
  render: (args) => {
    const sizes: Array<'large' | 'medium' | 'small'> = ['large', 'medium', 'small'];
    const types: Array<'icon' | 'initial' | 'image'> = ['icon', 'initial', 'image'];

    return (
      <div
        data-testid="avatar-grid"
        style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(3, max-content)', alignItems: 'center' }}
      >
        {types.map((type) =>
          sizes.map((size) => (
            <Avatar
              key={`${type}-${size}`}
              {...args}
              type={type}
              size={size}
              src={type === 'image' ? args.src : undefined}
            />
          )),
        )}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('avatar-grid').children).toHaveLength(9);
  },
};

export const ImageFallbackToIcon: Story = {
  args: {
    type: 'image',
    src: '',
  },
};
