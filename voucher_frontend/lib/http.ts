import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_API_URL;

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
