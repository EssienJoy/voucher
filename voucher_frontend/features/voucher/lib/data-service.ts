import { apiFetch } from "@/lib/http";
import { getRequiredString } from "@/utils/utils";

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

export async function getVoucherByCode(
	_previousState: VoucherResult,
	formData: FormData,
): Promise<VoucherResult> {
	const code = getRequiredString(formData, "code");
	const result = await apiFetch(`redeem/verify-voucher/${code}`);

	if (result.status === "fail" || result.status === "error") {
		return { error: result.message, success: null, data: null };
	}

	return { error: null, success: "Voucher is available", data: result.data };
}
