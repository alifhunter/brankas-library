import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Carousel } from './Carousel';

const FIGMA_DESIGN_URL = 'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=326-9659&t=cbDdJkf2R9sCvLxn-4';

const meta = {
  title: 'Desktop UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  args: {
    totalSlides: 5,
    defaultActiveSlide: 1,
    clickable: true,
    onSlideChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Indicator dots for a short, bounded set of slides. Use for ≤5 slides where position should be visible; pair with prev/next or swipe gestures for actual slide navigation.',
      },
    },
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    className: { control: false },
    style: { control: false },
    ariaLabel: { control: false },
    onSlideChange: { control: false },
    activeSlide: { control: false },
    totalSlides: {
      control: { type: 'range', min: 1, max: 7, step: 1 },
      description: 'Pilih jumlah dot carousel (1-7)',
    },
    defaultActiveSlide: {
      control: { type: 'range', min: 1, max: 7, step: 1 },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Slide3Of5: Story = {
  args: {
    totalSlides: 5,
    activeSlide: 3,
  },
};

export const SevenSlides: Story = {
  args: {
    totalSlides: 7,
    activeSlide: 4,
  },
};

export const OneSlide: Story = {
  args: {
    totalSlides: 1,
    defaultActiveSlide: 1,
  },
};

export const InteractionClick: Story = {
  args: {
    totalSlides: 5,
    defaultActiveSlide: 1,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const dot2 = canvas.getByRole('button', { name: 'Go to slide 2' });

    await userEvent.click(dot2);

    await expect(args.onSlideChange).toHaveBeenCalledWith(2);
    await expect(dot2).toHaveClass('ui-carousel__dot--active');
  },
};
