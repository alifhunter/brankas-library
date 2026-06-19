import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FileUpload } from './FileUpload';
import type { FileUploadItem } from './FileUpload.types';

const FIGMA_BUTTON_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=650-921';
const FIGMA_DROPZONE_URL =
  'https://www.figma.com/design/hkFcwt5tne0DaqyzObtxwu/Desktop-UI-Kit?node-id=650-1051';

const meta = {
  title: 'Desktop UI/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  args: {
    variant: 'button',
    title: 'Title',
    description: 'Description',
    onChange: fn(),
    onRemoveFile: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'Button or drag-and-drop file selector with progress tracking. Two variants (button trigger, dropzone) plus a `FileUploadCard` row showing name, progress bar, and remove button.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: FIGMA_BUTTON_URL,
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['button', 'dropzone'],
    },
    files: { control: false },
    inputProps: { control: false },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ButtonUploading: Story = {
  args: {
    files: [{ name: 'Data bancassurance.pdf', meta: 'Uploading...', progress: 25 }],
  },
};

export const ButtonDone: Story = {
  args: {
    files: [{ name: 'Data bancassurance.pdf', meta: '500KB', status: 'done' }],
  },
};

export const ButtonError: Story = {
  args: {
    errorMessage: 'Please upload file smaller than 50MB.',
  },
};

export const ButtonDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const Dropzone: Story = {
  args: {
    variant: 'dropzone',
  },
  parameters: { design: { type: 'figma', url: FIGMA_DROPZONE_URL } },
};

export const DropzoneWithWebcam: Story = {
  args: {
    variant: 'dropzone',
    showWebcamButton: true,
    onWebcamClick: fn(),
  },
  parameters: { design: { type: 'figma', url: FIGMA_DROPZONE_URL } },
};

export const DropzoneUploading: Story = {
  args: {
    variant: 'dropzone',
    files: [{ name: 'Data bancassurance.pdf', meta: 'Uploading...', progress: 25 }],
  },
  parameters: { design: { type: 'figma', url: FIGMA_DROPZONE_URL } },
};

export const DropzoneDone: Story = {
  args: {
    variant: 'dropzone',
    files: [{ name: 'Data bancassurance.pdf', meta: '500KB', status: 'done' }],
  },
  parameters: { design: { type: 'figma', url: FIGMA_DROPZONE_URL } },
};

export const DropzoneError: Story = {
  args: {
    variant: 'dropzone',
    errorMessage: 'Please upload file smaller than 50MB.',
  },
  parameters: { design: { type: 'figma', url: FIGMA_DROPZONE_URL } },
};

export const DropzoneDisabled: Story = {
  args: {
    variant: 'dropzone',
    disabled: true,
  },
  parameters: { design: { type: 'figma', url: FIGMA_DROPZONE_URL } },
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function InteractiveStory({ variant }: { variant: 'button' | 'dropzone' }) {
  const [items, setItems] = useState<FileUploadItem[]>([]);

  useEffect(() => {
    if (items.length === 0) return;
    const uploading = items.find((f) => f.progress !== undefined && f.progress < 100);
    if (!uploading) return;
    const timer = setTimeout(() => {
      setItems((prev) =>
        prev.map((file) => {
          if (file.progress === undefined || file.progress >= 100) return file;
          const next = Math.min(100, file.progress + 20);
          return next >= 100
            ? { ...file, progress: undefined, meta: file.meta?.toString().replace(/.*/, '') || 'Done', status: 'done' }
            : { ...file, progress: next };
        }),
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <FileUpload
      variant={variant}
      title="Upload statement"
      description="PDF, JPG, PNG up to 5 MB"
      files={items}
      onChange={(files) => {
        setItems((prev) => [
          ...prev,
          ...files.map((f) => ({
            name: f.name,
            meta: formatBytes(f.size),
            progress: 0,
          })),
        ]);
      }}
      onRemoveFile={(index) => setItems((prev) => prev.filter((_, i) => i !== index))}
    />
  );
}

export const InteractiveButton: Story = {
  render: () => <InteractiveStory variant="button" />,
  parameters: { controls: { disable: true } },
};

export const InteractiveDropzone: Story = {
  render: () => <InteractiveStory variant="dropzone" />,
  parameters: {
    controls: { disable: true },
    design: { type: 'figma', url: FIGMA_DROPZONE_URL },
  },
};
