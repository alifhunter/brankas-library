import { cn } from '../../lib/cn.js';
import type { DropdownProps } from './Dropdown.types';
import './Dropdown.css';

export function Dropdown({
  maxHeight = 240,
  width = 199,
  className,
  style,
  children,
  ...rest
}: DropdownProps) {
  return (
    <div
      {...rest}
      role="menu"
      className={cn('ui-dropdown', className)}
      style={{
        ...style,
        width: typeof width === 'number' ? `${width}px` : width,
        maxHeight: `${maxHeight}px`,
      }}
    >
      <ul className="ui-dropdown__list">{children}</ul>
    </div>
  );
}

/** Backward-compatible alias. Use `Dropdown` going forward. */
export const DropdownPanel = Dropdown;
