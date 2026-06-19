import { cn } from '../../lib/cn.js';
import type { AvatarProps, AvatarSize } from './Avatar.types';
import './Avatar.css';

const SIZE_CLASS_MAP: Record<AvatarSize, string> = {
  small: 'ui-avatar--size-small',
  medium: 'ui-avatar--size-medium',
  large: 'ui-avatar--size-large',
};

const ICON_SIZE_CLASS_MAP: Record<AvatarSize, string> = {
  small: 'ui-avatar__icon--small',
  medium: 'ui-avatar__icon--medium',
  large: 'ui-avatar__icon--large',
};

const INITIAL_SIZE_CLASS_MAP: Record<AvatarSize, string> = {
  small: 'ui-avatar__initials--small',
  medium: 'ui-avatar__initials--medium',
  large: 'ui-avatar__initials--large',
};

function DefaultUserIcon({ size }: { size: AvatarSize }) {
  return (
    <svg
      className={cn('ui-avatar__icon', ICON_SIZE_CLASS_MAP[size])}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path d="M16 16.8c3 0 5.4-2.4 5.4-5.4S19 6 16 6s-5.4 2.4-5.4 5.4 2.4 5.4 5.4 5.4Z" />
      <path d="M8.8 25.8c0-3.9 3.2-7.1 7.2-7.1s7.2 3.2 7.2 7.1v.2H8.8v-.2Z" />
    </svg>
  );
}

export function Avatar({
  type = 'image',
  size = 'large',
  src,
  alt = 'Avatar image',
  initials = 'UN',
  icon,
  className,
  ...props
}: AvatarProps) {
  const normalizedInitials = initials.trim().slice(0, 2).toUpperCase() || 'UN';
  const resolvedType = type === 'image' && !src ? 'icon' : type;

  return (
    <div
      className={cn(
        'ui-avatar',
        SIZE_CLASS_MAP[size],
        resolvedType === 'image' && 'ui-avatar--image',
        className,
      )}
      {...props}
    >
      {resolvedType === 'image' ? (
        <img className="ui-avatar__image" src={src} alt={alt} />
      ) : resolvedType === 'icon' ? (
        icon ?? <DefaultUserIcon size={size} />
      ) : (
        <span className={cn('ui-avatar__initials', INITIAL_SIZE_CLASS_MAP[size])}>{normalizedInitials}</span>
      )}
    </div>
  );
}
