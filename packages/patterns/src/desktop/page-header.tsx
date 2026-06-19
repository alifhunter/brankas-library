import type { HTMLAttributes, ReactNode } from 'react';
import { Breadcrumbs, Button, StatusLabel } from '@brankas/react/desktop';
import { mergeStyles, token, typography } from '@brankas/react/shared';

export type PageHeaderBreadcrumb = {
  href?: string;
  label: string;
};

export type PageHeaderProps = HTMLAttributes<HTMLElement> & {
  actions?: ReactNode;
  breadcrumbs?: PageHeaderBreadcrumb[];
  description?: ReactNode;
  status?: ReactNode;
  title?: ReactNode;
};

export function PageHeader({
  actions,
  breadcrumbs = [{ label: 'Root' }, { label: 'Current page' }],
  description,
  status,
  style,
  title = 'Page title',
  ...props
}: PageHeaderProps) {
  return (
    <header
      style={mergeStyles(
        {
          borderBottom: `1px solid ${token('color-border-subtle', '#f2f2f2')}`,
          display: 'grid',
          gap: 16,
          padding: '0 0 24px',
          width: '100%',
        },
        style,
      )}
      {...props}
    >
      <Breadcrumbs items={breadcrumbs} />
      <div
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          gap: 24,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'grid', gap: 8, minWidth: 0 }}>
          <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
            <h1
              style={{
                color: token('color-text-default', '#000000'),
                margin: 0,
                ...typography('desktop', 'heading-h3-semibold'),
              }}
            >
              {title}
            </h1>
            {status ?? <StatusLabel tone="info">Beta</StatusLabel>}
          </div>
          {description ? (
            <p
              style={{
                color: token('color-text-subtle', '#5e5e5e'),
                margin: 0,
                ...typography('desktop', 'body-md-regular'),
              }}
            >
              {description}
            </p>
          ) : null}
        </div>
        <div style={{ alignItems: 'center', display: 'flex', flexShrink: 0, gap: 8 }}>
          {actions ?? (
            <>
              <Button size="medium" variant="secondary">
                Export
              </Button>
              <Button size="medium">Create</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
