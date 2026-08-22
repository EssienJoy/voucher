import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({ request });

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

	if (!supabaseUrl || !supabaseKey) {
		throw new Error("Missing NEXT SUPABASE URL or NEXT SUPABASE KEY");
	}

	// With Fluid compute, don't put this client in a global environment
	// variable. Always create a new one on each request.
	const supabase = createServerClient(supabaseUrl, supabaseKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet, headers) {
				cookiesToSet.forEach(({ name, value }) =>
					request.cookies.set(name, value),
				);
				supabaseResponse = NextResponse.next({ request });
				cookiesToSet.forEach(({ name, value, options }) =>
					supabaseResponse.cookies.set(name, value, options),
				);
				Object.entries(headers).forEach(([key, value]) =>
					supabaseResponse.headers.set(key, value),
				);
			},
		},
	});

	// Do not run code between createServerClient and supabase.auth.getClaims().
	// A simple mistake could make it very hard to debug issues with users
	// being randomly logged out.
	const { data } = await supabase.auth.getClaims();
	const user = data?.claims;

	const publicPaths = ["/login", "/auth", "/signup", "/"];
	const isPublicPath = publicPaths.some((path) =>
		path === "/"
			? request.nextUrl.pathname === "/"
			: request.nextUrl.pathname.startsWith(path),
	);

	if (!user && !isPublicPath) {
		const url = request.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	// You must return supabaseResponse as-is. If you create a new response,
	// copy the cookies over instead of dropping them.
	return supabaseResponse;
}
