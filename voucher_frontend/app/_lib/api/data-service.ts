// These functions run as Server Components (e.g. dashboard/voucher pages
// render on the Next.js server and call these directly). Because of that,
// `credentials: "include"` on a plain fetch() here would do NOTHING — that
// option only matters when a BROWSER makes the request, telling it to
// attach cookies. There is no browser involved in a server-to-server call.
//
// apiFetch (in http.ts) is what actually makes auth work here: it reads
// the "jwt" cookie the browser sent along with the page request, and
// attaches it to the request to Express as an Authorization header, which
// the `protect` middleware checks. See http.ts and auth.ts for the full
// picture of how that cookie got there in the first place.
import { apiFetch } from "./http";

export async function getBusiness(): Promise<{
	business: Business;
}> {
	const result = await apiFetch("user/me");

	if (result.status === "fail") throw new Error(result.message);

	return {
		business: result.data,
	};
}

export const getVouchers = async function (
	status?: voucher["status"],
	page = 1,
	limit = 4,
): Promise<{
	vouchers: voucher[] | null;
}> {
	const params = new URLSearchParams({
		page: String(page),
		limit: String(limit),
	});
	if (status) params.set("status", status);

	const result = await apiFetch(`voucher?${params.toString()}`);

	if (result.status === "fail") throw new Error(result.message);

	return {
		vouchers: result.data,
	};
};

export async function getVoucher(voucherId: string): Promise<voucher | null> {
	const result = await apiFetch(`voucher/${voucherId}`);

	if (result.status === "fail" || result.status === "error") return null;

	return result.data;
}
