import type { ReactNode } from 'react';
import type { ToastEntry, ToastOptions, ToastType } from './Toast.types';

type Listener = (entries: ToastEntry[]) => void;

export class ToastStore {
  private entries: ToastEntry[] = [];
  private listeners = new Set<Listener>();
  private counter = 0;
  /** Marker set when a Toaster has claimed primary rendering rights. */
  private primary: symbol | null = null;

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.entries);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Claim primary status if no one else has. Returns true if this caller is the primary. */
  claimPrimary(token: symbol): boolean {
    if (this.primary === null) {
      this.primary = token;
      return true;
    }
    return this.primary === token;
  }

  releasePrimary(token: symbol) {
    if (this.primary === token) {
      this.primary = null;
    }
  }

  private emit() {
    for (const listener of this.listeners) {
      listener(this.entries);
    }
  }

  add(message: ReactNode, options: ToastOptions = {}): string {
    const { id: providedId, duration, type, close, action } = options;
    const id = providedId ?? `toast-${++this.counter}`;
    const existing = this.entries.find((e) => e.id === id);

    const entry: ToastEntry = {
      id,
      message,
      type: type ?? 'general',
      close: close ?? true,
      createdAt: Date.now(),
      ...(duration !== undefined && { duration }),
      ...(action !== undefined && { action }),
    };

    if (existing) {
      this.entries = this.entries.map((e) => (e.id === id ? entry : e));
    } else {
      this.entries = [...this.entries, entry];
    }
    this.emit();
    return id;
  }

  dismiss(id?: string) {
    this.entries = id ? this.entries.filter((e) => e.id !== id) : [];
    this.emit();
  }

  getSnapshot() {
    return this.entries;
  }
}

export type ToastApi = ((message: ReactNode, options?: ToastOptions) => string) & {
  general: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  success: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  warning: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  information: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  error: (message: ReactNode, options?: Omit<ToastOptions, 'type'>) => string;
  dismiss: (id?: string) => void;
};

export function createToastApi(store: ToastStore): ToastApi {
  const call = (message: ReactNode, options?: ToastOptions): string => store.add(message, options);
  const withType =
    (type: ToastType) =>
    (message: ReactNode, options: Omit<ToastOptions, 'type'> = {}): string =>
      store.add(message, { ...options, type });

  return Object.assign(call, {
    general: withType('general'),
    success: withType('success'),
    warning: withType('warning'),
    information: withType('information'),
    error: withType('error'),
    dismiss: (id?: string) => store.dismiss(id),
  });
}

/* ---------------------------------------------------------------------------
 * Default (module-singleton) instance — used by the canonical `toast` API.
 * ------------------------------------------------------------------------- */

export const defaultToastStore = new ToastStore();
export const toast = createToastApi(defaultToastStore);

/** Clear every toast in the default store. Convenience for stories/tests. */
export function clearAllToasts() {
  defaultToastStore.dismiss();
}

/* ---------------------------------------------------------------------------
 * Factory for isolated toast systems (used by stories/tests that need to
 * keep their toasts from leaking into other Toasters on the same page).
 * ------------------------------------------------------------------------- */

export interface ToastSystem {
  store: ToastStore;
  toast: ToastApi;
}

export function createToastSystem(): ToastSystem {
  const store = new ToastStore();
  return { store, toast: createToastApi(store) };
}
