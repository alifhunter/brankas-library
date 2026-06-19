import {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn.js';
import type { TooltipPlacement, TooltipProps } from './Tooltip.types';
import './Tooltip.css';

const OPPOSITE: Record<TooltipPlacement, TooltipPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

interface Position {
  placement: TooltipPlacement;
  style: CSSProperties;
}

function computePosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  preferred: TooltipPlacement,
  offset: number,
): Position {
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const padding = 8;

  const fits = (placement: TooltipPlacement): boolean => {
    switch (placement) {
      case 'top':
        return triggerRect.top - tooltipRect.height - offset >= padding;
      case 'bottom':
        return triggerRect.bottom + tooltipRect.height + offset <= viewportH - padding;
      case 'left':
        return triggerRect.left - tooltipRect.width - offset >= padding;
      case 'right':
        return triggerRect.right + tooltipRect.width + offset <= viewportW - padding;
    }
  };

  const placement = fits(preferred) ? preferred : OPPOSITE[preferred];

  // Compute coordinates in viewport space (use position: fixed)
  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'bottom':
      top = triggerRect.bottom + offset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'left':
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left - tooltipRect.width - offset;
      break;
    case 'right':
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.right + offset;
      break;
  }

  // Clamp into viewport with the same padding so the tooltip doesn't cling to edges.
  left = Math.max(padding, Math.min(left, viewportW - tooltipRect.width - padding));
  top = Math.max(padding, Math.min(top, viewportH - tooltipRect.height - padding));

  return {
    placement,
    style: { top: `${top}px`, left: `${left}px` },
  };
}

export function Tooltip({
  content,
  children,
  placement: preferredPlacement = 'top',
  disabled = false,
  openDelay = 500,
  closeDelay = 100,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  offset = 8,
  role = 'tooltip',
}: TooltipProps) {
  const tooltipId = useId();
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;

  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const clearTimers = () => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleOpen = () => {
    if (disabled) return;
    clearTimers();
    if (openDelay <= 0) {
      setOpen(true);
      return;
    }
    openTimer.current = window.setTimeout(() => setOpen(true), openDelay);
  };

  const scheduleClose = () => {
    clearTimers();
    if (closeDelay <= 0) {
      setOpen(false);
      return;
    }
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
  };

  useEffect(() => clearTimers, []);

  // Re-position when open + on scroll/resize.
  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !tooltipRef.current) return undefined;

    const reposition = () => {
      const trigger = triggerRef.current;
      const tooltip = tooltipRef.current;
      if (!trigger || !tooltip) return;
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      setPosition(computePosition(triggerRect, tooltipRect, preferredPlacement, offset));
    };

    reposition();
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [open, preferredPlacement, offset, content]);

  // Escape closes
  useEffect(() => {
    if (!open) return undefined;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearTimers();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, setOpen]);

  const child = children as ReactElement<{
    ref?: React.Ref<HTMLElement>;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    'aria-describedby'?: string;
  }>;
  const childProps = child.props;

  const describedBy =
    open && !disabled
      ? [childProps['aria-describedby'], tooltipId].filter(Boolean).join(' ')
      : childProps['aria-describedby'];

  const triggerEl = cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const ref = (child as { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && typeof ref === 'object' && 'current' in ref) {
        (ref as { current: HTMLElement | null }).current = node;
      }
    },
    onMouseEnter: (event: React.MouseEvent) => {
      scheduleOpen();
      childProps.onMouseEnter?.(event);
    },
    onMouseLeave: (event: React.MouseEvent) => {
      scheduleClose();
      childProps.onMouseLeave?.(event);
    },
    onFocus: (event: React.FocusEvent) => {
      scheduleOpen();
      childProps.onFocus?.(event);
    },
    onBlur: (event: React.FocusEvent) => {
      scheduleClose();
      childProps.onBlur?.(event);
    },
    ...(describedBy ? { 'aria-describedby': describedBy } : {}),
  });

  const tooltipStyle: CSSProperties = {
    ...(position?.style ?? { top: 0, left: 0, visibility: 'hidden' }),
  };

  return (
    <>
      {triggerEl}
      {mounted && open && !disabled
        ? createPortal(
            <div
              ref={tooltipRef}
              id={tooltipId}
              role={role}
              className={cn('ui-tooltip', `ui-tooltip--${position?.placement ?? preferredPlacement}`)}
              style={tooltipStyle}
              // Keep the tooltip alive when the pointer is over it (allows mouse-over tooltip content).
              onMouseEnter={() => {
                if (closeTimer.current !== null) {
                  window.clearTimeout(closeTimer.current);
                  closeTimer.current = null;
                }
              }}
              onMouseLeave={scheduleClose}
            >
              <span className="ui-tooltip__body">{content}</span>
              <span className="ui-tooltip__arrow" aria-hidden="true" />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
