import type { HTMLAttributes } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  items: BreadcrumbItem[];
  activeIndex?: number;
  collapseAfter?: number;
  onItemClick?: (index: number, item: BreadcrumbItem) => void;
}
