import type { HTMLAttributes } from 'react';

export type BannerVariant = 'section' | 'page' | 'message';

export type BannerSectionIntent = 'informational' | 'warning' | 'error';
export type BannerPageIntent = 'warning' | 'error';
export type BannerMessageIntent = 'orange' | 'red' | 'blue';

export type BannerSize = 'default' | 'small';
export type BannerMessageState = 'collapsed' | 'expanded';

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: BannerVariant;
  intent?: BannerSectionIntent | BannerPageIntent | BannerMessageIntent;
  size?: BannerSize;
  title?: string;
  message: string;
  showIcon?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
  showReadMore?: boolean;
  readMoreLabel?: string;
  showLessLabel?: string;
  state?: BannerMessageState;
  onStateChange?: (state: BannerMessageState) => void;
}
