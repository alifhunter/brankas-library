import type { ReactNode } from 'react';
import Link from 'next/link';

import { defaultSiteNavigation, type SiteNavigation } from '../../lib/site-navigation-data';
import { CommandSearch } from './command-search';
import { SidebarActiveScroll } from './sidebar-active-scroll';

export function DocsShell({
  activeHref,
  children,
  showSidebar = true,
  navigation = defaultSiteNavigation,
}: {
  activeHref?: string | undefined;
  children: ReactNode;
  showSidebar?: boolean | undefined;
  navigation?: SiteNavigation | undefined;
}) {
  return (
    <div className="site-shell">
      <SiteHeader activeHref={activeHref} navigation={navigation} />
      <div className={showSidebar ? 'layout' : 'layout layout-no-sidebar'}>
        {showSidebar ? <DocsSidebar activeHref={activeHref} navigation={navigation} /> : null}
        <main className="content">{children}</main>
      </div>
      {/* Without a sidebar there is no visible trigger, but ⌘K / "/" still work. */}
      {showSidebar ? null : <CommandSearch />}
    </div>
  );
}

function SiteHeader({
  activeHref,
  navigation,
}: {
  activeHref?: string | undefined;
  navigation: SiteNavigation;
}) {
  return (
    <header className="topbar">
      <Link aria-label="Brankas home" className="brand-lockup" href={navigation.brand.homeHref}>
        <span className="brand-symbol">B</span>
        <span className="brand-name">
          <strong>{navigation.brand.brandName}</strong>
        </span>
        <span className="brand-divider" />
        <span className="brand-name product-name">{navigation.brand.productName}</span>
      </Link>
      <nav aria-label="Primary navigation" className="topnav">
        {navigation.topNav.map((item) => (
          <NavigationLink
            className={isTopNavActive(item.href, activeHref) ? 'active' : undefined}
            href={item.href}
            key={item.label}
          >
            {item.label}
          </NavigationLink>
        ))}
      </nav>
    </header>
  );
}

function DocsSidebar({
  activeHref,
  navigation,
}: {
  activeHref?: string | undefined;
  navigation: SiteNavigation;
}) {
  return (
    <aside className="left-rail" aria-label="Documentation navigation">
      <CommandSearch showTrigger />

      {navigation.sidebarSections.map((section) => (
        <SidebarSection
          activeHref={activeHref}
          title={section.title}
          items={section.items}
          key={section.title}
        />
      ))}
      <SidebarActiveScroll activeHref={activeHref} />
    </aside>
  );
}

function SidebarSection({
  activeHref,
  items,
  title,
}: {
  activeHref?: string | undefined;
  items: Array<{ href: string; label: string }>;
  title: string;
}) {
  return (
    <section className="sidebar-section">
      <h2>{title}</h2>
      <nav className="sidebar-list">
        {items.map((item) => {
          const isActive = isActiveHref(item.href, activeHref);

          return (
            <NavigationLink
              active={isActive}
              className={isActive ? 'active' : undefined}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </NavigationLink>
          );
        })}
      </nav>
    </section>
  );
}

function isActiveHref(href: string, activeHref?: string) {
  if (!activeHref) {
    return false;
  }

  return normalizeActiveHref(href) === normalizeActiveHref(activeHref);
}

function isTopNavActive(href: string, activeHref?: string) {
  if (!activeHref) {
    return false;
  }

  const normalizedHref = normalizeActiveHref(href);
  const normalizedActiveHref = normalizeActiveHref(activeHref);

  if (normalizedHref === normalizedActiveHref) {
    return true;
  }

  const isDocumentationHref = normalizedHref === '/' || normalizedHref.startsWith('/#');

  if (!isDocumentationHref) {
    return false;
  }

  return !['/change-log', '/playground'].some(
    (route) => normalizedActiveHref === route || normalizedActiveHref.startsWith(`${route}/`),
  );
}

function normalizeActiveHref(href: string) {
  const trimmed = href.trim();

  if (trimmed.startsWith('#') || trimmed.startsWith('/#')) {
    return trimmed;
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

  return withLeadingSlash.replace(/\/+$/, '') || '/';
}

function NavigationLink({
  active = false,
  children,
  className,
  href,
}: {
  active?: boolean | undefined;
  children: ReactNode;
  className?: string | undefined;
  href: string;
}) {
  if (href.startsWith('#') || href.startsWith('/#')) {
    return (
      <a className={className} data-sidebar-active={active ? 'true' : undefined} href={href}>
        {children}
      </a>
    );
  }

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return (
      <a
        className={className}
        data-sidebar-active={active ? 'true' : undefined}
        href={href}
        rel="noreferrer noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} data-sidebar-active={active ? 'true' : undefined} href={href}>
      {children}
    </Link>
  );
}
