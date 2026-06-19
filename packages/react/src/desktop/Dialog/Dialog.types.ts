import type { ReactNode } from 'react';

export type DialogType = 'informational' | 'confirmation' | 'destructive' | 'data-entry';
export type DialogSize = 'small' | 'medium' | 'large';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type?: DialogType;
  size?: DialogSize;
  subtitle?: string;
  description?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  showSecondaryAction?: boolean;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  deleteActionLabel?: string;
  draftActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onDeleteAction?: () => void;
  onDraftAction?: () => void;
  children?: ReactNode;
}
