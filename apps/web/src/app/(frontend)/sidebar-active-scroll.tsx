'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SidebarActiveScroll({ activeHref }: { activeHref?: string | undefined }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!activeHref) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const sidebar = document.querySelector<HTMLElement>('.left-rail');
      const activeLink = sidebar?.querySelector<HTMLElement>('[data-sidebar-active="true"]');

      if (!sidebar || !activeLink) {
        return;
      }

      const sidebarBounds = sidebar.getBoundingClientRect();
      const activeBounds = activeLink.getBoundingClientRect();
      const isFullyVisible =
        activeBounds.top >= sidebarBounds.top && activeBounds.bottom <= sidebarBounds.bottom;

      if (isFullyVisible) {
        return;
      }

      const targetTop = Math.max(
        activeLink.offsetTop - sidebar.clientHeight / 2 + activeLink.clientHeight / 2,
        0,
      );

      sidebar.scrollTo({ behavior: 'auto', top: targetTop });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeHref, pathname]);

  return null;
}
