import { forwardRef, useRef, useState } from 'react';
import { cn } from '../../lib/cn.js';
import {
  BrandPlaceholderIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from '../../shared/icons.js';
import type { SidebarMenuItem, SidebarProps } from './Sidebar.types';
import './Sidebar.css';

/** Small elbow/branch glyph shown beside nested (child/grandchild) items. */
function BranchIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" width={16} height={16}>
      <path
        d="M6 3v6a1 1 0 0 0 1 1h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function DefaultLogo() {
  return (
    <span className="ui-sidebar__logo">
      <BrandPlaceholderIcon className="ui-sidebar__logo-mark" width={28} height={28} />
      <span className="ui-sidebar__logo-word">Brankas</span>
    </span>
  );
}

/** Content-box left padding (px) that aligns an item at a given nesting depth. */
function indentFor(depth: number): number {
  if (depth <= 0) return 16;
  if (depth === 1) return 32;
  if (depth === 2) return 56;
  return 56 + (depth - 2) * 24;
}

type FlatItem = { value: string; disabled: boolean; expandable: boolean; expanded: boolean };

/** Walk the tree honouring expansion to produce the keyboard-navigable visible order. */
function flattenVisible(
  items: SidebarMenuItem[],
  expanded: Set<string>,
  acc: FlatItem[] = [],
): FlatItem[] {
  for (const item of items) {
    const expandable = !!item.children?.length;
    const isOpen = expandable && expanded.has(item.value);
    acc.push({ value: item.value, disabled: !!item.disabled, expandable, expanded: isOpen });
    if (item.children && isOpen) flattenVisible(item.children, expanded, acc);
  }
  return acc;
}

/** Return the values from the root down to (and including) the active item, or [] if not found. */
function findActivePath(
  items: SidebarMenuItem[],
  target: string | undefined,
  trail: string[] = [],
): string[] {
  if (target === undefined) return [];
  for (const item of items) {
    const next = [...trail, item.value];
    if (item.value === target) return next;
    if (item.children?.length) {
      const found = findActivePath(item.children, target, next);
      if (found.length) return found;
    }
  }
  return [];
}

/** Find the first enabled leaf (used for the default active item). */
function firstLeaf(items: SidebarMenuItem[]): string | undefined {
  for (const item of items) {
    if (item.children?.length) {
      const nested = firstLeaf(item.children);
      if (nested) return nested;
    } else if (!item.disabled) {
      return item.value;
    }
  }
  return undefined;
}

/** Initial expanded set: items flagged defaultExpanded + every ancestor of the active item. */
function collectInitialExpanded(
  items: SidebarMenuItem[],
  activeValue: string | undefined,
  acc: Set<string>,
  ancestors: string[],
): Set<string> {
  for (const item of items) {
    if (item.defaultExpanded) acc.add(item.value);
    if (activeValue !== undefined && item.value === activeValue) {
      ancestors.forEach((a) => acc.add(a));
    }
    if (item.children?.length) {
      collectInitialExpanded(item.children, activeValue, acc, [...ancestors, item.value]);
    }
  }
  return acc;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  {
    items,
    activeValue,
    defaultActiveValue,
    onActiveChange,
    onExpandedChange,
    logo,
    showCollapseControl = false,
    collapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    collapseLabel = 'Minimize',
    className,
    'aria-label': ariaLabel = 'Sidebar',
    ...rest
  },
  ref,
) {
  const isActiveControlled = activeValue !== undefined;
  const initialActive = defaultActiveValue ?? firstLeaf(items);
  const [internalActive, setInternalActive] = useState<string | undefined>(initialActive);
  const currentActive = isActiveControlled ? activeValue : internalActive;

  const [expanded, setExpanded] = useState<Set<string>>(() =>
    collectInitialExpanded(items, currentActive, new Set(), []),
  );

  const isCollapsedControlled = collapsed !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(defaultCollapsed);
  const isCollapsed = isCollapsedControlled ? collapsed : internalCollapsed;

  const itemRefs = useRef<Map<string, HTMLAnchorElement | HTMLButtonElement>>(new Map());

  const activate = (value: string) => {
    if (!isActiveControlled) setInternalActive(value);
    onActiveChange?.(value);
  };

  const setExpansion = (value: string, open: boolean) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (open) next.add(value);
      else next.delete(value);
      onExpandedChange?.([...next]);
      return next;
    });
  };

  const toggleExpansion = (value: string) => setExpansion(value, !expanded.has(value));

  const toggleCollapsed = () => {
    const next = !isCollapsed;
    if (!isCollapsedControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const focusValue = (value: string | undefined) => {
    if (value) itemRefs.current.get(value)?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, item: SidebarMenuItem) => {
    const visible = flattenVisible(items, expanded).filter((v) => !v.disabled);
    const index = visible.findIndex((v) => v.value === item.value);
    const current = visible[index];

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusValue(visible[index + 1]?.value);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusValue(visible[index - 1]?.value);
        break;
      case 'ArrowRight':
        if (current?.expandable && !current.expanded) {
          event.preventDefault();
          setExpansion(item.value, true);
        }
        break;
      case 'ArrowLeft':
        if (current?.expandable && current.expanded) {
          event.preventDefault();
          setExpansion(item.value, false);
        }
        break;
      case 'Home':
        event.preventDefault();
        focusValue(visible[0]?.value);
        break;
      case 'End':
        event.preventDefault();
        focusValue(visible[visible.length - 1]?.value);
        break;
      default:
        break;
    }
  };

  const activePath = new Set(findActivePath(items, currentActive));

  const renderItems = (list: SidebarMenuItem[], depth: number): React.ReactNode => (
    <ul role="list" className={cn('ui-sidebar__menu', depth > 0 && 'ui-sidebar__submenu')}>
      {list.map((item) => {
        const expandable = !!item.children?.length;
        const isOpen = expandable && expanded.has(item.value);
        const isActive = item.value === currentActive;
        // Ancestors of the active item are highlighted too, but only the leaf is aria-current.
        const onActivePath = activePath.has(item.value);
        const nested = depth > 0;
        const icon = item.icon ?? (nested ? <BranchIcon /> : <BrandPlaceholderIcon width={24} height={24} />);
        const submenuId = `sidebar-group-${item.value}`;

        const setNode = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
          if (node) itemRefs.current.set(item.value, node);
          else itemRefs.current.delete(item.value);
        };

        const content = (
          <>
            <span className="ui-sidebar__item-icon" aria-hidden="true">
              {icon}
            </span>
            <span className="ui-sidebar__item-label">{item.label}</span>
            {expandable ? (
              <ChevronDownIcon
                className={cn('ui-sidebar__chevron', isOpen && 'ui-sidebar__chevron--open')}
                width={20}
                height={20}
              />
            ) : null}
          </>
        );

        const shared = {
          className: cn(
            'ui-sidebar__item',
            nested && 'ui-sidebar__item--nested',
            onActivePath && 'ui-sidebar__item--active',
            item.disabled && 'ui-sidebar__item--disabled',
          ),
          style: { '--sidebar-indent': `${indentFor(depth)}px` } as React.CSSProperties,
          'aria-current': isActive ? ('page' as const) : undefined,
          title: isCollapsed && typeof item.label === 'string' ? item.label : undefined,
          onKeyDown: (event: React.KeyboardEvent) => handleKeyDown(event, item),
        };

        return (
          <li key={item.value} className="ui-sidebar__menu-item">
            {item.href && !expandable && !item.disabled ? (
              <a
                {...shared}
                ref={setNode}
                href={item.href}
                onClick={() => {
                  activate(item.value);
                  item.onClick?.(item.value);
                }}
              >
                {content}
              </a>
            ) : (
              <button
                {...shared}
                ref={setNode}
                type="button"
                disabled={item.disabled}
                aria-disabled={item.disabled || undefined}
                aria-expanded={expandable ? isOpen : undefined}
                aria-controls={expandable ? submenuId : undefined}
                onClick={() => {
                  if (item.disabled) return;
                  if (expandable) {
                    toggleExpansion(item.value);
                  } else {
                    activate(item.value);
                    item.onClick?.(item.value);
                  }
                }}
              >
                {content}
              </button>
            )}

            {expandable && isOpen && !isCollapsed ? (
              <div id={submenuId}>{renderItems(item.children!, depth + 1)}</div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav
      {...rest}
      ref={ref}
      aria-label={ariaLabel}
      className={cn('ui-sidebar', isCollapsed && 'ui-sidebar--collapsed', className)}
    >
      <div className="ui-sidebar__header">{logo ?? <DefaultLogo />}</div>

      <div className="ui-sidebar__scroll">{renderItems(items, 0)}</div>

      {showCollapseControl ? (
        <div className="ui-sidebar__footer">
          <button
            type="button"
            className="ui-sidebar__collapse"
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={toggleCollapsed}
          >
            <span className="ui-sidebar__collapse-icon" aria-hidden="true">
              <ChevronLeftIcon width={20} height={20} />
            </span>
            <span className="ui-sidebar__item-label">{collapseLabel}</span>
          </button>
        </div>
      ) : null}
    </nav>
  );
});
