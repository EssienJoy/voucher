// This file is never imported by a browser component directly — it's only
// used by other server-side files (data-service.ts, action.ts, auth.ts).
// That's what keeps BACKEND_URL out of the browser entirely: it's a plain
// env var (not NEXT_PUBLIC_), so Next.js never bakes it into client-side
// JavaScript. The browser only ever talks to YOUR Next.js app; it never
// sees the Express URL at all.
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_API_URL;

// -----------------------------------------------------------------------
// WHY THIS FUNCTION EXISTS
// -----------------------------------------------------------------------
// Every page/action that needs data from Express (get vouchers, create a
// voucher, etc.) runs as Server Component/Server Action code — meaning it
// executes on the Next.js server, not in the browser. When the Next.js
// server calls fetch() to reach Express, that is a totally separate
// request from whatever the browser originally sent to Next.js. The
// browser's cookies are NOT automatically attached to it — there is no
// "shared cookie jar" between a browser and a server-to-server fetch call.
//
// So: after login, the browser holds a "jwt" cookie for OUR Next.js app
// (see auth.ts for how that cookie gets set). Whenever a Server
// Component/Action needs to call Express, it has to manually:
//   1. Read that same "jwt" cookie off the incoming request (cookies()
//      gives us access to whatever cookies the browser just sent to
//      Next.js for this page load/action).
//   2. Attach it to the outgoing request to Express, as an
//      "Authorization: Bearer <token>" header — which is exactly what
//      the `protect` middleware in authController.ts already knows how
//      to check.
// This function does both of those steps, so every other file just calls
// apiFetch(path, options) instead of raw fetch() and gets this for free.
// -----------------------------------------------------------------------
export async function apiFetch(path: string, options: RequestInit = {}) {
	const cookieStore = await cookies();
	const token = cookieStore.get("jwt")?.value;

	const headers = new Headers(options.headers);
	if (!headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json");
	}
	if (token) headers.set("Authorization", `Bearer ${token}`);

	const response = await fetch(`${BACKEND_URL}${path}`, {
		...options,
		headers,
	});

	return response.json();
}
