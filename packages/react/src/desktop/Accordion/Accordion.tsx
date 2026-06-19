import { useId, useState } from 'react';
import { cn } from '../../lib/cn.js';
import { ChevronDownIcon } from '../../shared/icons.js';
import { Button } from '../Button/Button';
import type { AccordionProps } from './Accordion.types';
import './Accordion.css';

function PlaceholderCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="ui-accordion__placeholder" aria-hidden="true">
      <p className="ui-accordion__placeholder-title">{title}</p>
      <p className="ui-accordion__placeholder-subtitle">{subtitle}</p>
    </div>
  );
}

export function Accordion({
  title,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  state = 'default',
  showLeadingIcon = true,
  leadingIcon,
  actionLabel,
  onActionClick,
  placeholderTitle = 'Placeholder Content',
  placeholderSubtitle = 'replace with a local component',
  className,
  contentClassName,
}: AccordionProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const generatedId = useId();
  const triggerId = `accordion-trigger-${generatedId}`;
  const contentId = `accordion-content-${generatedId}`;

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  const handleToggle = () => setOpen(!isOpen);

  return (
    <div
      className={cn(
        'ui-accordion',
        isOpen && 'ui-accordion--open',
        state === 'hover' && 'ui-accordion--hover',
        className,
      )}
    >
      <div className="ui-accordion__header">
        <button
          id={triggerId}
          type="button"
          className="ui-accordion__trigger"
          aria-controls={contentId}
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          <span className="ui-accordion__left">
            {showLeadingIcon ? (
              <span className="ui-accordion__leading-icon" aria-hidden="true">
                {leadingIcon ?? <span className="ui-accordion__leading-mark">◌</span>}
              </span>
            ) : null}
            <span className="ui-accordion__title">{title}</span>
          </span>
        </button>

        <div className="ui-accordion__right">
          {actionLabel ? (
            <Button variant="secondary" size="large" className="ui-accordion__action" onClick={onActionClick}>
              {actionLabel}
            </Button>
          ) : null}

          <button
            type="button"
            className="ui-accordion__chevron-shell"
            aria-label={isOpen ? 'Collapse section' : 'Expand section'}
            aria-controls={contentId}
            aria-expanded={isOpen}
            onClick={handleToggle}
          >
            <ChevronDownIcon
              className={cn('ui-accordion__chevron', isOpen && 'ui-accordion__chevron--open')}
            />
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          className={cn('ui-accordion__content', contentClassName)}
        >
          {children ?? <PlaceholderCard title={placeholderTitle} subtitle={placeholderSubtitle} />}
        </div>
      ) : null}
    </div>
  );
}
