# Brankas Library Checkpoint

## Current Status

Brankas Library is a React/Next-first design system with importable tokens, components, and patterns; a live preview and playground website; and a self-hosted Payload CMS for articles and editorial content.

**Phases 1 through 6 are delivered and running in production.** The repository contains the Phase 1 monorepo, the Phase 2 token generation pipeline, the Phase 3 component libraries for **both** desktop (`@brankas/react/desktop`, 31 components) and mobile (`@brankas/native`, 26 components), starter Phase 4 desktop product patterns, the Phase 5 preview/playground website, and the Phase 6 Payload CMS — all deployed at https://brankas-library.vercel.app.

**Phase 7 (versioning, publishing, governance) and Phase 8 (designer prototyping) have not started.** Every package is still `private: true` at version `0.0.0`, which is what blocks Phase 8.

## Completed

- [x] Created root-level README, plan, and checkpoint documentation.
- [x] Defined the project as a reusable design library for other teams to import and use.
- [x] Chose React/Next-first as the primary consumer target.
- [x] Chose Payload CMS self-hosted for articles and editorial content.
- [x] Decided that the design library comes before the website.
- [x] Decided that Tailwind is not required for token authoring or styling.
- [x] Decided that canonical token files will be user-provided DTCG-style JSON.
- [x] Decided that token files will be split by layer: primitives, semantic, and components.
- [x] Decided to differentiate mobile and desktop React components while sharing the same tokens.
- [x] Created pnpm workspace and Turborepo configuration.
- [x] Created `apps/web` and `apps/storybook`.
- [x] Created `packages/tokens`, `packages/react`, `packages/patterns`, and `packages/config`.
- [x] Installed workspace dependencies and generated `pnpm-lock.yaml`.
- [x] Added token generation script for DTCG-style JSON files.
- [x] Moved authored primitive and semantic token JSON files to `packages/tokens/source`.
- [x] Generated CSS variables from token sources.
- [x] Generated TypeScript token exports from token sources.
- [x] Validated token aliases during generation.
- [x] Added `@brankas/react/desktop` and `@brankas/react/shared` exports.
- [x] Implemented first desktop Accordion, Avatar, Badge, Breadcrumbs, and Button components.
- [x] Implemented desktop Banner, Carousel, Checkbox, Chips selection, Coachmark, Dialog, Date picker, Empty states, File upload, Label / Status, Loader, Overlay, Pagination, Progress bar, Progress indicator, Toggle, and Radio button components.
- [x] Reworked the second desktop component batch from Figma context instead of keeping the original generic scaffold.
- [x] Implemented desktop Search, Search result panel, Sidebar, Sidebar menu, Dropdown, Select, Skeleton, Tabs, Table cell, Text field, Text area, Toast, and Tooltip from provided Figma node context.
- [x] Added Storybook examples for the implemented desktop components.
- [x] Added React component test runner and initial behavior/key-state coverage for desktop components.
- [x] Added co-located behavior tests for all 31 desktop components.
- [x] Built the `@brankas/native` React Native component package (26 components) on the shared token foundation.
- [x] Exposed resolved native tokens from `@brankas/native/theme`.
- [x] Added co-located tests for 25 of 26 native components and Storybook stories rendered through `react-native-web`.
- [x] Added `@brankas/icons-native` with the `Icon` SVG wrapper for React Native.
- [x] Added `apps/native-prototype`, a local Expo SDK 55 app that consumes `@brankas/native` and auto-discovers screens from `cases/`.
- [x] Added full example screens at `/examples` covering all 31 desktop components in one coherent product scenario.
- [x] Added `/examples/new-payout` (four-step stepper flow) and `/examples/settings` (single-page sectioned form), and wired the previously dead "New payout" buttons to the flow.
- [x] Added `/examples/approvals`, placing default Tabs, chip Tabs, selection Chips, Select, Text field and a Dropdown-triggering Button on one screen. Surfaced that chip Tabs and selection Chips are near-identical at rest (same padding and pill radius; borders differ only by `#ebebeb` vs `#e0e6ed`) and diverge only when active — left unchanged pending a design decision.
- [x] Documented the radius rule (pill actions vs 8px inputs) on the `radius` foundation page.
- [x] Aligned the Dropdown menu radius with the Select panel (both `radius-sm`).
- [x] Added `@brankas/patterns/desktop` entrypoint.
- [x] Implemented starter desktop Page header, Filter toolbar, Form section, Empty list state, and Detail panel patterns.
- [x] Added six interactive pattern recipes to the `/patterns` page (implemented locally in `apps/web`, not from `@brankas/patterns`).
- [x] Built first Next.js home preview for tokens, desktop components, desktop patterns, and playground controls.
- [x] Imported token CSS variables into the website from `@brankas/tokens/tokens.css`.
- [x] Confirmed the website consumes `@brankas/react/desktop` and `@brankas/patterns/desktop`.
- [x] Added starter component detail pages at `/components/[slug]`.
- [x] Added starter token reference page at `/tokens`.
- [x] Added starter pattern guidance page at `/patterns`.
- [x] Installed Payload CMS dependencies in `apps/web`.
- [x] Added Payload config with Postgres, Lexical rich text, and media support.
- [x] Added Payload collections for users, media, articles, and releases.
- [x] Added Payload `Website Pages` collection for editable site pages.
- [x] Added Payload `Component Pages` collection for editable component detail pages.
- [x] Added Payload `Site Navigation` global for editable navbar and sidebar menus.
- [x] Added Payload admin route at `/admin`.
- [x] Added Payload REST, GraphQL, and GraphQL playground routes.
- [x] Added local admin seed credentials for username `brankas` and password `brankas`.
- [x] Connected the home page to Payload content with code fallback when the database is unavailable.
- [x] Added generic CMS-backed `/{slug}` website page rendering.
- [x] Connected component detail pages to Payload content with code fallback when the database is unavailable.
- [x] Connected website navbar and sidebar to Payload with code fallback when the database is unavailable.
- [x] Added CMS layout selection for website pages.
- [x] Made `/tokens`, `/patterns`, and `/change-log` CMS-backed website pages while keeping package-backed previews.

## Active Phase

The `apps/web` site is now deployed to Vercel at https://brankas-library.vercel.app, backed by a Neon Postgres database, with the GitHub repository at https://github.com/alifhunter/brankas-library (pushes to `main` auto-deploy). Payload `/admin` login is verified working in production against Neon. See the Deployment section of `README.md` for project configuration, environment variables, and secret rotation.

Published articles and releases now render on public website routes (`/articles`, `/articles/[slug]`, `/change-log/[releaseSlug]`), and media uploads (including rich-text image embeds) are stored in Vercel Blob.

Remaining work, by phase:

- **Phase 4** — pattern usage rules and anti-patterns; pattern tests.
- **Phase 5** — deeper playground controls for themes and viewport sizes; visual review of detail pages across widths.
- **Phase 6** — live preview and draft flows for articles; content blocks; authors and categories.
- **Phase 7** — not started. Changesets, component status labels, visual regression, release gates. This is the gate for Phase 8.
- **Phase 8** — not started. `apps/native-prototype` covers the local, engineer-facing path; the zero-install Expo Snack path needs published packages first.

Cross-cutting: Figma screenshot parity checks, and a real icon set for `@brankas/icons-native`.

## In Progress

- [x] Add initial component behavior tests.
- [x] Expand component behavior tests across the full desktop component set (31/31 covered).
- [ ] Add the missing `CurveBackground` test in `@brankas/native` (25/26 covered).
- [ ] Grow `@brankas/icons-native` beyond the `Icon` wrapper and single `CheckIcon`.
- [ ] Add visual regression or screenshot comparison for Figma parity.
- [ ] Add component-level token source files when component-specific token overrides are needed.
- [ ] Expand pattern guidance with usage rules and anti-patterns.
- [x] Add first dedicated website pages for component, token, and pattern details.
- [ ] Add deeper playground controls for themes and viewport sizes.
- [x] Configure Payload CMS inside `apps/web`.
- [x] Connect Payload website page content to the main app.
- [x] Connect Payload component page content to `/components/[slug]`.
- [x] Connect Payload site navigation to the navbar and sidebar.
- [x] Validate Payload admin login against Postgres (verified in production against Neon).
- [x] Render published article and release content on the website.
- [x] Defer token documentation metadata until preview/docs content needs it.

## Next

- [x] Add token source folders for primitives, semantic tokens, and component tokens.
- [x] Add user-provided token JSON files.
- [x] Build token generation outputs for CSS variables and TypeScript exports.
- [x] Implement the first React components using generated token outputs.
- [x] Add Storybook examples for the first components.
- [x] Expand desktop coverage with the second component batch.
- [x] Add Search after source link and expected behavior are provided.
- [x] Start Phase 4 with starter desktop product patterns.
- [x] Start Phase 5 with package-backed live preview and playground home page.
- [x] Continue Phase 5 with starter component, token, and pattern detail pages.
- [x] Start Phase 6 with embedded Payload CMS configuration.
- [x] Provision Postgres (Neon) and verify `/admin` login.
- [x] Deploy `apps/web` to Vercel and connect GitHub for auto-deploy.
- [x] Add CMS-driven article and release pages.
- [x] Ship the mobile component library as standalone `@brankas/native` (supersedes the planned `@brankas/react/mobile` entrypoint).
- [ ] Start Phase 7: add Changesets, component status labels, and unprivate the packages.
- [ ] Start Phase 8 once packages publish: master Expo Snack plus forkable starter templates.

## Decision Log

| Date       | Decision                                | Notes                                                                                                                             |
| ---------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-29 | Initialize documentation                | Start with root-level markdown files for a design/library asset project.                                                          |
| 2026-04-29 | Use React/Next-first direction          | Prioritize React components and a Next.js preview/playground website.                                                             |
| 2026-04-29 | Use Payload CMS self-hosted             | CMS will support articles, releases, and editorial guidance.                                                                      |
| 2026-04-29 | Build design library first              | The website must consume library tokens and components, not define separate styling.                                              |
| 2026-04-29 | Avoid Tailwind requirement              | Token authoring and styling should not depend on Tailwind.                                                                        |
| 2026-04-29 | Use DTCG-style JSON tokens              | User will provide canonical token files.                                                                                          |
| 2026-04-29 | Split tokens by layer                   | Use separate primitive, semantic, and component token files.                                                                      |
| 2026-04-29 | Split mobile and desktop UI             | Use explicit React subpath exports while sharing primitive and semantic tokens.                                                   |
| 2026-04-29 | Start Phase 3 with desktop UI           | Implement Accordion, Avatar, Badge, Breadcrumbs, and Button first.                                                                |
| 2026-04-29 | Continue desktop batch                  | Add remaining provided desktop components; keep Search pending until details exist.                                               |
| 2026-04-29 | Correct desktop batch from Figma        | Fetch Figma context for provided nodes and align component sizing, variants, and states.                                          |
| 2026-04-29 | Continue desktop input/navigation batch | Add Search, Sidebar, Dropdown, Select, Skeleton, Tabs, Table cell, Text field, Text area, Toast, and Tooltip from Figma context.  |
| 2026-04-29 | Expand Phase 5 detail pages             | Add route-based component detail pages, token references, and pattern guidance while keeping previews package-backed.             |
| 2026-04-30 | Start Phase 6 Payload CMS               | Embed Payload in `apps/web` with Postgres, admin routes, articles, releases, media, and a local seeded admin account.             |
| 2026-04-30 | Connect CMS to website pages            | Add editable website pages, CMS-backed home content, generic `/{slug}` rendering, and default Payload admin layout separation.    |
| 2026-04-30 | Connect CMS navigation                  | Add `Site Navigation` global and render top navbar and documentation sidebar from Payload.                                        |
| 2026-04-30 | Connect CMS component pages             | Add `Component Pages` collection and render `/components/[slug]` content from Payload while keeping previews package-backed.      |
| 2026-04-30 | Route website pages through CMS         | Site navigation owns navbar/sidebar links; website pages can choose sidebar/no-sidebar/custom layouts, including tokens/patterns. |
| 2026-05-08 | Hardcoded Storybook URL in topnav       | The Storybook navbar link is hardcoded to `http://localhost:6006` in `lib/site-navigation-data.ts` and `payload/seedAdmin.ts`. Works while local Storybook dev is running but breaks once deployed. Swap the URL in both files (or edit `/admin/globals/site-navigation`) when a hosted Storybook exists. Could be moved to a `NEXT_PUBLIC_STORYBOOK_URL` env var later. |
| 2026-05-13 | Add Phase 8 — Designer Prototyping      | Target workflow: Expo Snack + Claude Cowork + pre-made starter templates. Designers need only Expo Go on their phone — no local Node/Xcode/terminal. Requires publishing `@brankas/native`, `@brankas/icons-native`, and `@brankas/tokens` to a private npm scope (`@banksinarmas/*`) so Snack can install them. Master Snack + 5–8 forkable templates (Login, Onboarding, Dashboard, Transfer, Profile, QRIS scan, History, Settings). Higher-fidelity options layered on top: Expo demo app + EAS Update for navigation-heavy flows, or Vite + react-native-web deployed to Vercel for stakeholders who don't want Expo Go installed. |
| 2026-06-19 | Deploy web app to Vercel + GitHub       | Pushed repo to private GitHub `alifhunter/brankas-library`; deployed `apps/web` to Vercel (https://brankas-library.vercel.app) backed by Neon Postgres. Monorepo deploy required Root Directory `apps/web`, env vars declared in `turbo.json` `globalEnv`, and a `.vercelignore` excluding native `ios`/`android` to stay under Vercel's file limit. Seeded Neon schema + admin via a one-time local dev run; prod seeding disabled. `/admin` login verified. Rotation guidance added to `README.md`. |
| 2026-06-19 | Environment-aware Storybook nav link    | Resolved the 2026-05-08 hardcoded-localhost issue. `NEXT_PUBLIC_STORYBOOK_URL` now drives the Storybook top-nav link; `applyStorybookUrl` in `lib/site-navigation-data.ts` rewrites it at render time (overriding the CMS-stored value). Dev defaults to `http://localhost:6006`; production hides the link when the variable is unset. |
| 2026-06-19 | Host Storybook at /storybook (multi-zone) | Deployed Storybook as a second Vercel project (`brankas-storybook`, root `apps/storybook`, same GitHub repo) and proxied it onto the main domain at `/storybook` via Next.js rewrites + `skipTrailingSlashRedirect` (`apps/web/next.config.mjs`) plus a `middleware.ts` redirect of bare `/storybook` → `/storybook/`. Trailing slash required because Storybook's manager uses relative asset URLs; a `redirects()` rule loops, so middleware handles it. `STORYBOOK_ORIGIN` overrides the proxy target; `NEXT_PUBLIC_STORYBOOK_URL=/storybook/` in prod. Verified index, manager assets, preview iframe, and `index.json` all proxy at 200. |
| 2026-06-22 | CMS article/release pages + Blob media  | Added `/articles` + `/articles/[slug]` (lib/articles.ts) and cover-image rendering on `/change-log/[releaseSlug]`. Bumped fetcher `depth` to 1 so hero/cover images and rich-text `upload` embeds resolve. Media now stored in Vercel Blob (`@payloadcms/storage-vercel-blob`, store `brankas-media`) because Vercel's FS is ephemeral/read-only; `disablePayloadAccessControl: true` serves images from the public Blob CDN URL so anonymous visitors can load them. Verified prod upload → public blob URL → 200. Added Articles nav links (defaults + seed + live CMS via API) and two starter articles. |
| 2026-06-22 | Rich-text tables                        | Enabled Payload's `EXPERIMENTAL_TableFeature` in `lexicalEditor` (table insert/edit on every rich-text field) and added `table`/`tablerow`/`tablecell` rendering to `rich-text.tsx` (header cells → `<th>`, colSpan/rowSpan, horizontally-scrollable wrapper + styling). No DB migration (rich text is JSON); regenerated the admin import map for the feature's components. Verified end-to-end by rendering a table in prod. |
| 2026-06-22 | General settings global                 | New `General` global (admin group "Settings") as the single place to manage site branding + home hero: navbar `logo` (upload), `brandName`, `productName`, `favicon` (upload), and `home` hero (title/description/CTA). `lib/general.ts` `getGeneral()` normalizes it; `getSiteNavigation()` merges brand+logo into the navbar (no prop threading); home `page.tsx` overrides the hero; root `layout.tsx` `generateMetadata` sets favicon + title. Falls back to existing sources when empty. Additive `general` table pushed to Neon; populated via API. Verified logo/favicon/brand/hero render in prod. |
| 2026-06-22 | Component card thumbnails                | Added a `thumbnail` upload field plus a `thumbnailUrl` text field (external image link) to `ComponentPages`; `getComponentThumbnails()` maps canonical slug → URL (uploaded image preferred, falls back to the http(s) link) and the home Components grid renders it in the card (falling back to the pink placeholder when unset). Additive `thumbnail_id` + `thumbnail_url` columns pushed to Neon. Verified both upload and URL paths by setting/clearing test thumbnails in prod. |
| 2026-06-22 | Editorial pages -> rich-text + WebsitePages admin tidy | What is Brankas and Design Principles now render a single rich-text body (`website-pages.content`) instead of intro/sections. `RichText` slugifies heading text into `id`s, so headings are deep-linkable across all rich-text pages. On the `Website Pages` collection, `hero.title` is no longer required and `hero`/`intro`/`sections`/`visualCards`/`changelog` are hidden in admin for `pageType === 'custom'` (editorial) pages, which show only the `content` field — removing the dead hero/intro fields that previously cluttered those pages. Neon migrated with an additive `content` column (no data-loss prompt); both bodies back-filled. |
| 2026-06-22 | Own pages for What is Brankas + Design Principles | `/what-is-brankas` now reads its own `website-pages` entry instead of the `home` page's intro. `/design-principles` is a new dedicated route (previously only a broken `#design-principles` anchor); nav links to it directly. Shared `editorial-page.tsx` renders both from their CMS entry and slugifies section-heading ids for deep links. No schema change — two new `website-pages` rows created in prod via the authenticated API; nav repointed via API. |
| 2026-06-22 | Foundation pages: single rich-text body   | Replaced the per-section title/body array on the `Foundations` collection with one WYSIWYG rich-text `content` body, rendered below the intro (`foundation/[slug]`); `tokenReferences` stays a structured field. `lib/foundations.ts` reads `content`. Neon schema migrated via drizzle push (auto-confirmed the `foundations_sections` drop with piped `yes`); seed converts section title/body into Lexical bodies and upserts. All 9 foundations back-filled. Mirrors the component-page change. |
| 2026-06-22 | Component pages: single rich-text body   | Replaced the per-section anatomy/usage/accessibility fields on `ComponentPages` with one WYSIWYG body per platform (`desktopContent`/`mobileContent`), rendered below the code-owned live preview. Also wired component detail pages to the CMS — they previously rendered 100% from static `library-data.ts` (editing in Payload did nothing). `lib/component-pages.ts` now fetches CMS bodies and merges with code-owned preview/import metadata. Neon schema migrated via drizzle push (auto-confirmed the data-loss drop by piping `yes`); seed converts existing lists into Lexical bodies (heading + list per section), keyed by canonical slug, and removes legacy `mobile-*` pages. 44 pages back-filled. |
| 2026-06-22 | Real command-palette search             | Replaced the cosmetic sidebar search box with a working palette (`command-search.tsx`): centered overlay, grouped live results, keyboard nav, opens via button / ⌘K / "/". Index built server-side (`lib/search.ts`) from static component/pattern/token docs + live nav + published articles/releases, served at `/search-index`, fetched lazily on first open. `DocsShell` kept sync (the home page is a client component that renders it; importing the payload-backed index there pulled `pg` into the client bundle). Also fixed the broken "See all components" reveal (cards stuck at opacity 0.55 + `max-height` clamp clipped most of ~50 components). |
| 2026-08-10 | Mobile ships as `@brankas/native`       | *Recorded retroactively — this work predates the squashed 2026-06-19 initial commit, so the original date is not recoverable from git.* Mobile components ship as a standalone React Native package (26 components, root entrypoint + `theme` subpath) instead of the planned `@brankas/react/mobile` subpath. React Native needs different peer deps (`react-native-svg`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`) and a different build/test toolchain (Babel + jest RN preset) than the DOM package; a shared package would have forced those onto every web consumer. Both packages consume the same primitive and semantic tokens from `@brankas/tokens`; only the typography scale is split by platform. `@brankas/icons-native` was added alongside but is still only the `Icon` wrapper + one `CheckIcon`. Storybook renders native stories via `react-native-web` with local gesture-handler/reanimated stubs. |
| 2026-08-10 | `apps/native-prototype` Expo app        | *Recorded retroactively — predates the squashed initial commit.* Local Expo SDK 55 app consuming `@brankas/native` as a workspace dep, so flows can be tested on real devices with the actual components. Screens auto-discover from `cases/` (drop in a `.tsx`, no registry to edit); current cases are `dashboard-vision`, `open-account-flow`, `transfer-success`. This is the Phase 8 "higher-fidelity option", not the zero-install designer path — it needs a local Xcode/Android toolchain. Its `ios`/`android` folders are excluded via `.vercelignore` to stay under Vercel's file limit. |
| 2026-08-10 | Example screens + the radius rule          | From engineering review: components look fine reviewed one at a time, so nobody had checked how they look *adjacent*. Added `/examples` — three working screens (overview, transaction search, beneficiary list) from one fictional disbursements console sharing one dataset, covering all 31 desktop components. Code-owned, not CMS-owned, so changes arrive as a reviewable diff. The review's specific catch — Button (`radius-pill`, 999px) beside Select (`radius-sm`, 8px) — is **intentional and now documented**: pills are actions and status objects, 8px is anything holding a value. The real defect was that `/foundation/radius` never mentioned the pill despite it being the most-used radius (28 usages vs 20 for `sm`), so the pairing read as an accident. A genuine inconsistency the same method surfaced: Dropdown's menu panel was `radius-xs` (4px) while Select's panel was `radius-sm` (8px) — two floating surfaces, two radii; Dropdown is now `radius-sm`. Also found and recorded: `@brankas/patterns` is dead code (no Storybook glob, no `apps/web` import), and the docs' claim of pattern Storybook examples was false. |
| 2026-08-10 | Components fill; width is the layout's job | The first review on a real screen caught it immediately: a page-level Banner capped at 320px. Five components carried Figma artboard widths as `width: min(100%, Npx)` — Banner (328/320/1052), Accordion (767), Carousel (328), TextField (432), TextArea (340). All now `width: 100%`. The caps that were worth keeping became semantic tokens instead: `size.field-max` (432px) and `size.content-max` (1056px), new `size` primitives + `size-semantic` sources, exposed as `--size-field-max` / `--size-content-max`. Components never apply them to themselves; layouts do. `apps/web` applies `--size-field-max` inside `.example-variant__body` so component-page previews still sit side by side. This is the class of bug that is invisible on a component detail page and obvious in a composition — the argument for `/examples` existing. |

## Validation Checklist

Use this checklist when updating the library:

- [ ] Token source files follow DTCG-style JSON.
- [ ] Token files are split into primitive, semantic, and component layers.
- [ ] Generated CSS variables match token source values and aliases.
- [ ] Generated TypeScript exports match token source values and aliases.
- [ ] Components use generated token outputs.
- [ ] New desktop components are represented in Storybook.
- [ ] New native components are represented in Storybook and have a co-located test.
- [ ] New or changed components are checked on an `/examples` screen, beside their neighbours, not only on their own detail page.
- [ ] Radius choices follow the documented rule: pill for actions and status, 8px for surfaces that hold a value.
- [ ] Components fill their container. No component caps its own width — width constraints come from the layout via `--size-field-max` / `--size-content-max`.
- [ ] Mobile and desktop React components are separated at the package level (`@brankas/native` vs `@brankas/react`), not by subpath.
- [ ] Mobile and desktop React components share primitive and semantic tokens.
- [ ] Native components use `@brankas/native/theme` rather than hardcoded values.
- [ ] The website consumes library packages instead of duplicating styling.
- [x] Payload admin works against a running Postgres database.
- [ ] Payload REST and GraphQL routes respond in local development.
- [ ] Home page edits in Payload appear on `/`.
- [ ] Published `Website Pages` entries render at `/{slug}`.
- [ ] Website page layout selection correctly shows or hides the sidebar.
- [ ] Published `Component Pages` entries render at `/components/[slug]`.
- [ ] `Site Navigation` edits in Payload appear in the navbar and sidebar.
- [x] Published CMS articles and releases render on the website.
- [ ] Payload CMS content does not replace source-controlled component API docs.
- [ ] New assets are named clearly and consistently.
- [ ] Accessibility expectations are documented for interactive components.
- [ ] Related README or plan sections are updated.
- [ ] Decisions are recorded when they affect future contributors.
- [ ] Local links and references still work.
- [ ] `@brankas/native`, `@brankas/icons-native`, and `@brankas/tokens` publish cleanly to the private npm scope.
- [ ] The master Brankas Mobile UI Kit Snack imports the latest published version and renders without errors.
- [ ] Starter template Snacks (Login, Onboarding, Dashboard, Transfer, Profile, QRIS scan, History, Settings) load on iOS and Android via Expo Go.
- [ ] The "How to prototype" guide is reachable from the Storybook Introduction page.
