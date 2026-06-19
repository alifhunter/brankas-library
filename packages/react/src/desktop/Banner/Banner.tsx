import { useState } from 'react';
import { cn } from '../../lib/cn.js';
import { XIcon } from '../../shared/icons.js';
import type {
  BannerMessageIntent,
  BannerMessageState,
  BannerPageIntent,
  BannerProps,
  BannerSectionIntent,
} from './Banner.types';
import './Banner.css';

function resolveSectionIntent(
  intent: BannerProps['intent'],
): BannerSectionIntent {
  if (intent === 'warning' || intent === 'error') {
    return intent;
  }

  return 'informational';
}

function resolvePageIntent(
  intent: BannerProps['intent'],
): BannerPageIntent {
  if (intent === 'error') {
    return 'error';
  }

  return 'warning';
}

function resolveMessageIntent(
  intent: BannerProps['intent'],
): BannerMessageIntent {
  if (intent === 'red' || intent === 'blue') {
    return intent;
  }

  return 'orange';
}

function InfoIcon({ size }: { size: 20 | 24 }) {
  return (
    <svg className="ui-banner__icon-svg" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="var(--color-background-information)" />
      <rect x="11.1" y="10" width="1.8" height="6.2" rx="0.9" fill="var(--color-text-inverse)" />
      <circle cx="12" cy="7.5" r="1.2" fill="var(--color-text-inverse)" />
    </svg>
  );
}

function WarningIcon({ size }: { size: 20 | 24 }) {
  return (
    <svg className="ui-banner__icon-svg" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.7L21 19.5H3L12 3.7Z" fill="var(--color-background-warning)" />
      <rect x="11.1" y="9" width="1.8" height="5.9" rx="0.9" fill="var(--color-text-inverse)" />
      <circle cx="12" cy="17.2" r="1.2" fill="var(--color-text-inverse)" />
    </svg>
  );
}

function ErrorIcon({ size }: { size: 20 | 24 }) {
  return (
    <svg className="ui-banner__icon-svg" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="var(--color-background-error)" />
      <rect x="11.1" y="7.6" width="1.8" height="7.1" rx="0.9" fill="var(--color-text-inverse)" />
      <circle cx="12" cy="17.3" r="1.2" fill="var(--color-text-inverse)" />
    </svg>
  );
}

export function Banner({
  variant = 'section',
  intent,
  size = 'default',
  title = 'Title',
  message,
  showIcon = true,
  showCloseButton = false,
  onClose,
  showReadMore = true,
  readMoreLabel = 'Read more',
  showLessLabel = 'Show less',
  state,
  onStateChange,
  className,
  ...props
}: BannerProps) {
  const sectionIntent = resolveSectionIntent(intent);
  const pageIntent = resolvePageIntent(intent);
  const messageIntent = resolveMessageIntent(intent);

  const isMessage = variant === 'message';
  const isPage = variant === 'page';
  const isSection = variant === 'section';

  const [uncontrolledState, setUncontrolledState] = useState<BannerMessageState>(state ?? 'collapsed');
  const messageState = state ?? uncontrolledState;

  const toggleState = () => {
    if (!isMessage) {
      return;
    }

    const nextState: BannerMessageState = messageState === 'collapsed' ? 'expanded' : 'collapsed';
    if (state === undefined) {
      setUncontrolledState(nextState);
    }
    onStateChange?.(nextState);
  };

  const iconSize: 20 | 24 = isSection && size === 'small' ? 20 : isMessage ? 20 : 24;

  let icon = null;
  const resolvedIconIntent = isMessage ? messageIntent : isPage ? pageIntent : sectionIntent;

  if (resolvedIconIntent === 'informational' || resolvedIconIntent === 'blue') {
    icon = <InfoIcon size={iconSize} />;
  } else if (resolvedIconIntent === 'warning' || resolvedIconIntent === 'orange') {
    icon = <WarningIcon size={iconSize} />;
  } else {
    icon = <ErrorIcon size={iconSize} />;
  }

  return (
    <div
      className={cn(
        'ui-banner',
        `ui-banner--variant-${variant}`,
        isSection && `ui-banner--section-size-${size}`,
        isSection && `ui-banner--section-intent-${sectionIntent}`,
        isPage && `ui-banner--page-intent-${pageIntent}`,
        isMessage && `ui-banner--message-intent-${messageIntent}`,
        isMessage && `ui-banner--message-state-${messageState}`,
        className,
      )}
      {...props}
    >
      {showIcon ? <span className="ui-banner__icon">{icon}</span> : null}

      <div className="ui-banner__content">
        {isMessage && title ? <p className="ui-banner__title">{title}</p> : null}

        <div className={cn('ui-banner__message-row', isMessage && 'ui-banner__message-row--message')}>
          <p
            className={cn(
              'ui-banner__message',
              isSection && size === 'small' && 'ui-banner__message--small',
              isPage && 'ui-banner__message--page',
              isMessage && messageState === 'collapsed' && 'ui-banner__message--collapsed',
            )}
          >
            {message}
          </p>

          {isMessage && showReadMore ? (
            <button type="button" className="ui-banner__link" onClick={toggleState}>
              {messageState === 'collapsed' ? readMoreLabel : showLessLabel}
            </button>
          ) : null}
        </div>
      </div>

      {showCloseButton ? (
        <button type="button" className="ui-banner__close" aria-label="Close banner" onClick={onClose}>
          <XIcon
            className="ui-banner__close-icon"
            width={isMessage ? 16 : size === 'small' ? 20 : 24}
            height={isMessage ? 16 : size === 'small' ? 20 : 24}
          />
        </button>
      ) : null}
    </div>
  );
}
