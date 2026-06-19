import { useId, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/cn.js';
import { Badge } from '../Badge/Badge.js';
import type { TabsProps } from './Tabs.types';
import './Tabs.css';

export function Tabs({
  type = 'horizontal',
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  'aria-label': ariaLabel = 'Tabs',
  ...rest
}: TabsProps) {
  const groupId = useId();

  const firstEnabled = useMemo(
    () => items.find((item) => !item.disabled)?.value ?? items[0]?.value,
    [items],
  );
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue ?? firstEnabled,
  );
  const activeValue = isControlled ? value : internalValue;

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const setActive = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const focusAndActivate = (index: number) => {
    const target = items[index];
    if (!target) return;
    setActive(target.value);
    tabRefs.current[index]?.focus();
  };

  const findNextEnabled = (from: number, step: 1 | -1): number => {
    if (items.length === 0) return -1;
    let i = from;
    for (let attempts = 0; attempts < items.length; attempts += 1) {
      i = (i + step + items.length) % items.length;
      if (!items[i]?.disabled) return i;
    }
    return -1;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const isHorizontalNav = type === 'horizontal' || type === 'chips';
    const nextKey = isHorizontalNav ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontalNav ? 'ArrowLeft' : 'ArrowUp';

    if (event.key === nextKey) {
      event.preventDefault();
      const next = findNextEnabled(index, 1);
      if (next >= 0) focusAndActivate(next);
    } else if (event.key === prevKey) {
      event.preventDefault();
      const prev = findNextEnabled(index, -1);
      if (prev >= 0) focusAndActivate(prev);
    } else if (event.key === 'Home') {
      event.preventDefault();
      const first = items.findIndex((it) => !it.disabled);
      if (first >= 0) focusAndActivate(first);
    } else if (event.key === 'End') {
      event.preventDefault();
      let last = -1;
      for (let i = items.length - 1; i >= 0; i -= 1) {
        if (!items[i]?.disabled) {
          last = i;
          break;
        }
      }
      if (last >= 0) focusAndActivate(last);
    }
  };

  const hasPanels = items.some((it) => it.panel !== undefined);

  return (
    <div {...rest} className={cn('ui-tabs', `ui-tabs--${type}`, className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={type === 'vertical' ? 'vertical' : 'horizontal'}
        className={cn('ui-tabs__list', `ui-tabs__list--${type}`)}
      >
        {items.map((item, index) => {
          const isActive = item.value === activeValue;
          const tabId = `${groupId}-tab-${item.value}`;
          const panelId = `${groupId}-panel-${item.value}`;

          return (
            <button
              key={item.value}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={item.panel !== undefined ? panelId : undefined}
              aria-disabled={item.disabled || undefined}
              disabled={item.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !item.disabled && setActive(item.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                'ui-tabs__tab',
                `ui-tabs__tab--${type}`,
                isActive && 'ui-tabs__tab--active',
                item.disabled && 'ui-tabs__tab--disabled',
              )}
            >
              <span className="ui-tabs__tab-label">{item.label}</span>
              {item.badge !== undefined && item.badge !== null && item.badge !== '' ? (
                <Badge
                  className="ui-tabs__tab-badge"
                  type="number"
                  color={isActive ? 'primary' : 'gray'}
                  text={item.badge}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {hasPanels ? (
        <div className={cn('ui-tabs__panels', `ui-tabs__panels--${type}`)}>
          {items.map((item) => {
            if (item.panel === undefined) return null;
            const isActive = item.value === activeValue;
            return (
              <div
                key={item.value}
                id={`${groupId}-panel-${item.value}`}
                role="tabpanel"
                aria-labelledby={`${groupId}-tab-${item.value}`}
                hidden={!isActive}
                tabIndex={0}
                className={cn('ui-tabs__panel', isActive && 'ui-tabs__panel--active')}
              >
                {item.panel}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
