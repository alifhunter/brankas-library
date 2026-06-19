'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@brankas/react/desktop';
import type { SiteNavigation } from '../../lib/site-navigation-data';
import type { WebsitePageContent } from '../../lib/website-pages';
import { DocsShell } from './docs-shell';
import { getMergedComponentDocs } from './library-data';

type PlatformFilter = 'All' | 'Desktop' | 'Mobile';

const featuredComponentSlugs: Record<PlatformFilter, string[]> = {
  All: ['accordion', 'avatar', 'badge', 'banner', 'breadcrumbs', 'button'],
  Desktop: ['accordion', 'avatar', 'badge', 'banner', 'breadcrumbs', 'button'],
  Mobile: ['bottom-nav', 'bottom-sheet', 'input-amount', 'header', 'text-field', 'button'],
};

type FoundationCard = {
  href?: string;
  src: string;
  title: string;
};

const foundationCards: FoundationCard[] = [
  { title: 'Color', src: '/color-home.png', href: '/foundation/color' },
  { title: 'Typography', src: '/typo-home.png', href: '/foundation/typography' },
  { title: 'Spacing', src: '/spacing-home.png', href: '/foundation/spacing' },
  { title: 'Radius', src: '/radius-home.png', href: '/foundation/radius' },
  { title: 'Elevation', src: '/elevation-home.png', href: '/foundation/elevation' },
  { title: 'Content', src: '/content-home.png', href: '/foundation/content' },
  { title: 'Iconography', src: '/iconography-home.png', href: '/foundation/iconography' },
  { title: 'Illustration', src: '/illustration-home.png', href: '/foundation/illustration' },
  { title: 'Photography', src: '/photography-home.jpg' },
  { title: 'Brand Guideline', src: '/brandguide-home.png' },
];

export function HomePageClient({
  navigation,
  page,
}: {
  navigation: SiteNavigation;
  page: WebsitePageContent;
}) {
  const [componentPlatform, setComponentPlatform] = useState<PlatformFilter>('All');
  const [showAllComponents, setShowAllComponents] = useState(false);

  const mergedDocs = getMergedComponentDocs();
  const platformDocs =
    componentPlatform === 'All'
      ? mergedDocs
      : mergedDocs.filter((doc) =>
          componentPlatform === 'Desktop' ? doc.desktop : doc.mobile,
        );
  const featuredSlugSet = new Set(featuredComponentSlugs[componentPlatform]);
  const featuredComponents = featuredComponentSlugs[componentPlatform]
    .map((slug) => platformDocs.find((doc) => doc.slug === slug))
    .filter((doc): doc is NonNullable<typeof doc> => Boolean(doc));
  const extraComponents = platformDocs.filter((doc) => !featuredSlugSet.has(doc.slug));

  const visualScrollRef = useRef<HTMLDivElement>(null);

  const scrollFoundation = (direction: 1 | -1) => {
    const el = visualScrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.visual-card');
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = visualScrollRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = setInterval(() => {
      if (el.matches(':hover')) return;
      const card = el.querySelector<HTMLElement>('.visual-card');
      const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <DocsShell activeHref="/" navigation={navigation}>
      <section className="home-hero" id="home">
        <video
          aria-hidden="true"
          autoPlay
          className="hero-media-video"
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <h1>
            {page.hero.title.split(' ').map((word, i, arr) => (
              <span
                className="reveal-word"
                key={`${word}-${i}`}
                style={{ animationDelay: `${i * 0.09}s` }}
              >
                {word}
                {i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          {page.hero.description ? (
            <p
              className="reveal-subtitle"
              style={{
                animationDelay: `${page.hero.title.split(' ').length * 0.09 + 0.15}s`,
              }}
            >
              {page.hero.description}
            </p>
          ) : null}
          <Button
            onClick={() => {
              window.location.href = page.hero.ctaHref;
            }}
            size="extra-large"
            style={{ minWidth: 280 }}
          >
            {page.hero.ctaLabel}
          </Button>
        </div>
      </section>

      <section className="section" id="foundation">
        <div className="section-heading">
          <h2>Foundational and visual styles</h2>
          <div className="section-controls">
            <button
              aria-label="Scroll foundational styles left"
              onClick={() => scrollFoundation(-1)}
              type="button"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              aria-label="Scroll foundational styles right"
              onClick={() => scrollFoundation(1)}
              type="button"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
        <div className="visual-grid" ref={visualScrollRef}>
          {foundationCards.map((card) => {
            const inner = (
              <>
                <div className="visual-box">
                  <img alt="" aria-hidden="true" src={card.src} />
                </div>
                <h3>{card.title}</h3>
              </>
            );

            return card.href ? (
              <Link className="visual-card visual-card-link" href={card.href} key={card.title}>
                {inner}
              </Link>
            ) : (
              <article className="visual-card" key={card.title}>
                {inner}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="components">
        <div className="section-heading">
          <h2>Components</h2>
          <div className="platform-toggle" role="tablist" aria-label="Component platform">
            {(['All', 'Desktop', 'Mobile'] as const).map((platform) => (
              <button
                aria-selected={componentPlatform === platform}
                className={`platform-toggle-pill${componentPlatform === platform ? ' is-active' : ''}`}
                key={platform}
                onClick={() => {
                  setComponentPlatform(platform);
                  setShowAllComponents(false);
                }}
                role="tab"
                type="button"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
        <div className="components-grid">
          {featuredComponents.map((doc) => (
            <Link className="component-card" href={`/components/${doc.slug}`} key={doc.slug}>
              <div className="component-card-thumb" aria-hidden="true" />
              <div className="component-card-body">
                <h3>{doc.name}</h3>
                <p>{(doc.desktop ?? doc.mobile)?.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div
          aria-hidden={!showAllComponents}
          className={`components-extra${showAllComponents ? ' is-open' : ''}`}
        >
          {extraComponents.map((doc) => (
            <Link className="component-card" href={`/components/${doc.slug}`} key={doc.slug}>
              <div className="component-card-thumb" aria-hidden="true" />
              <div className="component-card-body">
                <h3>{doc.name}</h3>
                <p>{(doc.desktop ?? doc.mobile)?.description}</p>
              </div>
            </Link>
          ))}
        </div>
        {extraComponents.length > 0 ? (
          <div className="section-footer">
            <button
              className="text-link text-link-button"
              onClick={() => setShowAllComponents((v) => !v)}
              type="button"
            >
              {showAllComponents
                ? 'Show less ↑'
                : componentPlatform === 'All'
                  ? 'See all components →'
                  : `See all ${componentPlatform.toLowerCase()} components →`}
            </button>
          </div>
        ) : null}
      </section>

      <footer className="site-footer">
        <span>Brankas Design System</span>
        <span>·</span>
        <span>© 2026 All rights reserved</span>
        <a href="/">Privacy Policy</a>
      </footer>

      <a
        className="floating-edit"
        href="/admin/collections/website-pages"
        aria-label="Edit page in Payload"
      >
        ✎
      </a>
    </DocsShell>
  );
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path
        d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
