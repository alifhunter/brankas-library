import type { HTMLAttributes, ReactNode } from 'react';

export type AvatarType = 'image' | 'icon' | 'initial';
export type AvatarSize = 'small' | 'medium' | 'large';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  type?: AvatarType;
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
  icon?: ReactNode;
}
