import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Pagination } from './Pagination';

const FIGMA_DESIGN_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=543-75263';

const meta = {
  title: 'Desktop UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    count: 5,
    defaultPage: 1,
    showRowsPerPage: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onPageChange: fn(),
    onRowsPerPageChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Move through long ordered result sets with optional rows-per-page selector. Auto-generates ellipsis around the current page; `siblingCount` and `boundaryCount` are configurable.',
      },
    },
    layout: 'padded',
    design: {
      type: 'figma',
      url: FIGMA_DESIGN_URL,
    },
  },
  argTypes: {
    page: { control: false },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    boundaryCount: { control: { type: 'number', min: 0, max: 3 } },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FivePages: Story = {
  args: { count: 5, defaultPage: 1 },
};

export const ManyPagesAtStart: Story = {
  args: { count: 99, defaultPage: 1 },
};

export const ManyPagesAtEnd: Story = {
  args: { count: 99, defaultPage: 99 },
};

export const ManyPagesInMiddle: Story = {
  args: { count: 99, defaultPage: 11 },
};

export const SinglePage: Story = {
  args: { count: 1 },
};

export const WithoutRowsPerPage: Story = {
  args: { count: 5, showRowsPerPage: false },
};

export const Disabled: Story = {
  args: { count: 99, defaultPage: 5, disabled: true },
};

function ControlledStory() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const total = 124;
  const totalPages = Math.ceil(total / rows);
  const start = (page - 1) * rows + 1;
  const end = Math.min(start + rows - 1, total);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <output style={{ fontFamily: 'monospace', fontSize: 13 }}>
        Showing {start}–{end} of {total}
      </output>
      <Pagination
        count={totalPages}
        page={page}
        onPageChange={setPage}
        rowsPerPage={rows}
        onRowsPerPageChange={(value) => {
          setRows(value);
          setPage(1);
        }}
      />
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledStory />,
  parameters: { controls: { disable: true } },
};
