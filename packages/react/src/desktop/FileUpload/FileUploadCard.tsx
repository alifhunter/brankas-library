import { cn } from '../../lib/cn.js';
import type { FileUploadCardProps } from './FileUpload.types';

function FileIcon() {
  return (
    <svg
      className="ui-fileupload__file-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 3v5h5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 9l6 6M15 9l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FileUploadCard({
  name,
  meta,
  progress,
  status,
  onRemove,
  className,
  ...rest
}: FileUploadCardProps) {
  const resolvedStatus: FileUploadCardProps['status'] =
    status ?? (typeof progress === 'number' ? 'uploading' : 'done');

  return (
    <div
      {...rest}
      className={cn(
        'ui-fileupload__card',
        `ui-fileupload__card--${resolvedStatus}`,
        className,
      )}
    >
      <div className="ui-fileupload__card-row">
        <span className="ui-fileupload__card-icon" aria-hidden="true">
          <FileIcon />
        </span>
        <div className="ui-fileupload__card-name-block">
          <span className="ui-fileupload__card-name">{name}</span>
          {meta !== undefined ? <span className="ui-fileupload__card-meta">{meta}</span> : null}
        </div>
        {onRemove ? (
          <button
            type="button"
            className="ui-fileupload__card-close"
            aria-label={`Remove ${name}`}
            onClick={onRemove}
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
      {typeof progress === 'number' ? (
        <div className="ui-fileupload__progress-row">
          <div
            className="ui-fileupload__progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="ui-fileupload__progress-fill"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <span className="ui-fileupload__progress-pct">{Math.round(progress)}%</span>
        </div>
      ) : null}
    </div>
  );
}
