import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn.js';
import { Button } from '../Button/Button';
import type { DialogProps, DialogType } from './Dialog.types';
import './Dialog.css';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const DEFAULT_BODY_TEXT: Record<DialogType, string> = {
  informational: '',
  confirmation: 'Are you sure you want to proceed with this action?',
  destructive: 'Are you sure you want to proceed with this action? Once done, it cannot be reverted.',
  'data-entry': '',
};

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'),
  );
}

function DialogPlaceholder() {
  return (
    <div className="ui-modal__placeholder" aria-hidden="true">
      <p className="ui-modal__placeholder-title">Placeholder content</p>
      <p className="ui-modal__placeholder-subtitle">Swap instance with your local component</p>
    </div>
  );
}

export function Dialog({
  open,
  onOpenChange,
  title,
  type = 'informational',
  size = 'small',
  subtitle,
  description,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  showSecondaryAction = true,
  primaryActionLabel,
  secondaryActionLabel,
  deleteActionLabel,
  draftActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  onDeleteAction,
  onDraftAction,
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const isConfirmation = type === 'confirmation';
  const isDestructive = type === 'destructive';
  const isDataEntry = type === 'data-entry';
  const isInformational = type === 'informational';
  const isDataEntryWide = isDataEntry && size !== 'small';

  const bodyText = description ?? DEFAULT_BODY_TEXT[type];
  const shouldShowBodyText = (isConfirmation || isDestructive) && Boolean(bodyText);
  const shouldShowPlaceholder = !children && (isInformational || isDataEntry);

  const primaryLabel =
    primaryActionLabel ??
    (isInformational ? 'Ok' : isConfirmation ? 'Submit' : isDestructive ? 'Delete' : 'Submit');
  const secondaryLabel = secondaryActionLabel ?? 'Cancel';
  const deleteLabel = deleteActionLabel ?? 'Delete';
  const draftLabel = draftActionLabel ?? 'Save As Draft';

  useEffect(() => {
    if (!open || typeof document === 'undefined') {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const dialogNode = dialogRef.current;
    const frame = requestAnimationFrame(() => {
      const firstFocusable = getFocusableElements(dialogNode ?? document.body)[0];
      (firstFocusable ?? closeButtonRef.current ?? dialogNode)?.focus();
    });

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc) {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key !== 'Tab' || !dialogNode) {
        return;
      }

      const focusable = getFocusableElements(dialogNode);
      if (focusable.length === 0) {
        event.preventDefault();
        dialogNode.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, closeOnEsc, onOpenChange]);

  if (!open || typeof document === 'undefined') {
    return null;
  }

  const close = () => onOpenChange(false);

  return (
    <>
      {createPortal(
        <div
          className="ui-modal__backdrop"
      data-testid="dialog-backdrop"
      onClick={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <div
        ref={dialogRef}
        className={cn('ui-modal', `ui-modal--size-${size}`, `ui-modal--type-${type}`)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={shouldShowBodyText ? descriptionId : undefined}
        tabIndex={-1}
      >
        <div className={cn('ui-modal__header', isDataEntry && 'ui-modal__header--with-divider')}>
          <div className="ui-modal__heading">
            <h2 id={titleId} className="ui-modal__title">
              {title}
            </h2>
            {subtitle ? <p className="ui-modal__subtitle">{subtitle}</p> : null}
          </div>
          {showCloseButton ? (
            <button
              ref={closeButtonRef}
              type="button"
              className="ui-modal__close"
              aria-label="Close dialog"
              onClick={close}
            >
              ×
            </button>
          ) : null}
        </div>

        <div className={cn('ui-modal__content', isDataEntry && 'ui-modal__content--data-entry')}>
          {shouldShowBodyText ? (
            <p id={descriptionId} className="ui-modal__body-text">
              {bodyText}
            </p>
          ) : null}
          {children ?? (shouldShowPlaceholder ? <DialogPlaceholder /> : null)}
        </div>

        {isDataEntryWide ? (
          <div className="ui-modal__footer ui-modal__footer--data-entry-wide">
            <Button
              variant="secondary"
              size="large"
              className="ui-modal__action ui-modal__action--danger-secondary"
              onClick={onDeleteAction}
            >
              {deleteLabel}
            </Button>
            <div className="ui-modal__footer-right-actions">
              <Button
                variant="secondary"
                size="large"
                className="ui-modal__action"
                onClick={onSecondaryAction}
              >
                {secondaryLabel}
              </Button>
              <Button
                variant="secondary"
                size="large"
                className="ui-modal__action ui-modal__action--info-secondary"
                onClick={onDraftAction}
              >
                {draftLabel}
              </Button>
              <Button variant="primary" size="large" className="ui-modal__action" onClick={onPrimaryAction}>
                {primaryLabel}
              </Button>
            </div>
          </div>
        ) : (
          <div className={cn('ui-modal__footer', isDataEntry && 'ui-modal__footer--with-divider')}>
            {(isConfirmation || isDestructive || isDataEntry) && showSecondaryAction ? (
              <Button
                variant="secondary"
                size="large"
                className="ui-modal__action ui-modal__action--grow"
                onClick={onSecondaryAction}
              >
                {secondaryLabel}
              </Button>
            ) : null}

            <Button
              variant="primary"
              size="large"
              className={cn(
                'ui-modal__action',
                (isInformational || isConfirmation || isDestructive || isDataEntry) &&
                  'ui-modal__action--grow',
                isDestructive && 'ui-modal__action--danger-primary',
              )}
              leadingIcon={isDestructive ? <span aria-hidden="true">🗑</span> : undefined}
              onClick={onPrimaryAction}
            >
              {primaryLabel}
            </Button>
          </div>
        )}
      </div>
    </div>,
        document.body,
      )}
    </>
  );
}
