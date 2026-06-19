import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  /** Current input value (controlled). */
  value?: string;
  /** Initial input value (uncontrolled). */
  defaultValue?: string;
  /** Fires on every keystroke with the latest value. */
  onValueChange?: (value: string) => void;

  /** "Cari" button on the right side of the bar. */
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;

  /** "Search by:" segment on the left. */
  showDropdown?: boolean;
  dropdownLabel?: string;
  dropdownValue?: string;
  onDropdownClick?: () => void;

  /** "Press CTRL + K to search" hint. */
  showShortcutHint?: boolean;
  shortcutKey?: string;

  /** Whether the inline X clear button should show when there's a value. Default true. */
  showClearButton?: boolean;
  onClear?: () => void;
}

export type SearchResultPanelState = 'default' | 'loading' | 'result' | 'empty';

export interface SearchResultItem {
  id?: string;
  label: ReactNode;
  helper?: ReactNode;
  onClick?: () => void;
}

export interface SearchResultPanelProps extends HTMLAttributes<HTMLDivElement> {
  state?: SearchResultPanelState;
  items?: SearchResultItem[];
  emptyMessage?: ReactNode;
  defaultMessage?: ReactNode;
  showNavigationHint?: boolean;
  navigationLabel?: string;
  shortcutLabel?: string;
  shortcutHint?: string;
}
