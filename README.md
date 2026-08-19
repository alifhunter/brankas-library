# Brankas Library

Brankas Library is a React/Next-first design system project for building importable design libraries: components, colors, tokens, and patterns that other teams can use in their products.

The project will also include a live preview and playground website for browsing the library, testing component variants, and reading team-authored articles.

## Purpose

This repository will become the source of truth for:

- Design tokens and color systems
- React components
- Reusable patterns
- Usage guidelines
- Live previews and playgrounds
- Articles, releases, and editorial content through a CMS

The design library comes first. The website must consume the library styling and components instead of defining a separate website-only design system.

## Preferred Stack

- TypeScript for all packages and apps
- React for the component library
- Next.js for the documentation, preview, playground, and CMS website
- pnpm workspaces for package management
- Turborepo for monorepo task orchestration
- Payload CMS self-hosted with Postgres for articles and editorial content
- Storybook as a development and QA companion
- Changesets for package versioning and changelogs

Tailwind is not required for token authoring or styling. Canonical token files should be user-provided DTCG-style JSON files, then converted into generated outputs such as CSS variables and TypeScript exports.

## Repository Structure

```text
.
├── apps/
│   ├── web/               # Next.js preview site + embedded Payload CMS
│   ├── storybook/         # Storybook host (renders desktop and native stories)
│   └── native-prototype/  # Local Expo app for prototyping with @brankas/native
├── packages/
│   ├── tokens/            # DTCG token sources + generated CSS/TS outputs
│   ├── react/             # Desktop DOM components (@brankas/react)
│   ├── native/            # React Native components (@brankas/native)
│   ├── icons-native/      # React Native icon primitives (@brankas/icons-native)
│   ├── patterns/          # Composed product patterns (@brankas/patterns)
│   └── config/            # Shared TypeScript/lint configuration
├── README.md
├── PLAN.md
└── CHECKPOINT.md
```

## Token Source Structure

Canonical token files live in separate files by layer and category or component. The current source tree is:

```text
packages/tokens/source/
├── primitives/
│   ├── breakpoint.tokens.json
│   ├── color.tokens.json
│   ├── radius.tokens.json
│   ├── shadow.tokens.json
│   ├── size.tokens.json
│   ├── spacing.tokens.json
│   └── typography.tokens.json
├── semantic/
│   ├── breakpoint-semantic.tokens.json
│   ├── color-semantic.tokens.json
│   ├── shadow-semantic.tokens.json
│   ├── size-semantic.tokens.json
│   └── typography/
│       ├── typography.desktop.tokens.json
│       └── typography.mobile.tokens.json
└── components/            # intentionally empty
```

`components/` is intentionally empty. Component tokens are only added when a component needs a value that the semantic layer cannot express; until then, components alias semantic tokens directly. Typography is the one layer already split by platform, because desktop and mobile need different type scales.

### Width is the layout's job, not the component's

Every component fills the container it is placed in. No component caps its own width.

This was not always true: Banner, Accordion, Carousel, TextField and TextArea each shipped with a `width: min(100%, Npx)` cap carried over from the Figma artboard they were drawn on — which meant a page-level Banner stopped at 320px in the middle of a full-width page. Those caps are gone.

When something genuinely should not stretch, constrain it from the layout using the semantic size tokens:

- `--size-field-max` (432px) — maximum comfortable width for a single form control
- `--size-content-max` (1056px) — maximum readable width for a run of prose

```css
.signup-form .ui-textfield {
  max-width: var(--size-field-max);
}
```

The rule of thumb: if the constraint depends on the surrounding page, it belongs to the page.

The three token layers are:

- Primitive tokens: raw values such as base colors, spacing, radius, shadow, typography, and breakpoints.
- Semantic tokens: usage-based aliases such as text color, surface color, border color, and action color.
- Component tokens: component-specific aliases that map semantic tokens to component behavior.

Mobile and desktop components use the same primitive and semantic tokens. Component tokens should stay shared by default, with platform-specific component tokens only when mobile and desktop need different behavior, density, or layout values.

Authored token files should live under `packages/tokens/source`. The token generator also supports legacy token files under `packages/tokens/src`, but `src` should be reserved for runtime TypeScript source and generated exports.

## Token Outputs

Build token outputs with:

```sh
pnpm --filter @brankas/tokens run tokens:build
```

The token package generates:

- `packages/tokens/src/generated/tokens.ts` for TypeScript exports.
- `packages/tokens/dist/tokens.css` for CSS variables.

The package exports token data from `@brankas/tokens` and CSS variables from `@brankas/tokens/tokens.css`.

## Development Direction

The initial implementation should focus on the design library before the website:

1. Set up the monorepo.
2. Build the token package and generated outputs.
3. Build the desktop React component package.
4. Build the React Native component package on the same tokens.
5. Build patterns and usage guidelines.
6. Build the live preview and playground website using the library.
7. Add Payload CMS for articles, releases, and long-form guidance.

## Package Consumption

The package outputs are:

- `@brankas/tokens` for token CSS variables and TypeScript exports
- `@brankas/react` for desktop DOM components, with explicit `desktop` and `shared` entrypoints
- `@brankas/native` for React Native components, with a root entrypoint and a `theme` subpath
- `@brankas/icons-native` for React Native icon primitives
- `@brankas/patterns` for reusable layouts and product patterns, with an explicit desktop entrypoint

Preferred component imports:

```ts
import { Button } from '@brankas/react/desktop';
import { VisuallyHidden } from '@brankas/react/shared';
import { PageHeader } from '@brankas/patterns/desktop';

// React Native
import { Button as NativeButton } from '@brankas/native';
import { tokens } from '@brankas/native/theme';
```

Mobile components are **not** exposed as `@brankas/react/mobile`. They ship as the standalone `@brankas/native` package, because React Native requires different peer dependencies and a different build and test toolchain than the DOM package. Both consume the same primitive and semantic tokens from `@brankas/tokens`.

Every package is currently `private` at version `0.0.0` and consumed through the pnpm workspace. Nothing is published to a registry yet — see Phase 7 in `PLAN.md`.

## Current Desktop Components

The desktop entrypoint currently includes foundational components for disclosure, identity, feedback, selection, navigation, upload, progress states, search, sidebars, menus, form fields, tables, loading states, toasts, and tooltips. Current components are implemented from the provided Figma node context and exposed from `@brankas/react/desktop`. Every desktop component has a co-located `.test.tsx` and a co-located `.stories.tsx`.

## Current Mobile Components

`@brankas/native` is the React Native component library. It shares the primitive and semantic token layers with the desktop package and exposes its resolved token objects from `@brankas/native/theme`.

- Primitives and identity: `Avatar`, `Badge`, `Button`, `CurveBackground`
- Form controls: `Checkbox`, `InputAmount`, `Search`, `TextArea`, `TextField`, `Toggle`, `ToggleText`
- Navigation: `BottomNav`, `Header`, `Tabs`, `TabsChip`
- Feedback and overlays: `AnnouncementBanner`, `BottomSheet`, `Dialog`, `Overlay`, `SectionBanner`, `Toast`, `Tooltip`
- Content and disclosure: `Accordion`, `AccountItem`, `SourceOfFund`, `Tracker`

Peer dependencies: `react-native`, `react-native-svg`, `react-native-safe-area-context`, `react-native-gesture-handler`, and `react-native-reanimated`.

Components have co-located tests (all except `CurveBackground`) and co-located stories. Storybook renders them through `react-native-web`, with local stubs for gesture-handler and reanimated.

`@brankas/icons-native` is still a starting point rather than a finished icon set: it provides the `Icon` SVG wrapper, `DEFAULT_ICON_SIZE`, and a single generated `CheckIcon`. Native components that need other glyphs currently inline their own SVG paths.

### Native prototype app

`apps/native-prototype` is a local Expo (SDK 55) app that consumes `@brankas/native` as a workspace dependency, so flows can be exercised on a real iOS or Android device with the actual components.

The app opens to a grouped list of cases. Drop a `.tsx` file into `apps/native-prototype/cases/` and it appears in the list on the next reload — there is no registry to edit. A case can be one screen or a multi-step flow. Current cases: `dashboard-vision`, `open-account-flow`, and `transfer-success`.

This app requires a local Xcode or Android toolchain. See `apps/native-prototype/README.md` for the one-time machine setup. The zero-install path for designers (Expo Snack) is Phase 8 and is not built yet.

## Current Desktop Patterns

The desktop patterns entrypoint currently includes starter product patterns for page headers, filter toolbars, form sections, empty list states, and detail panels. Patterns compose `@brankas/react/desktop` components and shared token helpers; they should not introduce a parallel styling system.

> **Known gap:** `@brankas/patterns` is not consumed anywhere. It is absent from the Storybook `stories` glob in `apps/storybook/.storybook/main.ts` and is not imported by `apps/web`. The `/patterns` page and the `/examples` screens both compose components directly. Resolve this before treating the package as shipped — see Phase 4 in `PLAN.md`.

## Example Screens

`/examples` renders complete product screens rather than isolated components. Every screen belongs to one fictional product — a Brankas Open Finance disbursements console for a business customer — and all three read from a single dataset in `apps/web/src/app/(frontend)/examples/demo-data.ts`.

- `/examples/overview` — dashboard: balances, daily-limit progress, approvals queue, recent payouts, skeleton and loader states.
- `/examples/transactions` — search with working filters, sorting, bulk selection, pagination and an empty state. Its filter row is the only place all four of Chips, Select, Text field and Button appear together: pill Chip presets, three 8px Select triggers, two 8px Text fields for the amount range, then a pill Reset — two radii and two label positions in one row.
- `/examples/beneficiaries` — list with tabs and a three-step data-entry dialog that ends in a toast.
- `/examples/new-payout` — four-step stepper flow: `ProgressIndicator`, a running summary, per-step validation that blocks Continue, a discard confirmation and a terminal success state.
- `/examples/approvals` — approvals queue built around six easily-confused controls: default Tabs for the queue, chip Tabs for the method slice, selection Chips for risk flags, a Text field and a Select for filtering, and a Button that opens a Dropdown of bulk actions. Chip Tabs sit a few pixels above selection Chips on purpose — at rest the two are near-identical pills (same padding, same pill radius, borders differing only by `#ebebeb` vs `#e0e6ed`), and they diverge only once active.
- `/examples/settings` — single-page sectioned form: two-column field grid, live inline validation, a dirty-state sticky save bar, and a destructive action behind a confirmation.

The last two are a deliberate pair. A stepper and a settings page are built from nearly the same components but answer opposite questions — one carries someone through a decision made once, the other exposes everything at once to someone who knows what they came to change. They also validate differently: the stepper gates each Continue and reveals errors only on advance, while the settings form validates as you type because it has no Continue to gate.

These exist because components reviewed one at a time all look correct; the failures show up at the seams. The screens deliberately place controls that differ next to each other — most visibly a pill Button beside an 8px Select in the transaction filter row — so those decisions get reviewed in context rather than argued about in the abstract. See `/foundation/radius` for the rule that governs that pairing.

They are code-owned, not CMS-owned, so changes arrive as a reviewable diff.

## Current Preview Website

The Next.js app in `apps/web` now renders a live preview and playground website. It imports token CSS variables from `@brankas/tokens/tokens.css`, previews desktop components from `@brankas/react/desktop`, composes patterns from `@brankas/patterns/desktop`, and includes interactive controls for common component variants.

Current website routes:

- `/`: landing preview with foundation, component, pattern, playground, and changelog sections.
- `/components/[slug]`: starter component detail pages with package-backed live previews.
- `/tokens`: CMS-backed token reference page with CSS variable and TypeScript export examples.
- `/patterns`: CMS-backed pattern guidance page with six interactive recipes. The recipes are implemented in `apps/web/src/app/(frontend)/patterns/pattern-examples.tsx` — they do **not** come from `@brankas/patterns`, which is currently unused by the site and by Storybook.
- `/examples`: index of full example screens; `/examples/overview`, `/examples/transactions`, `/examples/beneficiaries`: complete product screens from one fictional disbursements console, used to review how components look beside each other.
- `/articles`: list of published CMS articles; `/articles/[slug]`: article detail with hero image and rich-text content.
- `/change-log`: CMS-backed changelog page; `/change-log/[releaseSlug]`: release detail with cover image and rich-text notes.

A command-palette search (open with the sidebar button, `⌘K`/`Ctrl+K`, or `/`) searches components, foundations, tokens, patterns, pages, and published articles/releases. Its index is built server-side (`lib/search.ts`) and served at `/search-index`, which the client palette (`command-search.tsx`) fetches lazily on first open.

## Payload CMS

Payload CMS is embedded in `apps/web` for team-authored articles, release notes, media, and longer-form guidance. It is self-hosted and uses Postgres.

CMS routes:

- `/admin`: Payload admin UI.
- `/api`: Payload REST API.
- `/api/graphql`: Payload GraphQL API.
- `/api/graphql-playground`: Payload GraphQL playground.

Local setup:

1. Copy `apps/web/.env.example` to `apps/web/.env.local`.
2. Set `DATABASE_URI` to a running Postgres database.
3. Set `PAYLOAD_SECRET` to a local secret.
4. Run the web app with `pnpm --filter @brankas/web dev`.
5. Open `/admin`.

The local seed account is:

- Username: `brankas`
- Password: `brankas`

Set `PAYLOAD_SEED_ADMIN=false` to disable local admin seeding. Set `PAYLOAD_SEED_CONTENT=false` to disable local starter content seeding.

Payload also includes a `Website Pages` collection. The seeded `home` page controls editable home-page copy such as the hero, foundational visual cards, intro content, and changelog callout. Other published website pages render at `/{slug}`. Slugs should be stored without a leading slash, but the frontend also resolves legacy entries such as `/change-log`.

Each website page can choose a layout: documentation sidebar, no sidebar, or custom. The top navbar is not owned by the `home` page; it is owned by the `Site Navigation` global.

The `Component Pages` collection controls the editable guidance on component detail pages at `/components/[slug]`. Each page is laid out as a **code-owned live preview on top** (rendered from `@brankas/react`, never copied into the CMS) with a **single rich-text body below it**, authored in Payload's WYSIWYG editor. The body is per platform (`desktopContent` / `mobileContent`), switched by the Desktop/Mobile tabs. This replaced the earlier separate anatomy/usage/accessibility list fields — those were migrated into the rich-text bodies. The live preview, import snippet, and component metadata stay code-owned in `library-data.ts`; only the written guidance is CMS-owned.

### Articles and releases

The `Articles` collection renders on the public website at `/articles` (list) and `/articles/[slug]` (detail). Only documents with `status: published` are shown. Each article supports a title, slug, excerpt, category, optional hero image, rich-text content, and `publishedAt` date. Drafts are enabled, so unpublished work stays out of the public list.

The `Releases` collection renders at `/change-log/[releaseSlug]`, with an optional cover image, tags, and rich-text release notes.

Both fetchers query at `depth: 1` so relationship fields (hero/cover image) and rich-text `upload` nodes resolve to real media URLs. If you add a deeply nested embed, increase the depth in `lib/articles.ts` / `lib/releases.ts`.

### Media uploads (rich-text image embeds)

The rich-text editor (`content` field) supports inline image embeds via Payload's default upload feature — insert a `Media` upload directly in the editor and it renders as a `<figure><img>` on the website (see `app/(frontend)/rich-text.tsx`).

Uploaded media is stored in **Vercel Blob**, not on local disk, because Vercel's serverless filesystem is ephemeral and read-only. This is configured with `@payloadcms/storage-vercel-blob` in `payload.config.ts`:

- The plugin is enabled whenever `BLOB_READ_WRITE_TOKEN` is present (Vercel deployments and local dev). Without it, Payload falls back to local-disk storage.
- The `Media` collection uses `disablePayloadAccessControl: true`, so files are served directly from the public Blob CDN URL (e.g. `https://<id>.public.blob.vercel-storage.com/...`) rather than through Payload's access-controlled `/api/media/file` route — required so images load for anonymous website visitors.

For local development, the `BLOB_READ_WRITE_TOKEN` is read from `apps/web/.env.local`. Create a Blob store and link it with `vercel blob create-store <name> --access public`, which adds the token to the Vercel project automatically.

If the collection is empty in a local database, restart `pnpm --filter @brankas/web dev` with `PAYLOAD_SEED_CONTENT=true`. The website sidebar can still show component links because sidebar navigation is stored separately in the `Site Navigation` global.

The `Site Navigation` global controls the website header and left documentation sidebar:

- Brand home link, brand name, and product name.
- Top navbar links.
- Sidebar section titles and sidebar links.

Edit it from `/admin/globals/site-navigation`.

The Storybook top-nav link is environment-aware. In development it points to `http://localhost:6006`. In production it points to `/storybook/` (set via `NEXT_PUBLIC_STORYBOOK_URL`); when that variable is unset, the link is hidden so visitors are never sent to an unreachable `localhost` address. This is resolved at render time (see `applyStorybookUrl` in `lib/site-navigation-data.ts`), so it overrides whatever URL is stored in the CMS. See [Storybook hosting](#storybook-hosting-multi-zone) for how `/storybook/` is served.

## Deployment

The `apps/web` website is deployed to Vercel and backed by a Neon (Postgres) database.

- Production: https://brankas-library.vercel.app
- Repository: https://github.com/alifhunter/brankas-library
- Pushes to `main` auto-deploy through the connected Vercel Git integration.

### Vercel project configuration

This is a pnpm + Turborepo monorepo, so three settings are required and must not be reverted:

1. **Root Directory** is set to `apps/web` in the Vercel project so Vercel installs at the pnpm workspace root and builds the web app.
2. **`turbo.json` `globalEnv`** lists every runtime variable (`DATABASE_URI`, `PAYLOAD_SECRET`, `PAYLOAD_SEED_*`, `BLOB_READ_WRITE_TOKEN`, `PAYLOAD_ALLOWED_ORIGINS`, `NEXT_PUBLIC_STORYBOOK_URL`, `STORYBOOK_ORIGIN`). Turbo strips environment variables from tasks unless they are declared here, which otherwise makes the Payload config throw at build time.
3. **`.vercelignore`** excludes `node_modules`, build caches, and the `apps/native-prototype/ios` and `android` folders (CocoaPods generates thousands of files) so CLI deploys stay under Vercel's file limit. All workspace `package.json` files are kept so `pnpm install --frozen-lockfile` succeeds.

### Production environment variables

Set these on the Vercel project (Production scope):

| Variable | Purpose |
| --- | --- |
| `DATABASE_URI` | Neon Postgres connection string (`...?sslmode=require`). |
| `PAYLOAD_SECRET` | Signs Payload auth tokens. Use a long random value. |
| `PAYLOAD_SEED_ADMIN` | `false` in production (the database is already seeded). |
| `PAYLOAD_SEED_CONTENT` | `false` in production. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for media uploads. Added automatically when the Blob store is linked to the project. |
| `PAYLOAD_ALLOWED_ORIGINS` | Must include the production origin (`https://brankas-library.vercel.app`) or `/admin` login fails the CSRF origin check. Add custom domains here too. |
| `NEXT_PUBLIC_STORYBOOK_URL` | Set to `/storybook/` in production so the nav link targets the proxied Storybook. When unset, the link points to `http://localhost:6006` in development and is hidden in production. |
| `STORYBOOK_ORIGIN` | Optional. Origin the `/storybook` rewrites proxy to. Defaults to `https://brankas-storybook.vercel.app`; override only if the Storybook project URL changes. |

### Database schema

Payload's Postgres adapter auto-pushes the schema only in development. The production database schema was created by running the dev server once against the Neon database, which pushes the schema and seeds the admin user and starter content. To re-initialize a fresh database:

```sh
# Point apps/web/.env.local DATABASE_URI at the target database, then:
pnpm --filter @brankas/web dev
# Visit http://localhost:3000 once to trigger schema push + seeding.
```

### Storybook hosting (multi-zone)

Storybook is hosted on the same domain at https://brankas-library.vercel.app/storybook using the Next.js multi-zone pattern. It is a **separate Vercel project** built from the same repository:

- Project: `brankas-storybook`
- Root Directory: `apps/storybook`
- Build command: `turbo run build --filter=@brankas/storybook` (builds the workspace packages first, then Storybook)
- Output directory: `storybook-static`
- It deploys from the same GitHub repo, so pushes to `main` rebuild it too.

The web app proxies it onto the main domain (see `apps/web/next.config.mjs` and `apps/web/src/middleware.ts`):

- `next.config.mjs` rewrites `/storybook/` and `/storybook/:path*` to `STORYBOOK_ORIGIN`, and sets `skipTrailingSlashRedirect: true`.
- `middleware.ts` redirects the bare `/storybook` to `/storybook/`.

The trailing slash matters: Storybook's manager HTML references its assets with relative URLs, so the document must be served at `/storybook/` for them to resolve under the prefix. A `redirects()` rule in `next.config` cannot add the slash because Next matches `/storybook` against `/storybook/` as well, which loops — hence the middleware.

To host Storybook on a plain subdomain instead, drop the rewrites/middleware and set `NEXT_PUBLIC_STORYBOOK_URL` to the Storybook project URL directly.

### Rotating secrets

Treat the `DATABASE_URI` password and `PAYLOAD_SECRET` as rotatable credentials.

**Rotate `PAYLOAD_SECRET`:**

1. Generate a strong value: `openssl rand -base64 32`.
2. Update it on Vercel: `vercel env rm PAYLOAD_SECRET production` then `vercel env add PAYLOAD_SECRET production` (paste the new value). Also update `apps/web/.env.local` for local dev.
3. Redeploy: `vercel deploy --prod` (or push to `main`).
4. Existing admin sessions are invalidated by the change; log in again at `/admin`.

**Rotate the Neon database password:**

1. In the Neon console, reset the role password (or create a new role) to get a new connection string.
2. Update `DATABASE_URI` on Vercel (`vercel env rm` / `vercel env add`, Production scope) and in `apps/web/.env.local`.
3. Redeploy and confirm `/admin` login still works.

After any rotation, verify production: load `https://brankas-library.vercel.app/` and sign in at `/admin`.

> Note: never commit real secrets. `apps/web/.env.local` is gitignored; only `.env.example` (placeholder values) is tracked.

## Contributing

When adding or changing library assets:

- Keep source tokens in DTCG-style JSON.
- Avoid introducing Tailwind-specific source files unless the project direction changes.
- Document component props, accessibility expectations, and usage examples.
- Record meaningful decisions in `CHECKPOINT.md`.
- Update `PLAN.md` when roadmap scope or sequencing changes.

## Maintenance

The library should be reviewed regularly for consistency, accessibility, visual regressions, outdated documentation, and package compatibility.
