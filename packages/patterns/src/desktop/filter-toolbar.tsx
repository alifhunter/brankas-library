import type { HTMLAttributes, ReactNode } from 'react';
import { Button, Search } from '@brankas/react/desktop';
import { mergeStyles, token } from '@brankas/react/shared';

export type FilterToolbarProps = HTMLAttributes<HTMLDivElement> & {
  actions?: ReactNode;
  filters?: ReactNode;
  search?: ReactNode;
};

export function FilterToolbar({ actions, filters, search, style, ...props }: FilterToolbarProps) {
  return (
    <div
      style={mergeStyles(
        {
          alignItems: 'center',
          background: token('color-background-default', '#ffffff'),
          borderBottom: `1px solid ${token('color-border-subtle', '#f2f2f2')}`,
          borderTop: `1px solid ${token('color-border-subtle', '#f2f2f2')}`,
          display: 'flex',
          gap: 12,
          padding: '16px 0',
          width: '100%',
        },
        style,
      )}
      {...props}
    >
      <div style={{ flex: 1, minWidth: 280 }}>
        {search ?? (
          <Search placeholder="Search records" showShortcutHint={false} style={{ width: '100%' }} />
        )}
      </div>
      <div style={{ alignItems: 'center', display: 'flex', flexShrink: 0, gap: 8 }}>
        {filters}
        {actions ?? (
          <Button size="large" variant="secondary">
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
