import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import { XIcon } from '../../shared/icons.js';
import type { ChipProps } from './Chip.types';
import './Chip.css';

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    children,
    selected = false,
    state,
    leadingIcon,
    trailingIcon,
    badge,
    onTrailingIconClick,
    className,
    type = 'button',
    'aria-pressed': ariaPressed,
    ...props
  },
  ref,
) {
  const visualState = state ?? 'default';
  const showTrailing = selected && trailingIcon !== false && trailingIcon !== undefined;
  const trailingNode =
    trailingIcon === true ? (
      <span className="ui-chip__trailing-circle" aria-hidden="true">
        <XIcon className="ui-chip__close-icon" />
      </span>
    ) : (
      trailingIcon
    );

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={cn(
        'ui-chip',
        selected ? 'ui-chip--selected' : 'ui-chip--unselected',
        `ui-chip--state-${visualState}`,
        className,
      )}
      aria-pressed={ariaPressed ?? selected}
    >
      {leadingIcon ? (
        <span className="ui-chip__icon ui-chip__icon--leading" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <span className="ui-chip__label">{children}</span>
      {showTrailing ? (
        <span
          className="ui-chip__icon ui-chip__icon--trailing"
          aria-hidden={onTrailingIconClick ? undefined : 'true'}
          role={onTrailingIconClick ? 'button' : undefined}
          onClick={
            onTrailingIconClick
              ? (event) => {
                  event.stopPropagation();
                  onTrailingIconClick(event);
                }
              : undefined
          }
        >
          {trailingNode}
        </span>
      ) : null}
      {badge !== undefined && badge !== null ? (
        <span
          className={cn(
            'ui-chip__badge',
            selected ? 'ui-chip__badge--selected' : 'ui-chip__badge--unselected',
          )}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
});
