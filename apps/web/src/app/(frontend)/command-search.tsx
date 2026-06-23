'use client';

import { useRouter } from 'next/navigation';
import { type KeyboardEvent as ReactKeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { SearchEntry } from '../../lib/search-types';

type RankedEntry = SearchEntry & { score: number };

function scoreEntry(entry: SearchEntry, query: string): number {
  const q = query.toLowerCase();
  const title = entry.title.toLowerCase();
  const haystack = `${title} ${entry.group} ${entry.description ?? ''} ${entry.keywords ?? ''}`.toLowerCase();

  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (entry.group.toLowerCase().includes(q)) return 45;
  if (haystack.includes(q)) return 30;

  // lightweight subsequence match (e.g. "txfld" -> "Text field")
  let i = 0;
  for (const char of title) {
    if (char === q[i]) i += 1;
    if (i === q.length) return 20;
  }
  return 0;
}

export function CommandSearch({ showTrigger = false }: { showTrigger?: boolean }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const loadedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Lazily fetch the search index the first time the palette opens.
  useEffect(() => {
    if (!open || loadedRef.current) return;
    loadedRef.current = true;
    setLoading(true);
    fetch('/search-index')
      .then((response) => (response.ok ? response.json() : []))
      .then((data: SearchEntry[]) => setIndex(Array.isArray(data) ? data : []))
      .catch(() => loadedRef.current = false)
      .finally(() => setLoading(false));
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  // Global shortcuts: Cmd/Ctrl+K and "/" open; Escape closes.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const isShortcut = (event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey);
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if (isShortcut) {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === '/' && !typing && !open) {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === 'Escape' && open) {
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Focus input + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(id);
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) {
      // Show a helpful default set when there is no query yet.
      return index.slice(0, 8);
    }
    return (index
      .map((entry) => ({ ...entry, score: scoreEntry(entry, q) }))
      .filter((entry) => entry.score > 0) as RankedEntry[])
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 24);
  }, [index, query]);

  useEffect(() => setActive(0), [query]);

  const select = useCallback(
    (entry: SearchEntry | undefined) => {
      if (!entry) return;
      close();
      if (entry.href.startsWith('http')) {
        window.open(entry.href, '_blank', 'noreferrer');
      } else {
        router.push(entry.href);
      }
    },
    [close, router],
  );

  const onInputKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((value) => Math.min(value + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      select(results[active]);
    }
  };

  // Keep the active row scrolled into view.
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [active, open, results.length]);

  const overlay =
    mounted && open
      ? createPortal(
          <div className="cmdk-overlay" role="presentation" onMouseDown={close}>
            <div
              aria-label="Search the design system"
              aria-modal="true"
              className="cmdk-panel"
              onMouseDown={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="cmdk-input-row">
                <span className="cmdk-input-icon" aria-hidden="true" />
                <input
                  className="cmdk-input"
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Search components, foundations, articles…"
                  ref={inputRef}
                  type="text"
                  value={query}
                />
                <kbd className="cmdk-esc">esc</kbd>
              </div>

              <div className="cmdk-results" ref={listRef} role="listbox">
                {loading && index.length === 0 ? (
                  <p className="cmdk-empty">Loading…</p>
                ) : results.length === 0 ? (
                  <p className="cmdk-empty">
                    No results for “{query}”. Try a component, foundation, or page name.
                  </p>
                ) : (
                  results.map((entry, i) => {
                    const previousGroup = i > 0 ? (results[i - 1]?.group ?? null) : null;
                    return (
                      <div key={`${entry.href}-${entry.title}`}>
                        {entry.group !== previousGroup ? (
                          <p className="cmdk-group-label">{entry.group}</p>
                        ) : null}
                        <button
                          aria-selected={i === active}
                          className={`cmdk-item${i === active ? ' active' : ''}`}
                          data-index={i}
                          onClick={() => select(entry)}
                          onMouseMove={() => setActive(i)}
                          role="option"
                          type="button"
                        >
                          <span className="cmdk-item-text">
                            <span className="cmdk-item-title">{entry.title}</span>
                            {entry.description ? (
                              <span className="cmdk-item-desc">{entry.description}</span>
                            ) : null}
                          </span>
                          <span className="cmdk-item-group">{entry.group}</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="cmdk-footer">
                <span>
                  <kbd>↑</kbd>
                  <kbd>↓</kbd> to navigate
                </span>
                <span>
                  <kbd>↵</kbd> to open
                </span>
                <span>
                  <kbd>esc</kbd> to close
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {showTrigger ? (
        <button className="search-shell" onClick={() => setOpen(true)} type="button">
          <span className="search-icon" aria-hidden="true" />
          <span>Search...</span>
          <kbd className="shortcut">⌘K</kbd>
        </button>
      ) : null}
      {overlay}
    </>
  );
}
