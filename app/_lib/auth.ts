import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	const response = NextResponse.next({ request });

	const user = request.cookies.get("jwt")?.value;

	const publicPaths = [
		"/login",
		"/auth",
		"/signup",
		"/",
		"/about",
		"/contact",
		"/privacy",
		"/terms",
	];
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

	return response;
}
