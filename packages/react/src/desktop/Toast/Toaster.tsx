import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn.js';
import { Toast } from './Toast.js';
import {
  createToastSystem,
  defaultToastStore,
  ToastStore,
} from './toast-store.js';
import type { ToastEntry, ToasterProps as BaseToasterProps } from './Toast.types';
import './Toast.css';

export interface ToasterProps extends BaseToasterProps {
  /**
   * Optional isolated store. Pass when you need a Toaster that doesn't share
   * state with the global `toast` API (e.g. a scoped story). Defaults to the
   * module-level store driven by the exported `toast` function.
   */
  store?: ToastStore;
}

export function Toaster({
  position = 'top-right',
  duration: defaultDuration = 5000,
  maxVisible = 5,
  gap = 12,
  offset = 24,
  store: providedStore,
}: ToasterProps) {
  const store = providedStore ?? defaultToastStore;
  const [entries, setEntries] = useState<ToastEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isPrimary, setIsPrimary] = useState(false);
  const pausedIds = useRef<Set<string>>(new Set());
  const timers = useRef<Map<string, { remaining: number; startedAt: number; timeout: number }>>(
    new Map(),
  );
  const claimToken = useRef(Symbol('toaster'));

  useEffect(() => {
    setMounted(true);
    const token = claimToken.current;
    setIsPrimary(store.claimPrimary(token));
    const unsubscribe = store.subscribe((next) => setEntries(next));
    return () => {
      store.releasePrimary(token);
      unsubscribe();
    };
  }, [store]);

  useEffect(() => {
    if (!isPrimary) return undefined;
    const currentIds = new Set(entries.map((e) => e.id));

    for (const [id, t] of timers.current.entries()) {
      if (!currentIds.has(id)) {
        window.clearTimeout(t.timeout);
        timers.current.delete(id);
        pausedIds.current.delete(id);
      }
    }

    for (const entry of entries) {
      if (timers.current.has(entry.id)) continue;
      const duration = entry.duration ?? defaultDuration;
      if (!Number.isFinite(duration) || duration <= 0) continue;
      const timeout = window.setTimeout(() => {
        store.dismiss(entry.id);
      }, duration);
      timers.current.set(entry.id, {
        remaining: duration,
        startedAt: Date.now(),
        timeout,
      });
    }
    return undefined;
  }, [entries, defaultDuration, isPrimary, store]);

  useEffect(() => {
    return () => {
      for (const t of timers.current.values()) {
        window.clearTimeout(t.timeout);
      }
      timers.current.clear();
    };
  }, []);

  if (!mounted || !isPrimary) return null;

  const handleMouseEnter = (id: string) => {
    const timer = timers.current.get(id);
    if (!timer) return;
    window.clearTimeout(timer.timeout);
    const elapsed = Date.now() - timer.startedAt;
    timer.remaining = Math.max(0, timer.remaining - elapsed);
    pausedIds.current.add(id);
  };

  const handleMouseLeave = (id: string) => {
    if (!pausedIds.current.has(id)) return;
    pausedIds.current.delete(id);
    const timer = timers.current.get(id);
    if (!timer) return;
    timer.startedAt = Date.now();
    timer.timeout = window.setTimeout(() => {
      store.dismiss(id);
    }, timer.remaining);
  };

  const visible = entries.slice(-maxVisible);
  const isBottom = position.startsWith('bottom');
  const stack = isBottom ? [...visible].reverse() : visible;

  return createPortal(
    <div
      className={cn('ui-toaster', `ui-toaster--${position}`)}
      style={
        {
          '--ui-toaster-gap': `${gap}px`,
          '--ui-toaster-offset': `${offset}px`,
        } as React.CSSProperties
      }
      aria-live="polite"
      aria-relevant="additions text"
    >
      {stack.map((entry) => {
        const action = entry.action;
        const toastProps = {
          type: entry.type,
          close: entry.close,
          onClose: () => store.dismiss(entry.id),
          ...(action && {
            action: {
              label: action.label,
              onClick: () => {
                action.onClick();
                store.dismiss(entry.id);
              },
            },
          }),
        };
        return (
          <div
            key={entry.id}
            className="ui-toaster__item"
            onMouseEnter={() => handleMouseEnter(entry.id)}
            onMouseLeave={() => handleMouseLeave(entry.id)}
          >
            <Toast {...toastProps}>{entry.message}</Toast>
          </div>
        );
      })}
    </div>,
    document.body,
  );
}

/**
 * Hook returning a fresh, isolated `{ toast, Toaster }` pair backed by its
 * own store — for stories or tests that want to keep state out of the global API.
 */
export function useIsolatedToastSystem() {
  return useMemo(() => {
    const system = createToastSystem();
    const ScopedToaster = (props: Omit<ToasterProps, 'store'>) => (
      <Toaster {...props} store={system.store} />
    );
    return { toast: system.toast, Toaster: ScopedToaster };
  }, []);
}

export { toast, createToastApi, createToastSystem } from './toast-store.js';
export type { ToastApi, ToastSystem } from './toast-store.js';
