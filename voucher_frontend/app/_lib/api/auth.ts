"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function signInWithGoogle() {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const redirectUri = process.env.GOOGLE_REDIRECT_URI;
	if (!clientId || !redirectUri)
		throw new Error("Google client ID or redirect URI not available.");

	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		response_type: "code",
		scope: "openid email profile",
		prompt: "select_account",
	});

	return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function handleGoogleCallback(
	code: string,
): Promise<initialState> {
	try {
		const url = new URL(`${BACKEND_URL}user/google`);
		url.searchParams.set("code", code);
		url.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI ?? "");

		const response = await fetch(url);
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
			return {
				error: result.message,
				success: null,
			};
		}

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
	const cookieStore = await cookies();
	cookieStore.delete("jwt");

	redirect("/login");
}
