# Code of Conduct

Live project state and work history. This file is the **graph**: it lets any
AI tool (or human) onboard by reading one file instead of the whole project.
It is the first thing a new session reads after
[AGENTS.md](AGENTS.md), and it is the record of everything that happened
before.

**Read it at session start. Update it before every commit.**

## 1. What this file is for

When work happens, this file is rewritten to reflect it. Every commit leaves
a trail here, so the project's history is always readable from a single
place. That means:

- A **new model** gets up to speed in seconds, not by scanning the repo.
- A **long pause** is not a problem; the state is on disk, not in a chat.
- **You** can see at a glance what the project is, what was decided, and where
  it stopped.

This file is the contract between every session. Keep it current or the next
session starts blind.

## 2. When and how to update

- **Before every commit.** The update happens before `git commit`, so the
  commit and the graph land together.
- **At session start**, read it and work from the state it describes.
- **Keep it short but complete.** Newest entries at the top of each log.
  One entry per commit, a few lines: what changed, why, what is next.

The update checklist before any commit:

1. Did the work change any files? Add the entry to the **work log**.
2. Did the work settle a rule? Add it to the **decisions log**.
3. Did the build state move? Update the **current build state**.
4. Does the file map need a new path? Update the map.

## 3. File and folder map

Where things live and what each file is for:

| Path                                                    | Role                                             |
| ------------------------------------------------------- | ------------------------------------------------ |
| [AGENTS.md](AGENTS.md)                                  | Rule hierarchy, domain map, non-negotiable rules |
| [README.md](README.md)                                  | User-facing explanation of the product           |
| [documentation.md](documentation.md)                    | Dev doc: structure, stack, dependencies          |
| [code_of_conduct.md](code_of_conduct.md)                | This file. State graph, work history             |
| [security.md](security.md)                              | Audit runbook + where the last audit stopped     |
| [skills/frontend-design.md](skills/frontend-design.md)  | Visual/UI authority                              |
| [skills/backend.md](skills/backend.md)                  | Server/data authority, free-tier-first           |
| `voucher_frontend/`                                     | App: Next.js 16, React 19, Tailwind 4, TS        |
| `voucher_backend/`                                      | API: Express 5, Mongoose, TS                     |

## 4. How this project runs

Principles that stay fixed:

- **AGENTS.md rules bind everything else.** Skills defer to it; it defers to
  them only inside their domain.
- **Design comes from the design skill**, never from default AI aesthetics.
  No purple gradients, no glassmorphism-by-default, no emojis as icons.
  The app in this repo was built with a glass-inspired system before the
  skill was written; where they conflict, flag it and settle per task.
- **Backend is free-tier-first.** Express 5 + Mongoose on a sleep/wake
  host (Render-class), MongoDB Atlas free tier. No paid compute. Reads and
  writes are designed to stay lean.
- **Shorter sessions beat exhaustive ones.** New models read the map above,
  not the entire repo. That is why this file exists.
- **No em dashes anywhere in this collection.** Short, concrete, opinionated.
- **Both apps are TypeScript**, verified with `npx tsc --noEmit` on each and
  `npx eslint` on the frontend after any change.

## 5. Current build state

What exists now (self-contained, dependencies available):

- Monorepo: `voucher_frontend` + `voucher_backend`, both TypeScript.
- **Frontend**: Next 16.3.1, React 19.2.8, Tailwind 4, lucide-react ^1.33.0.
  Route groups: `(account)` dashboard/profile/settings + voucher
  create/edit/verify, `(admin)` admin-dashboard/users/vouchers, `(auth)`
  login/signup/callback, `(info)` about/contact/privacy-terms, public
  `/redeem-voucher`. Design system: glass cards (`bg-white/70 backdrop-blur-sm
  rounded-2xl border border-black/5`), icon chips, status badges, shared
  `_components/`. Build verified: tsc + eslint clean.
- **Backend**: Express 5.2.1, Mongoose 9.9.5, TS. Controllers: auth,
  business, voucher, redemption, error. Models: business, voucher,
  redemption (with `redemption_email`/`redemption_phoneNumber`). Routes:
  business, voucher, redeem, publicApi. Auth: JWT + server-side Google OAuth,
  API-key middleware for public API. Build verified: tsc clean.
- **Deploy**: frontend at `voucherly-three.vercel.app`, backend on Render.
- **Blocked (user-side)**: production Google OAuth config - add
  `https://voucherly-three.vercel.app/auth/callback` redirect URI, drop the
  stale render URI, align Vercel + backend `GOOGLE_REDIRECT_URI`, confirm
  Client ID, publish consent screen.

## 6. Work log

Newest entry at the top. One entry per commit, a few lines.

- **2026-09-16**: added the instruction collection (root `AGENTS.md` rule
  hierarchy, `skills/` backend + frontend-design, `code_of_conduct.md`,
  `documentation.md`, `security.md`). Rewrote `code_of_conduct.md` state to
  match the real project (monorepo, TS, glass design system, current build
  state, blocked Google OAuth config). Rewrote `documentation.md` to describe
  the actual stack and added section 4.3 documenting the redemption flow and
  the external-systems API (API-key auth, verify/redeem endpoints, redemption
  rules). Documented that API in README.md under "Redemption API for external
  systems" and removed stale "verify/redeem disabled" notes.
- **2026-09-16**: capture customer details on redeem (name, email, phone;
  email or phone required) across backend model/service/controller and the
  frontend redeem form; polish account, info, auth, admin pages and mobile
  nav; mobile-only back arrows on create/edit/verify voucher; hamburger menu
  on profile; redesigned error page. Committed `8d4f8e5`.
- **2026-09-16**: restyled dashboard and sidebar; moved API key section to
  settings. Committed `5da4638`. Landing hero redesign was `950e4a9`.
- **2026-08-17**: rewrote this file as the state graph with links to every
  other file. Added the commit-time update rule (update before `git commit`,
  four-point checklist). Added "Expected output" contract to security.md and
  the exact audit prompt. Expanded documentation.md with the Next.js case
  study, full app tree, auth context, navigation, API contract, and the
  "setup the app" prompt. lib/ trimmed to firebase.js, auth.js, models/.
- **2026-08-17**: created the guidance collection. Added security.md and wired
  the "update code_of_conduct.md before every commit" rule into AGENTS.md.
  Skills moved to `skills/`. Backend skill rewritten free-tier-first (no Cloud
  Functions, quota-aware read/write design). AGENTS.md links both skills.
- **2026-08-17**: wrote AGENTS.md code of conduct, README, documentation.md,
  and this file. Created frontend-design and backend skills in `skills/`.

## 7. Decisions log

Rules that were decided once and should not be re-litigated:

- Skills live in `skills/`, not `.ai/skills`.
- Backend targets free tiers: Express 5 + Mongoose on a sleep/wake host,
  no paid compute.
- Frontend design is industry-derived; AI aesthetics are forbidden.
- Apps are TypeScript (frontend AND backend), each checked with
  `npx tsc --noEmit`; frontend additionally with `npx eslint`.
- `code_of_conduct.md` is updated before every commit, not after.
- The audit prompt and expected output live in security.md; an audit updates
  its state so the next audit resumes where the last one stopped.
- The app was restyled with a glass-inspired design system before
  `frontend-design.md` forbade glassmorphism-by-default; the skill is
  authority going forward, conflicts are flagged per task.