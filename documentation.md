# Project Documentation

Developer-facing reference for **Voucherly**: structure, stack, dependencies,
and how the files relate. If you are an AI or a developer joining this
project, this is the map. For project state and decisions, read
[code_of_conduct.md](code_of_conduct.md).

## 1. Purpose

This repo is a two-app monorepo plus an instruction collection. The
instruction files encode rules, taste, and state so an AI does not have to
re-derive them from the whole codebase or from chat history. Voucherly is a
digital discount voucher app: businesses create vouchers, share the code with
customers, and anyone can verify + redeem that code at the point of sale.

## 2. The collection structure

```
voucher/
├── AGENTS.md                  index and rule hierarchy
├── README.md                  user-facing overview
├── documentation.md           this file, developer context
├── code_of_conduct.md         live project state, updated before each commit
├── security.md                audit runbook and audit state
├── skills/
│   ├── frontend-design.md     visual/UI authority
│   └── backend.md             server/data authority, free-tier-first
├── voucher_frontend/          Next.js 16 app (UI, auth cookies, server actions)
└── voucher_backend/           Express + MongoDB API (auth, business + voucher data)
```

Roles:

- **AGENTS.md** is the single source of truth for agent behavior. It defines
  the instruction hierarchy, the domain authority map, and the non-negotiable
  rules. New skills are registered here.
- **code_of_conduct.md** is the state graph. An AI serializes what changed and
  what was decided before every commit, so a fresh session resumes cleanly.
- **security.md** defines audits (SEO, vulnerabilities, quota) and records
  where the last audit stopped.
- **skills/** holds one prescriptive file per domain. Each is a decision
  engine, not a suggestion list.
- **voucher_frontend/** and **voucher_backend/** are the two deployable apps,
  run and deployed independently with their own `package.json` and env files.

## 3. Stack

Both apps are **TypeScript**, checked with `npx tsc --noEmit`; the frontend
additionally with `npx eslint`.

**Frontend** (`voucher_frontend/`): Next.js 16 (App Router, Server Actions),
React 19, Tailwind CSS 4, TypeScript, lucide-react for icons.

**Backend** (`voucher_backend/`): Express 5, Mongoose/MongoDB, jsonwebtoken +
bcryptjs for auth, helmet / cors / express-rate-limit / compression for
hardening, TypeScript.

> The frontend runs a pre-release Next.js version with breaking API changes.
> Read the `next` package docs under `node_modules/next/dist/docs/` before
> touching framework-level code.

## 4. Architecture

The browser only ever talks to the Next.js app; Next.js talks to Express on
the browser's behalf:

```
Browser → Next.js (voucher_frontend) → Express API (voucher_backend) → MongoDB
```

- **Auth is JWT-based.** Express issues a JWT on sign-up/login. Next.js server
  actions ([app/\_lib/api/auth.ts](voucher_frontend/app/_lib/api/auth.ts)) set
  it as an `httpOnly` `jwt` cookie on the Next.js domain; `BACKEND_API_URL`
  never reaches client-side JS. Google OAuth uses a server-side flow via
  `/auth/callback`.
- **Server-side calls to Express** go through
  [apiFetch](voucher_frontend/app/_lib/api/http.ts), which forwards the `jwt`
  cookie as `Authorization: Bearer <token>`; Express's `protect` middleware
  checks it on every business/voucher route.
- **Next.js route protection** lives in [proxy.ts](voucher_frontend/proxy.ts)
  and [app/\_lib/auth.ts](voucher_frontend/app/_lib/auth.ts): any path not in
  the public list redirects to `/login` without a `jwt` cookie.
- **Public redeem** posts through the [redeemVoucherPublic] server action to
  `redeem/redeem-voucher/:code`, capturing optional name plus required email or
  phone as customer details.

### 4.1 Frontend structure

```
voucher_frontend/app/
├── _components/                 shared UI: glass cards, headers, forms, nav
├── _lib/api/                    auth.ts, action.ts (server actions),
│                                data-service.ts,http.ts (apiFetch)
├── _lib/                        types, constants, validation
├── (account)/                   protected: dashboard, profile, settings,
│                                voucher/ (create, edit, verify, list)
├── (admin)/                     admin-dashboard, admin-users, admin-vouchers
├── (auth)/                      login, signup, auth/callback
├── (info)/                      about, contact, privacy-terms
├── redeem-voucher/              public verify + redeem page
├── layout.tsx, page.tsx         landing + shell
├── error.tsx, not-found.tsx
├── index.d.ts                   shared types (Voucher, voucher.status)
└── globals.css                  Tailwind 4 tokens (primary, glass, text-*)
```

Navigation: desktop `SideBar`; mobile `MobileHeader` + `MobileFooter` with the
same item list; a `ProfileMenu` hamburger on the profile page.

### 4.2 Backend structure

```
voucher_backend/src/
├── config/env.ts                env validation
├── controller/                  auth, business, voucher, redemption, error
├── middleware/apiKeyAuth.ts     API-key guard for the public API
├── model/                       business, voucher, redemption
├── routes/                      business, voucher, redeem, publicApi
├── types/express.d.ts           Request/User types
├── utils/                       apiFeatures (filter/paginate), apiKey,
│                                appError, redemptionService
├── app.ts, server.ts
```

Public routes: `POST /api/v1/user/sign-up`, `/user/login`, `/user/logout`,
`/api/v1/redeem/redeem-voucher/:code`. All business/voucher routes sit behind
`protect`; admin-only actions are gated with `restrictTo`. The public API
(external systems) is gated by API keys from `utils/apiKey.ts` and
`middleware/apiKeyAuth.ts`.

### 4.3 Redemption and the external-systems API

Two ways to hit the redemption flow, both on Express:

**Web redeem (business-owned + public page)** — mounted at `/api/v1/redeem`:

| Method | Path                     | Auth                                    | Purpose                              |
| ------ | ------------------------ | --------------------------------------- | ------------------------------------ |
| GET    | `/verify-voucher/:code`  | optional `protect` (JWT)                | Look up a code, scoped to business   |
| POST   | `/redeem-voucher/:code`  | optional `protect` (JWT)                | Redeem a code, record a Redemption   |

When a JWT is present, the voucher must belong to that business. Without one
the lookup is global (used by the public `/redeem-voucher` page, whose server
action [redeemVoucherPublic] posts to `redeem/redeem-voucher/:code`).

**External systems API** — mounted at `/api/v1/public`:

| Method | Path                    | Auth                                   | Purpose                              |
| ------ | ----------------------- | -------------------------------------- | ------------------------------------ |
| GET    | `/vouchers/verify/:code` | `apiKeyAuth` (`Authorization: Bearer`) | Look up a code for any business, unscoped |
| POST   | `/vouchers/redeem/:code` | `apiKeyAuth` (`Authorization: Bearer`) | Redeem a code for any business, unscoped |

- **Key management**: keys come from `generateApiKey()` in
  [utils/apiKey.ts](voucher_backend/src/utils/apiKey.ts) — 32 random bytes as
  hex, only the `sha256` hash (`apiKeyHash`) is stored on the `Business` doc,
  the raw key is shown once. Regenerate via protected
  `POST /api/v1/user/me/api-key`. Send requests with
  `Authorization: Bearer <key>`; `apiKeyAuth` hashes the header and matches it
  against a business.
- **Redemption logic** lives in
  [utils/redemptionService.ts](voucher_backend/src/utils/redemptionService.ts):
  `verifyVoucherByCode` lowercases the code, auto-flips a past-expiry voucher to
  `expired`, and rejects expired codes and codes past `usage_limit`;
  `redeemVoucherByCode` bumps `redemption_count` via `updateRedemptionCount()`
  and writes a `Redemption` doc (`voucher_id`, `business_id`, `redeemed_by`,
  `redemption_email`, `redemption_phoneNumber`).
- **Request body for redeem**: `redeemed_by` (string, falls back to
  `business_name`/`email`), `redemption_email`, `redemption_phoneNumber`
  (all optional; the frontend form enforces email or phone).
- Rate limit: 1000 req/hr per IP across `/api` (see
  [app.ts](voucher_backend/src/app.ts)).

## 5. Design and backend rules

- Every visual decision follows [skills/frontend-design.md](skills/frontend-design.md):
  industry-derived, no default AI aesthetics, no em-dash marketing copy. The
  app's current visual system is glass-inspired: `bg-white/70 backdrop-blur-sm
  rounded-2xl border border-black/5`, icon chips, status badges. The skill
  predates the ban on glassmorphism-by-default; conflicts are flagged per task.
- Every server/data decision follows [skills/backend.md](skills/backend.md):
  free-tier-first, no serverless compute for the API, lean reads/writes.

## 6. Working rules

- Read **AGENTS.md** first, then the domain skill(s) for the task, then
  **code_of_conduct.md** for current state.
- Before a commit: update **code_of_conduct.md** with what changed and any
  decisions made. Keep entries short.
- On an audit request: follow **security.md**, then update its state section.
- Add new domains as `skills/<domain>.md` and register them in AGENTS.md.
- Run `npx tsc --noEmit` in the touched app (and `npx eslint` on the frontend)
  after any change, and report the result.
- No em dashes in any file in this collection. Write short, concrete,
  opinionated sentences.