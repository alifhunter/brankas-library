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

## Planned Repository Structure

```text
.
├── apps/
│   ├── web/
│   └── storybook/
├── packages/
│   ├── tokens/
│   ├── react/
│   ├── patterns/
│   └── config/
├── README.md
├── PLAN.md
└── CHECKPOINT.md
```

## Token Source Structure

Canonical token files should live in separate files by layer and category or component:

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
3. Build the React component package.
4. Build patterns and usage guidelines.
5. Build the live preview and playground website using the library.
6. Add Payload CMS for articles, releases, and long-form guidance.

## Package Consumption

The intended package outputs are:

- `@brankas/tokens` for token CSS variables and TypeScript exports
- `@brankas/react` for React components, with explicit desktop, mobile, and shared entrypoints
- `@brankas/patterns` for reusable layouts and product patterns, with explicit desktop and future mobile entrypoints

Preferred component imports:

```ts
import { Button } from '@brankas/react/desktop';
import { Button as MobileButton } from '@brankas/react/mobile';
import { VisuallyHidden } from '@brankas/react/shared';
import { PageHeader } from '@brankas/patterns/desktop';
```

Exact package names can be adjusted when publishing details are finalized.

## Current Desktop Components

The desktop entrypoint currently includes foundational components for disclosure, identity, feedback, selection, navigation, upload, progress states, search, sidebars, menus, form fields, tables, loading states, toasts, and tooltips. Current components are implemented from the provided Figma node context and exposed from `@brankas/react/desktop`.

## Current Desktop Patterns

The desktop patterns entrypoint currently includes starter product patterns for page headers, filter toolbars, form sections, empty list states, and detail panels. Patterns compose `@brankas/react/desktop` components and shared token helpers; they should not introduce a parallel styling system.

## Current Preview Website

The Next.js app in `apps/web` now renders a live preview and playground website. It imports token CSS variables from `@brankas/tokens/tokens.css`, previews desktop components from `@brankas/react/desktop`, composes patterns from `@brankas/patterns/desktop`, and includes interactive controls for common component variants.

Current website routes:

- `/`: landing preview with foundation, component, pattern, playground, and changelog sections.
- `/components/[slug]`: starter component detail pages with package-backed live previews.
- `/tokens`: CMS-backed token reference page with CSS variable and TypeScript export examples.
- `/patterns`: CMS-backed pattern guidance page with package-backed examples and usage notes.
- `/change-log`: CMS-backed changelog page.

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

The `Component Pages` collection controls editable component detail pages at `/components/[slug]`. Payload owns page copy and metadata such as description, import name, anatomy, usage, and accessibility notes. Live previews remain package-backed from `@brankas/react/desktop`.

If the collection is empty in a local database, restart `pnpm --filter @brankas/web dev` with `PAYLOAD_SEED_CONTENT=true`. The website sidebar can still show component links because sidebar navigation is stored separately in the `Site Navigation` global.

The `Site Navigation` global controls the website header and left documentation sidebar:

- Brand home link, brand name, and product name.
- Top navbar links.
- Sidebar section titles and sidebar links.

Edit it from `/admin/globals/site-navigation`.

The Storybook top-nav link is environment-aware. In development it points to `http://localhost:6006`. In production it uses `NEXT_PUBLIC_STORYBOOK_URL` if set; when that variable is unset, the link is hidden so visitors are never sent to an unreachable `localhost` address. This is resolved at render time (see `applyStorybookUrl` in `lib/site-navigation-data.ts`), so it overrides whatever URL is stored in the CMS.

## Deployment

The `apps/web` website is deployed to Vercel and backed by a Neon (Postgres) database.

- Production: https://brankas-library.vercel.app
- Repository: https://github.com/alifhunter/brankas-library
- Pushes to `main` auto-deploy through the connected Vercel Git integration.

### Vercel project configuration

This is a pnpm + Turborepo monorepo, so three settings are required and must not be reverted:

1. **Root Directory** is set to `apps/web` in the Vercel project so Vercel installs at the pnpm workspace root and builds the web app.
2. **`turbo.json` `globalEnv`** lists every runtime variable (`DATABASE_URI`, `PAYLOAD_SECRET`, `PAYLOAD_SEED_*`, `PAYLOAD_ALLOWED_ORIGINS`, `NEXT_PUBLIC_STORYBOOK_URL`). Turbo strips environment variables from tasks unless they are declared here, which otherwise makes the Payload config throw at build time.
3. **`.vercelignore`** excludes `node_modules`, build caches, and the `apps/native-prototype/ios` and `android` folders (CocoaPods generates thousands of files) so CLI deploys stay under Vercel's file limit. All workspace `package.json` files are kept so `pnpm install --frozen-lockfile` succeeds.

### Production environment variables

Set these on the Vercel project (Production scope):

| Variable | Purpose |
| --- | --- |
| `DATABASE_URI` | Neon Postgres connection string (`...?sslmode=require`). |
| `PAYLOAD_SECRET` | Signs Payload auth tokens. Use a long random value. |
| `PAYLOAD_SEED_ADMIN` | `false` in production (the database is already seeded). |
| `PAYLOAD_SEED_CONTENT` | `false` in production. |
| `PAYLOAD_ALLOWED_ORIGINS` | Must include the production origin (`https://brankas-library.vercel.app`) or `/admin` login fails the CSRF origin check. Add custom domains here too. |
| `NEXT_PUBLIC_STORYBOOK_URL` | Optional. Hosted Storybook URL. When unset, the Storybook nav link points to `http://localhost:6006` in development and is hidden in production. |

### Database schema

Payload's Postgres adapter auto-pushes the schema only in development. The production database schema was created by running the dev server once against the Neon database, which pushes the schema and seeds the admin user and starter content. To re-initialize a fresh database:

```sh
# Point apps/web/.env.local DATABASE_URI at the target database, then:
pnpm --filter @brankas/web dev
# Visit http://localhost:3000 once to trigger schema push + seeding.
```

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
