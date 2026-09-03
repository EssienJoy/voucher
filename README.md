# Voucherly

Digital discount vouchers for small businesses — create them, share a code with customers, and verify + redeem that code at the point of sale.

Voucherly is a Next.js 16 / Supabase app built for businesses that hand out promo codes ("10% off your first order", "₦5,000 off orders over ₦10,000", etc.) and need a simple way to make sure a code is real, still active, and hasn't been used more times than allowed — without a spreadsheet.

## What it does

- **Create & manage vouchers** — a title, a redeemable code, an optional description, a discount that's either a percentage or a fixed amount, an optional minimum purchase and max discount cap, a usage limit, and an expiry date.
- **Verify & redeem, publicly** — anyone with a code (a customer, or staff at checkout) can look it up at `/redeem-voucher` to confirm it's still valid, then redeem it in one click.
- **Enforced redemption limits** — every redemption is recorded server-side, so a voucher can't be redeemed past its `usage_limit` or after its `expiry_date`, no matter what the client sends.
- **Per-business dashboard** — at-a-glance stats (total / active / expired vouchers) plus a feed of recent voucher activity.
- **Multi-tenant by account** — sign up with email/password (Supabase Auth) and each account gets its own `business` record; you only ever see your own vouchers.
- **Admin overview scaffold** — `/admin/dashboard` is a first pass at a platform-wide view (currently mock data — see [Roadmap](#roadmap)).

## Usage

The whole flow is: **create a voucher → share the code → someone verifies and redeems it.**

**1. Create a voucher** (from `/voucher/create-voucher`, authenticated) — via [VoucherForm.tsx](app/_components/VoucherForm.tsx), which calls [`createVoucher`](app/_lib/api/action.ts):

| Field | Example |
| --- | --- |
| Title | `Welcome Discount` |
| Code | `WELCOME10` |
| Discount type / value | `percentage` / `10` |
| Min. purchase | `10000` *(optional)* |
| Max. discount | `5000` *(optional)* |
| Expiry date | `2026-12-31` |
| Usage limit | `100` *(optional)* |

**2. Share the code** — `WELCOME10`, however you like (receipt, SMS, social post).

**3. Verify it** — anyone visits `/redeem-voucher`, enters the code, and [`getVoucherByCode`](app/_lib/api/action.ts) looks it up:

```jsonc
// state.data returned to VerifyVoucher.tsx
{
  "code": "welcome10",
  "status": "active",
  "expiry_date": "2026-12-31",
  "discount_type": "percentage",
  "discount_value": 10,
  "id": 42,
  "business_id": "8f1b6c2e-2f3a-4a11-9d7e-6b1c2d3e4f5a"
}
```

If the code doesn't exist or has expired, `error` is set instead (e.g. `"Voucher code does not exist."`) and nothing is redeemed.

**4. Redeem it** — clicking **Redeem Voucher** on the result card calls [`redeemVoucher`](app/_lib/api/action.ts), which re-checks the expiry and usage limit, inserts a row into `redemption`, and returns:

```json
{ "error": null, "success": "Voucher redeemed successfully.", "data": null }
```

For the full create/edit/delete flow (including validation and the Supabase queries behind it), see [app/_lib/api/action.ts](app/_lib/api/action.ts) and [app/_lib/api/data-service.ts](app/_lib/api/data-service.ts).

### Site map

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Landing page |
| `/login`, `/signup` | Public | Email/password auth |
| `/dashboard` | Account | Voucher stats + recent activity |
| `/voucher` | Account | List all vouchers for the business |
| `/voucher/create-voucher` | Account | Create a voucher |
| `/voucher/edit-voucher/[voucherId]` | Account | Edit a voucher |
| `/profile` | Account | Business profile (read-only) |
| `/redeem-voucher` | Public | Verify & redeem a voucher code |
| `/about`, `/contact`, `/privacy-terms` | Public | Info pages |
| `/admin/dashboard` | — | Platform-wide overview (UI scaffold, mock data for now) |

Route access is enforced in [app/_lib/supabase/proxy.ts](app/_lib/supabase/proxy.ts) (Next 16's replacement for `middleware.ts`): anything not in the public path list redirects to `/login`.

## Tech stack

[Next.js 16](https://nextjs.org) (App Router, Server Actions) · [React 19](https://react.dev) · [Supabase](https://supabase.com) (`@supabase/ssr` + `@supabase/supabase-js`) · [Tailwind CSS 4](https://tailwindcss.com) · TypeScript · [lucide-react](https://lucide.dev)

> This repo runs a pre-release Next.js version with API changes beyond the public docs — see [AGENTS.md](AGENTS.md) before touching framework-level code.

## Getting started

**Prerequisites:** Node 20+ and a [Supabase](https://supabase.com) project with `business`, `voucher`, and `redemption` tables matching the shapes in [app/index.d.ts](app/index.d.ts) (there's no migrations folder in this repo yet — schema currently lives only in Supabase).

```bash
git clone https://github.com/EssienJoy/voucher.git
cd voucher
npm install
```

Create `.env.local` with your Supabase project's API credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up at `/signup` to create a business account, then create your first voucher from the dashboard.

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Support

For bugs or questions, open an issue on the [GitHub issue tracker](https://github.com/EssienJoy/voucher/issues).

## Roadmap

- Wire up `/admin/dashboard` to real platform data (currently static/mock numbers)
- Finish "Continue with Google" sign-in (the button exists in the UI but isn't wired up yet)
- Voucher analytics / redemption history per voucher
- Checked-in schema (SQL migrations) instead of manually-configured Supabase tables
- Email or SMS notification when a voucher is redeemed

## Contributing

Contributions are welcome via pull request. To get set up:

1. Fork and clone the repo
2. `npm install`
3. Set up `.env.local` as described in [Getting started](#getting-started)
4. `npm run dev` to run locally, `npm run lint` before opening a PR

There's no automated test suite yet, so manually verify the create → verify → redeem flow for any change that touches vouchers. Keep commit messages short and descriptive of the change.

## Authors and acknowledgment

Built and maintained by [EssienJoy](https://github.com/EssienJoy).

## License

No license has been chosen for this project yet. All rights reserved until one is added.

## Project status

Actively developed — the core create / share / verify / redeem flow is working. The admin panel and Google sign-in are in-progress scaffolding (see [Roadmap](#roadmap)).
