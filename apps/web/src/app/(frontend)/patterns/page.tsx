import type { FC } from 'react';
import Link from 'next/link';
import { getSiteNavigation } from '../../../lib/site-navigation';
import { getWebsitePage } from '../../../lib/website-pages';
import { DocsShell } from '../docs-shell';
import { patternDocs } from '../library-data';
import {
  CardSkeletonRecipe,
  LiveSearchRecipe,
  MultiStepFlowRecipe,
  SearchableMultiSelectRecipe,
  SortableTableRecipe,
  UndoToastRecipe,
} from './pattern-examples';

export const dynamic = 'force-dynamic';

const recipeBySlug: Record<string, FC> = {
  'multi-step-flow': MultiStepFlowRecipe,
  'undo-toast': UndoToastRecipe,
  'searchable-multi-select': SearchableMultiSelectRecipe,
  'sortable-table': SortableTableRecipe,
  'live-search-results': LiveSearchRecipe,
  'card-skeleton': CardSkeletonRecipe,
};

export default async function PatternsPage() {
  const [page, navigation] = await Promise.all([getWebsitePage('patterns'), getSiteNavigation()]);

  return (
    <DocsShell
      activeHref="/patterns"
      navigation={navigation}
      showSidebar={page?.layout !== 'no-sidebar' && page?.layout !== 'custom'}
    >
      <div className="detail-page">
        <Link className="back-link" href="/#patterns">
          ← Home
        </Link>

        <section className="detail-hero">
          <div>
            <p className="eyebrow">Compositions</p>
            <h1>{page?.hero.title ?? 'Patterns'}</h1>
            <p>
              {page?.hero.description ??
                'Patterns combine Brankas components into reusable product workflows. Each recipe below is interactive — try it, copy it, adapt it.'}
            </p>
          </div>
          <div className="detail-status">
            <span>@brankas/react/desktop</span>
            <span>Recipes</span>
          </div>
        </section>

        <section className="pattern-recipe-grid">
          {patternDocs.map((pattern) => {
            const Recipe = recipeBySlug[pattern.slug];
            return (
              <article className="pattern-recipe-card" key={pattern.slug}>
                <header className="pattern-recipe-header">
                  <h2>{pattern.name}</h2>
                  <p>{pattern.description}</p>
                </header>

                {Recipe ? (
                  <div className="pattern-recipe-surface">
                    <Recipe />
                  </div>
                ) : null}

                <div className="pattern-recipe-meta">
                  <div>
                    <h3>Use when</h3>
                    <ul className="doc-list">
                      {pattern.usage.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Avoid when</h3>
                    <ul className="doc-list">
                      {pattern.avoid.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {page?.sections.length ? (
          <section className="section text-block">
            {page.sections.map((section) => (
              <section key={section.title}>
                {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </section>
        ) : null}
      </div>
    </DocsShell>
  );
}
