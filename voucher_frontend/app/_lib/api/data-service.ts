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
