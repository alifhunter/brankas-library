import { cn } from '../../lib/cn.js';
import { XIcon } from '../../shared/icons.js';
import { Button } from '../Button/Button.js';
import type { CoachmarkProps } from './Coachmark.types';
import './Coachmark.css';

export function Coachmark({
  title = 'Title',
  children = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
  position = 'top-center',
  close = true,
  onDismiss,
  config = false,
  totalSteps = 2,
  currentStep = 1,
  actions,
  primaryActionLabel = 'Button 2',
  secondaryActionLabel = 'Button 1',
  onPrimaryAction,
  onSecondaryAction,
  className,
  ...rest
}: CoachmarkProps) {
  return (
    <div
      {...rest}
      role="dialog"
      aria-label={typeof title === 'string' ? title : undefined}
      className={cn('ui-coachmark', `ui-coachmark--${position}`, className)}
    >
      <div className="ui-coachmark__panel">
        <div className="ui-coachmark__heading">
          <span className="ui-coachmark__title">{title}</span>
          <p className="ui-coachmark__body">{children}</p>
        </div>
        {close ? (
          <button
            type="button"
            className="ui-coachmark__close"
            aria-label="Dismiss"
            onClick={onDismiss}
          >
            <XIcon width={12} height={12} />
          </button>
        ) : null}
        {config ? (
          <div className="ui-coachmark__config">
            <div className="ui-coachmark__dots" aria-hidden="true">
              {Array.from({ length: Math.max(1, totalSteps) }).map((_, idx) => (
                <span
                  key={idx}
                  className={cn(
                    'ui-coachmark__dot',
                    idx + 1 === currentStep && 'ui-coachmark__dot--active',
                  )}
                />
              ))}
            </div>
            {actions ?? (
              <div className="ui-coachmark__actions">
                <Button size="small" variant="tertiary" onClick={onSecondaryAction}>
                  {secondaryActionLabel}
                </Button>
                <Button size="small" onClick={onPrimaryAction}>
                  {primaryActionLabel}
                </Button>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <span className="ui-coachmark__arrow" aria-hidden="true" />
    </div>
  );
}
