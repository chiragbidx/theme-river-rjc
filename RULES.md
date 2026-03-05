# RULES.md — Change Boundaries & Placement

These guardrails keep auth-protected SaaS work contained and consistent.

## Routing & Placement
- Authenticated-user and SaaS feature changes **must live in** `app/(dashboard)/dashboard/` (pages, layouts, server components, server actions).
- Public/marketing changes belong in `app/(dashboard)/` (outside `dashboard/`).
- The main public landing page lives at `app/(dashboard)/page.tsx`; keep it non-authenticated.
- Auth flow changes (sign-in/up, account actions) stay in `app/(login)/` alongside their server actions.
- New feature surfaces go under `app/(dashboard)/<feature>/` and reuse the existing dashboard shell/layouts.
- All navigation and sidebar menu definitions live in `app/(dashboard)/dashboard/layout.tsx`; when adding a new authenticated dashboard page, wire its nav item there.

## Dashboard Page Pattern
- Use `app/(dashboard)/dashboard/general/page.tsx` as the reference layout for new authenticated pages (section padding, heading, Card wrapper, action form structure).
- Add the route folder under `app/(dashboard)/dashboard/` and register its nav item in `app/(dashboard)/dashboard/layout.tsx` in the same PR to avoid broken navigation.
- Keep pages server components by default; add `'use client'` only when hooks like `useActionState` or `useSWR` are needed.
- Preserve the sidebar shell and main content structure defined in `dashboard/layout.tsx`; do not reimplement sidebars per page.

## Backend & Data
- Reuse `lib/db/queries.ts` for data access; add new helpers there when needed instead of ad-hoc queries.
- Keep Stripe/billing logic in `lib/payments/*`; update both server actions and route handlers if you change billing flows.
- Do not edit Drizzle migration files directly; generate new ones when schema changes are required.

## Auth & Security
- Do not change session cookie semantics (`lib/auth/session.ts`, `middleware.ts`) without explicit approval.
- Guard mutations with `validatedAction*`/`withTeam`; avoid bypassing these wrappers.

## Infrastructure & Scripts
- Treat `scripts/` as immutable unless explicitly requested.
- Respect existing path structure and naming; avoid moving files across route groups without agreement.

## Coordination
- When touching shared UI primitives, keep changes backward compatible or update all consumers.
- For cross-cutting changes, document the affected routes and actions in your PR/commit notes.
- Avoid generating new `*.md` explainer files (README/INDEX/DEVNOTES/etc.) unless explicitly requested or absolutely necessary; prefer updating existing docs instead.
