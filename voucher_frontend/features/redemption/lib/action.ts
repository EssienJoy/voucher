"use server";

import { apiFetch } from "@/lib/http";
import { revalidatePath } from "next/cache";

export async function redeemVoucherPublic(
	_prevState: RedeemResult,
	formData: FormData,
): Promise<RedeemResult> {
	const code = (formData.get("code") as string) ?? "";
	const redeemedBy =
		((formData.get("redeemed_by") as string) ?? "").trim() || null;
	const redemptionEmail =
		((formData.get("redemption_email") as string) ?? "").trim() || null;
	const redemptionPhoneNumber =
		((formData.get("redemption_phoneNumber") as string) ?? "").trim() || null;

	if (!code) {
		return { error: "Voucher code is required", success: null, voucher: null };
	}

	const result = await apiFetch(`redeem/redeem-voucher/${code}`, {
		method: "POST",
		body: JSON.stringify({
			redeemed_by: redeemedBy,
			redemption_email: redemptionEmail,
			redemption_phoneNumber: redemptionPhoneNumber,
		}),
	});

	if (result.status === "fail" || result.status === "error") {
		return { error: result.message, success: null, voucher: null };
	}

	revalidatePath("/redeem-voucher");
	revalidatePath("/voucher");
	revalidatePath("/dashboard");
	return {
		error: null,
		success: "Voucher redeemed successfully.",
		voucher: result.data,
	};
}
