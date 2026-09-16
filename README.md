# Voucherly

Digital discount vouchers for small businesses — create them, share a code with customers, and verify + redeem that code at the point of sale.

Voucherly is a two-app monorepo: a [Next.js 16](https://nextjs.org) frontend and an [Express](https://expressjs.com) + [MongoDB](https://www.mongodb.com) backend. It's built for businesses that hand out promo codes ("10% off your first order", "₦5,000 off orders over ₦10,000", etc.) and need a simple way to make sure a code is real, still active, and hasn't been used more times than allowed — without a spreadsheet.

## Repo layout

```
voucher/
├── voucher_frontend/   Next.js 16 app (UI, auth cookies, server actions)
└── voucher_backend/    Express + MongoDB API (auth, business + voucher data)
```

Each app has its own `package.json`, `node_modules`, and env file — they're run and deployed independently.

## Architecture

The browser only ever talks to the Next.js app; Next.js talks to Express on the browser's behalf:

```
Browser → Next.js (voucher_frontend) → Express API (voucher_backend) → MongoDB
```

- **Auth is JWT-based.** Express issues a JWT on sign-up/login, in the JSON response body. Next.js server actions ([app/\_lib/api/auth.ts](voucher_frontend/app/_lib/api/auth.ts)) grab that token and set it as their own `httpOnly` `jwt` cookie on the browser's Next.js domain — the browser never talks to Express directly, so `BACKEND_API_URL` never reaches client-side JS.
- **Every server-side call to Express** goes through [`apiFetch`](voucher_frontend/app/_lib/api/http.ts), which reads that same `jwt` cookie and forwards it as `Authorization: Bearer <token>` — this is what Express's `protect` middleware checks on every business/voucher route.
- **Route protection on the Next.js side** is enforced in [proxy.ts](voucher_frontend/proxy.ts) / [app/\_lib/auth.ts](voucher_frontend/app/_lib/auth.ts) (Next 16's replacement for `middleware.ts`): any path not in the public list redirects to `/login` if there's no `jwt` cookie.

> **Migration in progress:** this app originally ran on Supabase directly from Next.js. Auth and the authenticated voucher CRUD flow (create/edit/list/delete, business profile) have been migrated to the Express/MongoDB backend. The **public verify & redeem flow** (`/redeem-voucher`) hasn't been ported yet — its UI (`VerifyVoucher`) is currently commented out in [app/redeem-voucher/page.tsx](voucher_frontend/app/redeem-voucher/page.tsx) pending an equivalent public "look up voucher by code" endpoint on the Express side. The frontend's `@supabase/*` packages are still installed but no longer used by any app code — see [Roadmap](#roadmap).

## What it does

- **Create & manage vouchers** — a title, a redeemable code, an optional description, a discount that's either a percentage or a fixed amount, an optional minimum purchase and max discount cap, a usage limit, and an expiry date.
- **Enforced redemption limits** — redemptions are recorded server-side (`Redemption` model) against a voucher's `usage_limit` and `expiry_date`.
- **Per-business dashboard** — at-a-glance stats (total / active / expired vouchers) plus a feed of recent voucher activity.
- **Multi-tenant by account** — sign up with email/password, JWT-authenticated; each account is a `Business` document and only ever sees its own vouchers.
- **Roles** — every business has a `role` of `user` or `admin`; admin-only actions are gated with Express's `restrictTo` middleware.
- **Admin overview scaffold** — `/admin/dashboard` is a first pass at a platform-wide view (currently mock data — see [Roadmap](#roadmap)).
- **Verify & redeem a code publicly** — `/redeem-voucher` is the intended public page for anyone to check a code and redeem it; currently disabled pending backend support (see [Migration in progress](#architecture) above).

### Site map (frontend)

| Route                                  | Access  | Purpose                                                             |
| -------------------------------------- | ------- | ------------------------------------------------------------------- |
| `/`                                    | Public  | Landing page                                                        |
| `/login`, `/signup`                    | Public  | Email/password auth                                                 |
| `/dashboard`                           | Account | Voucher stats + recent activity                                     |
| `/voucher`                             | Account | List all vouchers for the business                                  |
| `/voucher/create-voucher`              | Account | Create a voucher                                                    |
| `/voucher/edit-voucher/[voucherId]`    | Account | Edit a voucher                                                      |
| `/profile`                             | Account | Business profile                                                    |
| `/redeem-voucher`                      | Public  | Verify & redeem a voucher code — _UI currently disabled, see above_ |
| `/about`, `/contact`, `/privacy-terms` | Public  | Info pages                                                          |
| `/admin/dashboard`                     | —       | Platform-wide overview (UI scaffold, mock data for now)             |

### API (backend)

Base path: `/api/v1`. All routes below `businessRouter.use(protect)` / `voucherRouter.use(protect)` require a valid JWT (cookie or `Authorization: Bearer` header).

| Method | Path            | Auth                   | Purpose                                                |
| ------ | --------------- | ---------------------- | ------------------------------------------------------ |
| POST   | `/user/sign-up` | Public                 | Create a business account, returns a JWT               |
| POST   | `/user/login`   | Public                 | Log in, returns a JWT                                  |
| POST   | `/user/logout`  | Public                 | Clear the server-side cookie                           |
| GET    | `/user`         | Protected              | List all businesses (admin-facing)                     |
| GET    | `/user/me`      | Protected              | Current business's profile                             |
| PATCH  | `/user/me`      | Protected, `user` role | Update `business_name`                                 |
| POST   | `/voucher`      | Protected              | Create a voucher for the current business              |
| GET    | `/voucher`      | Protected              | List the current business's vouchers                   |
| PATCH  | `/voucher/:id`  | Protected              | Update a voucher (must belong to the current business) |
| DELETE | `/voucher/:id`  | Protected              | Delete a voucher (must belong to the current business) |

There's no public "look up voucher by code" route yet — that's the missing piece behind `/redeem-voucher` (see [Roadmap](#roadmap)).

## Tech stack

**Frontend** ([voucher_frontend/](voucher_frontend)) — [Next.js 16](https://nextjs.org) (App Router, Server Actions) · [React 19](https://react.dev) · [Tailwind CSS 4](https://tailwindcss.com) · TypeScript · [lucide-react](https://lucide.dev)

**Backend** ([voucher_backend/](voucher_backend)) — [Express 5](https://expressjs.com) · [Mongoose](https://mongoosejs.com)/MongoDB · [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for auth · [helmet](https://helmetjs.github.io), [cors](https://github.com/expressjs/cors), [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit), [compression](https://github.com/expressjs/compression) for hardening · TypeScript

> The frontend runs a pre-release Next.js version with API changes beyond the public docs — see [voucher_frontend/AGENTS.md](voucher_frontend/AGENTS.md) before touching framework-level code.

## Getting started

**Prerequisites:** Node 20+ and a MongoDB database (local or [Atlas](https://www.mongodb.com/atlas)).

```bash
git clone https://github.com/EssienJoy/voucher.git
cd voucher
```

### 1. Backend

```bash
cd voucher_backend
npm install
```

Create `.env.local` (values are yours — do not commit this file):

```bash
DATABASE_URI=mongodb+srv://<username>:<PASSWORD>@your-cluster.mongodb.net/voucherly
DATABASE_PASSWORD=your-db-password
JWT_SECRET=a-long-random-string
JWT_EXPIRES=90d
JWT_COOKIE_EXPIRES_IN=90
PORT=3001
```

`DATABASE_URI` should contain the literal placeholder `<PASSWORD>` — it's substituted at runtime with `DATABASE_PASSWORD` (see [src/server.ts](voucher_backend/src/server.ts)).

```bash
npm run dev
```

The API starts on `http://localhost:3001` (or your `PORT`), mounted under `/api/v1`.

### 2. Frontend

```bash
cd voucher_frontend
npm install
```

Create `.env.local`:

```bash
BACKEND_API_URL=http://localhost:3001/api/v1/
```

Keep the trailing slash — the frontend builds request URLs by concatenating this with paths like `voucher` and `user/login` (see [app/\_lib/api/http.ts](voucher_frontend/app/_lib/api/http.ts)).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up at `/signup` to create a business account, then create your first voucher from the dashboard.

### Scripts

Both apps expose the same script names:

| Script          | Frontend     | Backend                            |
| --------------- | ------------ | ---------------------------------- |
| `npm run dev`   | `next dev`   | `tsx watch src/server.ts`          |
| `npm run build` | `next build` | `tsc` (compiles `src/` → `dist/`)  |
| `npm run start` | `next start` | runs the compiled `dist/server.js` |
| `npm run lint`  | `eslint`     | —                                  |

## Deployment

- **Frontend** deploys cleanly to [Vercel](https://vercel.com) as a standard Next.js app. Set `BACKEND_API_URL` (pointing at the deployed backend, with trailing slash) as a Vercel environment variable — not `NEXT_PUBLIC_`, since it must stay server-only.
- **Backend** is a plain long-running Express server (`app.listen(...)` in [src/server.ts](voucher_backend/src/server.ts)) — it does **not** run on Vercel's serverless model. Deploy it to a host built for persistent Node processes instead (e.g. [Render](https://render.com), [Railway](https://railway.app), [Fly.io](https://fly.io)). On a generic Node host, set:
  - **Build Command:** `npm install && npm run build`
  - **Start Command:** `npm run start`
  - Environment variables: `DATABASE_URI`, `DATABASE_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRES`, `JWT_COOKIE_EXPIRES_IN`, `PORT`, `NODE_ENV=production`.

## Roadmap

- Add a public "look up voucher by code" endpoint on the backend and re-enable `VerifyVoucher` on `/redeem-voucher`
- Remove the unused `@supabase/ssr` / `@supabase/supabase-js` packages from the frontend now that auth and voucher CRUD are fully on the Express/MongoDB backend
- Wire up `/admin/dashboard` to real platform data (currently static/mock numbers)
- Finish "Continue with Google" sign-in (the button exists in the UI, and `Business` already has `provider_type`/`providers` fields, but it isn't wired up yet)
- Voucher analytics / redemption history per voucher
- Checked-in schema/migrations for MongoDB instead of implicit Mongoose schemas
- Email or SMS notification when a voucher is redeemed
- Automated test suite for both apps

## Contributing

Contributions are welcome via pull request. To get set up, follow [Getting started](#getting-started) for both apps.

There's no automated test suite yet, so manually verify the affected flow for any change — especially auth (sign-up/login/logout) and voucher create/edit/delete, since those cross the frontend/backend boundary. Keep commit messages short and descriptive of the change.

## Authors and acknowledgment

Built and maintained by [EssienJoy](https://github.com/EssienJoy).

## License

No license has been chosen for this project yet. All rights reserved until one is added.

## Project status

Actively developed, mid-migration from Supabase to a custom Express/MongoDB backend. Auth and the authenticated voucher CRUD flow work end-to-end; the public verify/redeem flow, the admin panel, and Google sign-in are in-progress (see [Roadmap](#roadmap)).

## Implimentation for redemption api for external systems
