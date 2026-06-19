import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '@brankas/react/desktop';
import { mergeStyles, token, typography } from '@brankas/react/shared';

export type EmptyListStateProps = HTMLAttributes<HTMLElement> & {
  action?: ReactNode;
  description?: ReactNode;
  title?: ReactNode;
};

export function EmptyListState({
  action,
  description = 'Try adjusting filters or create a new item to get started.',
  style,
  title = 'No records found',
  ...props
}: EmptyListStateProps) {
  return (
    <section
      style={mergeStyles(
        {
          alignItems: 'center',
          background: token('color-background-default', '#ffffff'),
          border: `1px dashed ${token('color-border-default', '#e0e6ed')}`,
          borderRadius: token('radius-8', '8px'),
          display: 'flex',
          justifyContent: 'center',
          minHeight: 280,
          padding: 32,
          width: '100%',
        },
        style,
      )}
      {...props}
    >
      <div style={{ display: 'grid', gap: 12, justifyItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'grid', gap: 4 }}>
          <strong style={typography('desktop', 'body-lg-semibold')}>{title}</strong>
          <span
            style={{
              color: token('color-text-subtle', '#5e5e5e'),
              ...typography('desktop', 'body-md-regular'),
            }}
          >
            {description}
          </span>
        </div>
        {action ?? <Button size="small">Create item</Button>}
      </div>
    </section>
  );
}
