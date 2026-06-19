import type { HTMLAttributes, ReactNode } from 'react';
import { Button, TextField } from '@brankas/react/desktop';
import { mergeStyles, token, typography } from '@brankas/react/shared';

export type FormSectionProps = HTMLAttributes<HTMLElement> & {
  actions?: ReactNode;
  children?: ReactNode;
  description?: ReactNode;
  title?: ReactNode;
};

export function FormSection({
  actions,
  children,
  description = 'Grouped fields for a single task or record section.',
  style,
  title = 'Form section',
  ...props
}: FormSectionProps) {
  return (
    <section
      style={mergeStyles(
        {
          borderBottom: `1px solid ${token('color-border-subtle', '#f2f2f2')}`,
          display: 'grid',
          gap: 24,
          padding: '24px 0',
          width: '100%',
        },
        style,
      )}
      {...props}
    >
      <div style={{ display: 'grid', gap: 4 }}>
        <h2
          style={{
            color: token('color-text-default', '#000000'),
            margin: 0,
            ...typography('desktop', 'heading-h5-semibold'),
          }}
        >
          {title}
        </h2>
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
      <div
        style={{
          alignItems: 'start',
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(2, minmax(260px, 1fr))',
        }}
      >
        {children ?? (
          <>
            <TextField label="Name" style={{ width: '100%' }} />
            <TextField label="Email" style={{ width: '100%' }} />
          </>
        )}
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        {actions ?? (
          <>
            <Button size="medium" variant="secondary">
              Cancel
            </Button>
            <Button size="medium">Save</Button>
          </>
        )}
      </div>
    </section>
  );
}
