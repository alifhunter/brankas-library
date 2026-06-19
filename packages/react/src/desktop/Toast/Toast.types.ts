import type { HTMLAttributes, ReactNode } from 'react';

export type ToastType = 'general' | 'success' | 'warning' | 'information' | 'error';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  type?: ToastType;
  children?: ReactNode;
  /** Show the X close affordance. Default false. */
  close?: boolean;
  onClose?: () => void;
  /** Inline action button rendered before the close button (e.g. "Undo"). */
  action?: ToastAction;
}

export interface ToastOptions {
  type?: ToastType;
  /** Auto-dismiss duration in ms. Use `Infinity` or `0` for persistent. */
  duration?: number;
  /** Show the X close affordance. Default true. */
  close?: boolean;
  action?: ToastAction;
  /** Reuse an id to update an existing toast in place (or prevent duplicates). */
  id?: string;
}

export interface ToasterProps {
  position?: ToastPosition;
  /** Default auto-dismiss duration in ms. Default 5000. */
  duration?: number;
  /** Maximum simultaneously visible toasts. Default 5. */
  maxVisible?: number;
  /** Gap between stacked toasts in px. Default 12. */
  gap?: number;
  /** Distance from the viewport edge in px. Default 24. */
  offset?: number;
}

export interface ToastEntry {
  id: string;
  message: ReactNode;
  type: ToastType;
  close: boolean;
  /** Undefined → use Toaster's default duration; finite number = override; Infinity = persistent. */
  duration?: number;
  action?: ToastAction;
  createdAt: number;
}
