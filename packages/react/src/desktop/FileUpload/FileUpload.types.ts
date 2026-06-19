import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export type FileUploadVariant = 'button' | 'dropzone';

export type FileUploadCardStatus = 'default' | 'uploading' | 'done' | 'error';

export interface FileUploadItem {
  /** File name shown in the row. */
  name: string;
  /** Right-aligned secondary text (e.g. "500KB" or "Uploading..."). */
  meta?: ReactNode;
  /** When set (0–100), renders a progress bar and percentage. */
  progress?: number;
  /** Visual status — affects name color. Defaults to "done" when progress is undefined. */
  status?: FileUploadCardStatus;
}

export interface FileUploadCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  name: string;
  meta?: ReactNode;
  progress?: number;
  status?: FileUploadCardStatus;
  onRemove?: () => void;
}

export interface FileUploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children' | 'title'> {
  variant?: FileUploadVariant;
  title?: ReactNode;
  description?: ReactNode;

  /** Trigger button label. Defaults to "Select File" (button variant) / "Upload File" (dropzone). */
  buttonLabel?: string;

  /** Dropzone-only secondary "Take Photo" button. */
  showWebcamButton?: boolean;
  webcamLabel?: string;
  onWebcamClick?: () => void;

  /** File rows rendered below the trigger. */
  files?: FileUploadItem[];
  onRemoveFile?: (index: number) => void;

  /** Helper text shown below the upload area. */
  helperText?: ReactNode;
  /** Error message shown below the upload area; presence implies error visual state. */
  errorMessage?: ReactNode;

  /** Standard <input type="file"> attributes. */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;

  /** Fires when the user selects files via picker or drop. */
  onChange?: (files: File[]) => void;

  /** Forwarded to the underlying <input> for additional attributes. */
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'accept' | 'multiple' | 'disabled' | 'onChange'
  >;
}
