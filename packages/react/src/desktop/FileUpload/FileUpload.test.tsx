import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('renders the button variant by default and triggers onChange when a file is selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<FileUpload title="Title" description="Desc" onChange={onChange} />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();

    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    await user.upload(fileInput, file);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]?.[0]).toEqual([file]);
  });

  it('renders the dropzone variant with the upload button', () => {
    render(<FileUpload variant="dropzone" />);

    expect(screen.getByText(/Choose a file or drag/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload File' })).toBeInTheDocument();
  });

  it('shows file rows with progress and remove handler', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();

    render(
      <FileUpload
        files={[{ name: 'doc.pdf', meta: 'Uploading...', progress: 25 }]}
        onRemoveFile={onRemove}
      />,
    );

    expect(screen.getByText('doc.pdf')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '25');

    await user.click(screen.getByRole('button', { name: 'Remove doc.pdf' }));
    expect(onRemove).toHaveBeenCalledWith(0);
  });

  it('renders error state with message', () => {
    render(<FileUpload errorMessage="Please upload file smaller than 50MB." />);

    expect(screen.getByText('Please upload file smaller than 50MB.')).toBeInTheDocument();
  });

  it('disables the picker when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<FileUpload variant="dropzone" disabled onChange={onChange} />);

    const button = screen.getByRole('button', { name: 'Upload File' });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onChange).not.toHaveBeenCalled();
  });
});
