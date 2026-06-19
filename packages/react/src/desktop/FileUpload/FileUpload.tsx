import { useId, useRef, useState } from 'react';
import { cn } from '../../lib/cn.js';
import { UploadIcon } from '../../shared/icons.js';
import { Button } from '../Button/Button.js';
import { FileUploadCard } from './FileUploadCard.js';
import type { FileUploadProps } from './FileUpload.types';
import './FileUpload.css';

function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="currentColor" />
      <path d="M8 4.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.85" fill="white" />
    </svg>
  );
}

export function FileUpload({
  variant = 'button',
  title,
  description,
  buttonLabel,
  showWebcamButton = false,
  webcamLabel = 'Take Photo',
  onWebcamClick,
  files = [],
  onRemoveFile,
  helperText,
  errorMessage,
  accept,
  multiple,
  disabled = false,
  onChange,
  inputProps,
  className,
  id,
  ...rest
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = id ?? `fileupload-${generatedId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const hasError = Boolean(errorMessage);
  const isDropzone = variant === 'dropzone';
  const resolvedButtonLabel = buttonLabel ?? (isDropzone ? 'Upload File' : 'Select File');

  const handleSelect = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    onChange?.(Array.from(fileList));
  };

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    handleSelect(event.dataTransfer.files);
  };

  return (
    <div
      {...rest}
      className={cn(
        'ui-fileupload',
        `ui-fileupload--${variant}`,
        disabled && 'ui-fileupload--disabled',
        hasError && 'ui-fileupload--error',
        className,
      )}
    >
      {title || description ? (
        <div className="ui-fileupload__heading">
          {title ? <span className="ui-fileupload__title">{title}</span> : null}
          {description ? (
            <span className="ui-fileupload__description">{description}</span>
          ) : null}
        </div>
      ) : null}

      <input
        {...inputProps}
        ref={inputRef}
        id={inputId}
        type="file"
        className="ui-fileupload__input"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => {
          handleSelect(event.target.files);
          // Reset so selecting the same file twice still fires.
          event.target.value = '';
        }}
      />

      {isDropzone ? (
        <div
          className={cn(
            'ui-fileupload__dropzone',
            isDragOver && 'ui-fileupload__dropzone--drag-over',
          )}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span className="ui-fileupload__dropzone-icon" aria-hidden="true">
            <UploadIcon width={40} height={40} />
          </span>
          <div className="ui-fileupload__dropzone-text">
            <span className="ui-fileupload__dropzone-title">
              Choose a file or drag &amp; drop it here
            </span>
            <span className="ui-fileupload__dropzone-subtitle">
              {description && variant === 'dropzone' && !title
                ? null
                : 'Upload a JPEG, JPG, or PNG file with a maximum size of 5 MB.'}
            </span>
          </div>
          <div className="ui-fileupload__dropzone-actions">
            {showWebcamButton ? (
              <Button variant="secondary" size="large" disabled={disabled} onClick={openPicker}>
                {resolvedButtonLabel}
              </Button>
            ) : (
              <Button variant="tertiary" size="large" disabled={disabled} onClick={openPicker}>
                {resolvedButtonLabel}
              </Button>
            )}
            {showWebcamButton ? (
              <Button variant="secondary" size="large" disabled={disabled} onClick={onWebcamClick}>
                {webcamLabel}
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="ui-fileupload__button-row">
          <Button
            variant="secondary"
            size="medium"
            disabled={disabled}
            onClick={openPicker}
            leadingIcon={<UploadIcon width={20} height={20} />}
          >
            {resolvedButtonLabel}
          </Button>
        </div>
      )}

      {files.length > 0 ? (
        <div className="ui-fileupload__files">
          {files.map((file, index) => {
            const cardProps = {
              name: file.name,
              ...(file.meta !== undefined && { meta: file.meta }),
              ...(file.progress !== undefined && { progress: file.progress }),
              ...(file.status !== undefined && { status: file.status }),
              ...(onRemoveFile && { onRemove: () => onRemoveFile(index) }),
            };
            return <FileUploadCard key={`${file.name}-${index}`} {...cardProps} />;
          })}
        </div>
      ) : null}

      {helperText ? <span className="ui-fileupload__helper">{helperText}</span> : null}

      {hasError ? (
        <span className="ui-fileupload__error">
          <ErrorIcon />
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
