"use server";

// -----------------------------------------------------------------------
// WHY THIS FILE HAS "use server" AGAIN, AND HOW THE COOKIE ACTUALLY GETS
// TO THE BROWSER THIS TIME
// -----------------------------------------------------------------------
// "use server" makes every exported function here a Server Action: even
// though LoginForm.tsx (a browser component) calls login(), the CODE
// itself runs on the Next.js server, not in the browser. That's exactly
// what you want when you don't want the browser to know your Express
// backend's URL at all — the browser never makes a request to Express
// directly, only to your own Next.js app.
//
// The tricky part (this is what broke before): when this Next.js server
// calls fetch() to reach Express, Express's `Set-Cookie: jwt=...` header
// comes back to the NEXT.JS SERVER, not to the browser. That's a
// completely separate HTTP exchange from the one between the browser and
// Next.js. If we do nothing else, that cookie just evaporates — the
// browser never even knows it was offered.
//
// The fix: instead of relying on Express's Set-Cookie header reaching the
// browser (it can't), we grab the raw token from Express's JSON response
// body (`result.token` — see authController.ts's createSendToken, which
// includes `token` in the response on purpose), and then use Next.js's
// own `cookies()` API to set OUR OWN cookie, named "jwt", directly on the
// response THIS Server Action sends back to the browser. That response
// really is going to the browser, so this cookie really does get stored.
//
// Net result: the browser ends up with a "jwt" cookie either way — it
// just came from Next.js re-issuing it, not from Express directly. Every
// other server-side file that needs to call Express (see http.ts) reads
// this same cookie back out and forwards it to Express as a Bearer token.
// -----------------------------------------------------------------------

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function login(
	_prevState: initialState,
	formData: FormData,
): Promise<initialState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	try {
		const response = await fetch(`${BACKEND_URL}user/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		const result = await response.json();

		if (result.status === "fail" || result.status === "error") {
			// Wrong email/password, etc. Return an error so the form can
			// show it. Note: no redirect happens on this path.
			return {
				error: result.message,
				success: null,
			};
		}

		// This is the actual fix: set our own cookie, on the response this
		// Server Action sends back to the browser, using the token Express
		// gave us in the JSON body.
		const cookieStore = await cookies();
		cookieStore.set("jwt", result.token, {
			httpOnly: true, // JS in the browser can never read this cookie (XSS protection)
			secure: process.env.NODE_ENV === "production", // only sent over https in prod
			sameSite: "lax",
			path: "/", // available on every route of the site
			maxAge: 60 * 60 * 24 * 90, // 90 days, in seconds
		});
	} catch (err) {
		console.error(err);
		return {
			error: err instanceof Error ? err.message : "Unknown error",
			success: null,
		};
	}

	// redirect() works by throwing a special error internally, which is
	// why it must be called OUTSIDE the try/catch above — if it were
	// inside, our own catch block would swallow that throw and the
	// redirect would never actually happen (this was a real bug earlier).
	redirect("/dashboard");
}

export async function signUp(
	_prevState: initialState,
	formData: FormData,
): Promise<initialState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	try {
		const response = await fetch(`${BACKEND_URL}user/sign-up`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password, confirmPassword }),
		});

		const result = await response.json();

		if (result.status === "fail" || result.status === "error") {
			return {
				error: result.message,
				success: null,
			};
		}

		const cookieStore = await cookies();
		cookieStore.set("jwt", result.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 90,
		});
	} catch (err) {
		console.error(err);
		return {
			error: err instanceof Error ? err.message : "Unknown error",
			success: null,
		};
	}

	redirect("/dashboard");
}

export async function logout() {
	// We don't even need to call Express here. All that matters for the
	// browser to be "logged out" is that OUR cookie (the one login() set
	// above) is gone. Deleting it directly is simpler and doesn't depend
	// on Express being reachable.
	const cookieStore = await cookies();
	cookieStore.delete("jwt");

	redirect("/login");
}
