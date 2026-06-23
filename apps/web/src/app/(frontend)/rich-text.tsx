import type { ReactNode } from 'react';

import type { LexicalContent, LexicalNode } from '../../lib/releases';

export function RichText({
  content,
  fallback,
}: {
  content: LexicalContent | null;
  fallback?: string | undefined;
}) {
  if (!hasRichTextContent(content)) {
    return fallback ? <p>{fallback}</p> : null;
  }

  return <div className="rich-text">{content?.root?.children?.map(renderNode)}</div>;
}

function hasRichTextContent(content: LexicalContent | null) {
  return Boolean(content?.root?.children?.some((node) => hasNodeContent(node)));
}

function hasNodeContent(node: LexicalNode): boolean {
  if (node.text?.trim()) {
    return true;
  }

  if (node.type === 'upload' && node.value?.url) {
    return true;
  }

  return Boolean(node.children?.some((child) => hasNodeContent(child)));
}

function renderNode(node: LexicalNode, index: number): ReactNode {
  const key = `${node.type ?? 'node'}-${index}`;
  const children = node.children?.map(renderNode) ?? null;

  switch (node.type) {
    case 'text':
      return renderText(node, key);
    case 'heading':
      return renderHeading(node, key, children);
    case 'paragraph':
      return <p key={key}>{children}</p>;
    case 'list':
      return renderList(node, key, children);
    case 'listitem':
      return <li key={key}>{children}</li>;
    case 'quote':
      return <blockquote key={key}>{children}</blockquote>;
    case 'link':
      return renderLink(node, key, children);
    case 'linebreak':
      return <br key={key} />;
    case 'horizontalrule':
      return <hr key={key} />;
    case 'upload':
      return renderUpload(node, key);
    case 'table':
      return (
        <div className="rich-text-table-wrap" key={key}>
          <table className="rich-text-table">
            <tbody>{children}</tbody>
          </table>
        </div>
      );
    case 'tablerow':
      return <tr key={key}>{children}</tr>;
    case 'tablecell':
      return renderTableCell(node, key, children);
    default:
      return children ? <div key={key}>{children}</div> : null;
  }
}

function renderTableCell(node: LexicalNode, key: string, children: ReactNode) {
  const isHeader = typeof node.headerState === 'number' && node.headerState > 0;
  const colSpan = node.colSpan && node.colSpan > 1 ? node.colSpan : undefined;
  const rowSpan = node.rowSpan && node.rowSpan > 1 ? node.rowSpan : undefined;
  const Cell = isHeader ? 'th' : 'td';

  return (
    <Cell colSpan={colSpan} key={key} rowSpan={rowSpan}>
      {children}
    </Cell>
  );
}

function renderText(node: LexicalNode, key: string) {
  let content: ReactNode = node.text ?? '';
  const format = typeof node.format === 'number' ? node.format : 0;

  if (format & 16) {
    content = <code>{content}</code>;
  }

  if (format & 8) {
    content = <span className="rich-text-underline">{content}</span>;
  }

  if (format & 4) {
    content = <s>{content}</s>;
  }

  if (format & 2) {
    content = <em>{content}</em>;
  }

  if (format & 1) {
    content = <strong>{content}</strong>;
  }

  return <span key={key}>{content}</span>;
}

function renderHeading(node: LexicalNode, key: string, children: ReactNode) {
  const id = headingId(node);

  switch (node.tag) {
    case 'h1':
      return <h2 id={id} key={key}>{children}</h2>;
    case 'h2':
      return <h2 id={id} key={key}>{children}</h2>;
    case 'h4':
      return <h4 id={id} key={key}>{children}</h4>;
    case 'h5':
      return <h5 id={id} key={key}>{children}</h5>;
    case 'h6':
      return <h6 id={id} key={key}>{children}</h6>;
    default:
      return <h3 id={id} key={key}>{children}</h3>;
  }
}

function lexicalNodeText(node: LexicalNode): string {
  if (typeof node.text === 'string') {
    return node.text;
  }
  return (node.children ?? []).map(lexicalNodeText).join('');
}

// Slugify a heading's text into an `id` so it can be deep-linked.
function headingId(node: LexicalNode): string | undefined {
  const slug = lexicalNodeText(node)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || undefined;
}

function renderList(node: LexicalNode, key: string, children: ReactNode) {
  if (node.listType === 'number' || node.tag === 'ol') {
    return <ol key={key}>{children}</ol>;
  }

  return <ul key={key}>{children}</ul>;
}

function renderLink(node: LexicalNode, key: string, children: ReactNode) {
  const href = sanitizeHref(node.fields?.url ?? node.url ?? '#');
  const newTab = Boolean(node.fields?.newTab);

  return (
    <a href={href} key={key} rel={newTab ? 'noreferrer' : undefined} target={newTab ? '_blank' : undefined}>
      {children}
    </a>
  );
}

function renderUpload(node: LexicalNode, key: string) {
  const url = node.value?.url;

  if (!url) {
    return null;
  }

  return (
    <figure key={key}>
      <img alt={node.value?.alt ?? node.value?.filename ?? ''} src={url} />
    </figure>
  );
}

function sanitizeHref(href: string) {
  if (/^(https?:|mailto:|tel:|\/|#)/.test(href)) {
    return href;
  }

  return '#';
}
