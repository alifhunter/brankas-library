# Brankas Library Plan

## Direction

Brankas Library will be a React/Next-first design system with importable packages for tokens, components, and patterns. It will also include a live preview and playground website, plus a self-hosted Payload CMS for articles, release notes, and team-authored guidance.

The project must be built design-library-first: tokens and React components come before website styling. The website must consume the library packages instead of creating a parallel design system.

## Goals

- Create reusable design libraries that other teams can import and use.
- Keep canonical design tokens in user-provided DTCG-style JSON files.
- Generate CSS variables and TypeScript exports from token source files.
- Build accessible React components and reusable patterns.
- Provide a live preview and playground for all tokens, components, and patterns.
- Support articles and editorial content through Payload CMS.
- Scale with versioning, package governance, accessibility review, and visual regression testing.

## Non-Goals

- Do not use Tailwind as the canonical token source or styling requirement.
- Do not build the website before the design library foundation exists.
- Do not store implementation-owned component API documentation only in the CMS.
- Do not scaffold unrelated product application features in this repository.

## Phase 1: Monorepo Foundation

Set up the workspace structure and shared tooling.

- [x] Create pnpm workspace configuration.
- [x] Add Turborepo task orchestration.
- [x] Add TypeScript shared configuration.
- [x] Add shared linting and formatting configuration.
- [x] Create planned apps and packages:
  - `apps/web`
  - `apps/storybook`
  - `packages/tokens`
  - `packages/react`
  - `packages/patterns`
  - `packages/config`

Acceptance criteria:

- [x] Workspace installs cleanly.
- [x] Shared scripts exist for build, lint, typecheck, and test.
- [x] Packages can reference shared workspace dependencies.
- [x] No website-only design styling is introduced before tokens exist.

## Phase 2: Token Package and Build Outputs

Create the token source structure and build pipeline. Authored token JSON belongs in `packages/tokens/source`; runtime TypeScript source and generated exports belong in `packages/tokens/src`.

- [x] Add canonical token source folders:
  - `packages/tokens/source/primitives`
  - `packages/tokens/source/semantic`
  - `packages/tokens/source/components`
- [x] Accept user-provided DTCG-style JSON token files.
- [x] Keep token source split by layer and category or component.
- [x] Generate CSS variables from token sources.
- [x] Generate TypeScript token exports from token sources.
- [x] Defer token documentation metadata until preview/docs content needs it.

Canonical source structure:

```text
packages/tokens/source/
├── primitives/
│   ├── color.tokens.json
│   ├── typography.tokens.json
│   ├── spacing.tokens.json
│   ├── radius.tokens.json
│   ├── shadow.tokens.json
│   └── breakpoint.tokens.json
├── semantic/
│   ├── color.tokens.json
│   ├── typography.tokens.json
│   ├── spacing.tokens.json
│   ├── radius.tokens.json
│   ├── shadow.tokens.json
│   └── breakpoint.tokens.json
└── components/
    ├── button.tokens.json
    ├── input.tokens.json
    ├── card.tokens.json
    └── dialog.tokens.json
```

Token layer responsibilities:

- Primitive tokens hold raw values.
- Semantic tokens hold usage-based aliases.
- Component tokens map semantic tokens to component behavior.

Acceptance criteria:

- [x] Token source validates as DTCG-style JSON.
- [x] CSS variables build from token source files.
- [x] TypeScript exports build from token source files.
- [x] Token aliases resolve across primitive, semantic, and component layers.
- [x] No Tailwind-specific source files are required.

## Phase 3: React Component Library

Build the importable React component package using generated tokens. Brankas supports both mobile and desktop components; they are differentiated at the package level while sharing the same token foundation.

- [x] Create component package exports.
- [x] Add explicit `@brankas/react/desktop` and `@brankas/react/shared` entrypoints.
- [x] Ship mobile as the standalone `@brankas/native` package with a root entrypoint and a `theme` subpath. **Supersedes the planned `@brankas/react/mobile` subpath** — React Native needs different peer dependencies and a different build and test toolchain than the DOM package, so a shared package would have forced RN dependencies onto every web consumer.
- [x] Keep shared primitives and utilities in the shared entrypoint.
- [x] Build the first desktop foundational components.
- [x] Add second desktop component batch for feedback, selection, navigation, disclosure, upload, and progress patterns.
- [x] Rework the second desktop component batch using Figma node context.
- [x] Add desktop input, menu, navigation, loading, table, toast, and tooltip components from Figma node context.
- [x] Build the mobile component set in `@brankas/native` (26 components across primitives, form controls, navigation, feedback/overlays, and content/disclosure).
- [x] Add `@brankas/icons-native` with the `Icon` SVG wrapper for React Native.
- [ ] Grow `@brankas/icons-native` into a real icon set — it currently ships only `Icon`, `DEFAULT_ICON_SIZE`, and a single generated `CheckIcon`, so native components inline their own SVG paths.
- [x] Use generated token outputs for all styling.
- [x] Include props, types, accessibility notes, and examples for the first pass.
- [x] Add initial component tests for behavior and key states.
- [x] Expand component tests across the full desktop component set (all 31 desktop components have a co-located test).
- [ ] Add the one missing native component test (`CurveBackground`); the other 25 are covered.
- [x] Add Storybook stories for the first desktop components.
- [x] Add Storybook examples for the second desktop component batch.
- [x] Add Storybook examples for the Search, Sidebar, Dropdown, Select, Skeleton, Tabs, Table cell, Text field, Text area, Toast, and Tooltip batch.
- [x] Add Storybook examples for the native components, rendered through `react-native-web`.

Initial shared component targets:

- Button
- Link
- Badge
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Tabs
- Dialog
- Tooltip
- Card
- Alert
- Table
- Pagination
- Navigation

Initial desktop-specific targets:

- Accordion
- Avatar
- Badge
- Banner
- Breadcrumbs
- Button
- Carousel
- Checkbox
- Chips selection
- Coachmark / tourtip
- Date picker
- Table
- Dialog
- Empty states
- File upload
- Label / status
- Loader
- Overlay
- Progress bar
- Progress indicator
- Radio button
- Search
- Toggle
- Tooltip
- Sidebar navigation
- Desktop pagination

Initial mobile-specific targets, against what `@brankas/native` now ships:

- [x] Bottom sheet — `BottomSheet`
- [x] Mobile navigation — `BottomNav`, `Header`, `Tabs`, `TabsChip`
- [x] List item — `AccountItem`, `SourceOfFund`
- [x] Touch-friendly form controls — `Checkbox`, `InputAmount`, `Search`, `TextArea`, `TextField`, `Toggle`, `ToggleText`
- [ ] Mobile pagination — not built

Delivered beyond the original target list: `Accordion`, `AnnouncementBanner`, `Avatar`, `Badge`, `Button`, `CurveBackground`, `Dialog`, `Overlay`, `SectionBanner`, `Toast`, `Tooltip`, `Tracker`.

Acceptance criteria:

- [x] First desktop components can be imported from `@brankas/react/desktop`.
- [x] First desktop components use token-generated styling.
- [x] Mobile components can be imported from `@brankas/native`, with resolved tokens from `@brankas/native/theme`.
- [x] Mobile and desktop components share primitive and semantic tokens.
- [x] Platform-specific component tokens exist only when the component behavior requires them (currently only the typography scale, split into desktop and mobile semantic files).
- [x] Initial keyboard and accessibility behavior checks are covered for representative interactive components.
- [ ] Full keyboard and accessibility behavior coverage is added for all stable interactive components.
- [x] Storybook renders the first desktop components.
- [x] Storybook renders the second desktop component batch.
- [x] Storybook renders the Search, Sidebar, Dropdown, Select, Skeleton, Tabs, Table cell, Text field, Text area, Toast, and Tooltip batch.
- [x] Storybook renders the native components through `react-native-web`.
- [x] Component API docs are source-controlled with the component package through typed props and stories.
- [x] Search component source and requirements are confirmed.
- [ ] Figma screenshot comparison is added for desktop component parity.

## Phase 4: Patterns and Guidelines

Create reusable product patterns after core components are stable.

- [x] Define pattern package exports.
- [x] Add explicit `@brankas/patterns/desktop` entrypoint.
- [x] Build starter layout and form patterns.
- [ ] **Render `@brankas/patterns` somewhere.** The five patterns (page header, filter toolbar, form section, empty list state, detail panel) are built and exported but consumed nowhere: `packages/patterns` is not in the Storybook `stories` glob and is not imported by `apps/web`. The `/patterns` page renders six recipes implemented locally in `apps/web/src/app/(frontend)/patterns/pattern-examples.tsx`, not the package. Decide whether the package or the local recipes is the real home and delete the other.
- [x] Connect patterns to component and token usage.
- [ ] Expand pattern guidance with usage rules and anti-patterns.
- [ ] Add pattern tests once composition behavior becomes interactive.

Acceptance criteria:

- [x] Patterns compose existing components.
- [ ] Pattern examples are documented in Storybook — **not met**, `packages/patterns` has zero stories.
- [x] Pattern guidance is visible on the preview site (`/patterns`, via local recipes).
- [ ] Pattern guidance covers when not to use each pattern.

## Phase 5: Live Preview and Playground Website

Build the Next.js website after the token and component foundations exist.

- [x] Build a home page that previews tokens, components, and patterns.
- [x] Add first component gallery sections.
- [x] Add first interactive playground controls for variants and states.
- [x] Add code snippets and import examples.
- [x] Use `@brankas/tokens`, `@brankas/react`, and `@brankas/patterns` for website styling and UI.
- [x] Add first dedicated component detail pages.
- [ ] Add deeper playground controls for themes and viewport sizes.
- [x] Add first token detail page and token references.
- [x] Add first pattern guidance page.
- [x] Add full example screens at `/examples` (dashboard, transaction search, beneficiary list) so component adjacency can be reviewed in a real layout rather than on isolated detail pages.
- [x] Add the two form screens — a stepper flow (`/examples/new-payout`) and a single-page form (`/examples/settings`) — covering both validation models and both answers to "how wide should a form column be".
- [ ] Extend the example screens to mobile once `@brankas/native` has a web-rendered preview surface.

Acceptance criteria:

- [x] Website renders using the design library packages.
- [x] Playground uses actual package exports.
- [x] No duplicate website-only component system exists for package-backed previews.
- [x] First preview page works across desktop and mobile widths.
- [ ] Dedicated preview pages are visually reviewed across desktop and mobile widths.

## Phase 6: Payload CMS

Add self-hosted Payload CMS for editorial content.

- [x] Configure Payload CMS inside the Next.js website.
- [x] Use Postgres as the CMS database.
- [x] Add first collections for users, media, articles, and releases.
- [x] Add website page content collection for editable Brankas site pages.
- [x] Add component page content collection for editable `/components/[slug]` pages.
- [x] Add site navigation global for editable navbar and sidebar menus.
- [x] Add local admin seed credentials for development.
- [ ] Add authors and categories if editorial ownership needs separate records.
- [ ] Add content blocks for callouts, component references, token references, code blocks, and images.
- [x] Enable draft storage for articles and releases.
- [x] Enable website rendering for published website pages.
- [x] Enable website rendering for published articles and releases.
- [ ] Enable live preview flows for articles.

Acceptance criteria:

- [x] Payload admin route is wired at `/admin`.
- [x] Payload REST and GraphQL routes are wired.
- [x] Editorial content collections exist for articles, releases, and media.
- [x] Website page content can drive the home page and generic `/{slug}` pages.
- [x] Component page content can drive `/components/[slug]` pages while live previews stay package-backed.
- [x] Navbar and sidebar menus can be managed from Payload.
- [x] Editorial content can be created in Payload against a running Postgres database (Neon in production; `/admin` login verified).
- [x] Published articles render on the website (`/articles`, `/articles/[slug]`; releases at `/change-log/[releaseSlug]`).
- [ ] Draft previews render before publishing.
- [ ] CMS content can reference components and tokens without owning their API documentation.

## Phase 7: Versioning, Publishing, Governance, and Scaling

Prepare the library for real team usage. **Not started.** Every package is still `private: true` at version `0.0.0` and is consumed only through the pnpm workspace.

This phase blocks Phase 8: designers cannot install packages from Expo Snack until they are published.

- [ ] Add Changesets for package versioning and changelogs.
- [ ] Define component status labels: experimental, beta, stable, deprecated.
- [ ] Add visual regression checks for component and website changes.
- [ ] Add accessibility review requirements.
- [ ] Add release approval gates.
- [ ] Consider a future component registry for selective installation.

Acceptance criteria:

- [ ] Packages can be versioned independently.
- [ ] Breaking changes are documented.
- [ ] Stable components require tests, docs, and visual coverage.
- [ ] Deprecations are visible to consumers.

## Phase 8: Designer Prototyping Workflow

Make `@brankas/native` usable by designers without development experience so they can build working mobile prototypes to share with engineers.

The constraint: zero local install (no Node, no Xcode, no terminal). The only tool a designer should need on their machine is the **Expo Go** app on their phone and a browser.

### Recommended stack

- **Expo Snack** (`snack.expo.dev`) — browser-based React Native sandbox, hot-reloads to real devices via QR code, public/private URLs. Designer's primary editor.
- **Claude Cowork** — designers describe screens in natural language; Claude reads/writes the Snack code. Replaces the need to know React.
- **Pre-made starter templates** — forkable Snacks for Login, Onboarding, Dashboard, Transfer, Profile, QRIS scan, History, Settings. Designers always start from a template, never from blank.

### Designer's day-to-day workflow

1. Open a bookmarked Snack URL (the master kit, or a starter template).
2. Click **Fork** to get an editable copy.
3. Open Claude Cowork in another tab and describe what to add or change ("add a balance card with curve background and three quick-action buttons").
4. Scan the Snack QR with Expo Go on their phone — the prototype runs live on-device with real touch and gestures.
5. Share the Snack URL with engineers / stakeholders.

### Engineering setup (one-time)

Publishing is not a config flip. Two things block it today: all packages are `private: true` at `0.0.0` with no versioning workflow (Phase 7), and `@brankas/icons-native` has no real icon set yet — it ships only the `Icon` wrapper and one `CheckIcon`, so publishing it as-is would give Snack users nothing usable.

- [ ] Publish `@brankas/native`, `@brankas/icons-native`, and `@brankas/tokens` to a private npm scope (`@banksinarmas/*`). Required so Snack can install them. Depends on Phase 7.
- [ ] Verify peer deps (`react-native-svg`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`) resolve cleanly in Snack.
- [ ] Build a master "Brankas Mobile UI Kit" Snack that imports the published library and renders one example screen.
- [ ] Build 5–8 forkable starter templates as separate Snacks: Login, Onboarding, Dashboard, Transfer, Profile, QRIS scan, History, Settings.
- [ ] Write a one-page "How to prototype" guide (3 steps: open Snack → scan QR → ask Claude). Surface it from the Storybook Introduction page.

### Higher-fidelity options (optional, layer on top)

- **`apps/native-prototype` (built).** A local Expo SDK 55 app that already consumes `@brankas/native` as a workspace dependency and auto-discovers screens from `cases/` (currently `dashboard-vision`, `open-account-flow`, `transfer-success`). This covers the engineer-facing half of the workflow today, but it requires a local Xcode or Android toolchain, so it does not satisfy the zero-install constraint above.
- **Expo demo app + EAS Update** — a single QR code that always shows the latest internal prototype. Engineers maintain the build; designers consume it. Better for navigation-heavy flows that exceed Snack's one-screen comfort zone. `apps/native-prototype` is the natural starting point for this.
- **Vite + react-native-web prototype** deployed to Vercel — single shareable URL for stakeholders who don't want Expo Go installed. Loses native gesture fidelity but works in any browser, including Cowork's sandbox.

### Acceptance criteria

- [ ] A designer with no development experience can fork a starter template, modify a screen via Claude Cowork, and preview it on their phone within 5 minutes of opening the bookmarked URL.
- [ ] A designer can share a prototype with engineers via a single Snack URL, no local repo or build step required.
- [ ] All starter templates render correctly in Expo Go on iOS and Android.
- [ ] The master Snack stays in sync with the latest published `@brankas/native` version (semver bumps documented).

## Validation Strategy

- Run build, lint, typecheck, and test through the monorepo task runner.
- Validate token JSON before generating outputs.
- Test component behavior with a browser-capable test runner.
- Use Storybook for component development and QA.
- Use Playwright for website smoke tests and visual regression coverage.
- Check markdown documentation whenever project direction changes.

## Risks and Constraints

- Token architecture must stay stable before many components are added.
- Component quality depends on consistent accessibility and visual testing.
- Payload adds infrastructure ownership, especially database hosting and migrations.
- The website must not drift into a separate design system.
- Publishing and governance should be in place before broad adoption.
