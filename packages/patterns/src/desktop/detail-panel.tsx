import type { HTMLAttributes, ReactNode } from 'react';
import { StatusLabel } from '@brankas/react/desktop';
import { mergeStyles, token, typography } from '@brankas/react/shared';

export type DetailPanelItem = {
  label: ReactNode;
  value: ReactNode;
};

export type DetailPanelProps = HTMLAttributes<HTMLElement> & {
  actions?: ReactNode;
  items?: DetailPanelItem[];
  title?: ReactNode;
};

const defaultItems: DetailPanelItem[] = [
  { label: 'Owner', value: 'Operations team' },
  { label: 'Status', value: <StatusLabel tone="success">Active</StatusLabel> },
  { label: 'Updated', value: 'Today' },
];

export function DetailPanel({
  actions,
  items = defaultItems,
  style,
  title = 'Details',
  ...props
}: DetailPanelProps) {
  return (
    <section
      style={mergeStyles(
        {
          background: token('color-background-default', '#ffffff'),
          border: `1px solid ${token('color-border-subtle', '#f2f2f2')}`,
          borderRadius: token('radius-8', '8px'),
          display: 'grid',
          overflow: 'hidden',
          width: 360,
        },
        style,
      )}
      {...props}
    >
      <div
        style={{
          alignItems: 'center',
          borderBottom: `1px solid ${token('color-border-subtle', '#f2f2f2')}`,
          display: 'flex',
          gap: 12,
          justifyContent: 'space-between',
          padding: 16,
        }}
      >
        <h2
          style={{
            color: token('color-text-default', '#000000'),
            margin: 0,
            ...typography('desktop', 'heading-h6-semibold'),
          }}
        >
          {title}
        </h2>
        {actions}
      </div>
      <dl style={{ display: 'grid', margin: 0 }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              alignItems: 'center',
              borderBottom:
                index === items.length - 1
                  ? undefined
                  : `1px solid ${token('color-border-subtle', '#f2f2f2')}`,
              display: 'grid',
              gap: 16,
              gridTemplateColumns: '120px 1fr',
              padding: '12px 16px',
            }}
          >
            <dt
              style={{
                color: token('color-text-subtle', '#5e5e5e'),
                ...typography('desktop', 'body-sm-regular'),
              }}
            >
              {item.label}
            </dt>
            <dd
              style={{
                color: token('color-text-default', '#000000'),
                margin: 0,
                minWidth: 0,
                ...typography('desktop', 'body-md-medium'),
              }}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
