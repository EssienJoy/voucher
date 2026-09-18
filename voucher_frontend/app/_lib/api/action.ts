"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch } from "./http";

import {
	getRequiredString,
	getOptionalString,
	getRequiredNumber,
	getOptionalNumber,
} from "@/app/_lib/utils";

export const createVoucher = async (
	_previousState: initialState,
	formData: FormData,
): Promise<initialState> => {
	try {
		const voucher = {
			title: getRequiredString(formData, "title"),
			code: getRequiredString(formData, "code").toLowerCase(),
			discount_type: getRequiredString(formData, "discount_type") as
				| "percentage"
				| "fixed",
			discount_value: getRequiredNumber(formData, "discount_value"),
			expiry_date: getRequiredString(formData, "expiry_date"),
			usage_limit: getOptionalNumber(formData, "usage_limit"),
			description: getOptionalString(formData, "description"),
			min_purchase: getOptionalNumber(formData, "min_purchase"),
			max_discount: getOptionalNumber(formData, "max_discount"),
		};

		const result = await apiFetch("voucher", {
			method: "POST",
			body: JSON.stringify(voucher),
		});

		if (result.status === "fail" || result.status === "error")
			throw new Error(result.message);
	} catch (err) {
		console.error(err);

		return {
			error: err instanceof Error ? err.message : "Unknown error",
			success: null,
		};
	}

	revalidatePath("/voucher");
	revalidatePath("/dashboard");
	redirect("/voucher");
};

export async function updateVoucher(
	voucherId: string,
	_previousState: initialState,
	formData: FormData,
): Promise<initialState> {
	try {
		const voucher: VoucherUpdate = {
			title: getRequiredString(formData, "title"),
			code: getRequiredString(formData, "code"),
			discount_type: getRequiredString(formData, "discount_type") as
				| "percentage"
				| "fixed",
			discount_value: getRequiredNumber(formData, "discount_value"),
			expiry_date: getRequiredString(formData, "expiry_date"),
			usage_limit: getOptionalNumber(formData, "usage_limit"),
			description: getOptionalString(formData, "description"),
			min_purchase: getOptionalNumber(formData, "min_purchase"),
			max_discount: getOptionalNumber(formData, "max_discount"),
		};

		const result = await apiFetch(`voucher/${voucherId}`, {
			method: "PATCH",
			body: JSON.stringify(voucher),
		});

		if (result.status === "fail" || result.status === "error")
			throw new Error(result.message);

		revalidatePath("/voucher");
		revalidatePath("/dashboard");
		revalidatePath(`/voucher/edit-voucher/${voucherId}`);
		return {
			error: null,
			success: "Voucher Updated Sucesfully",
		};
	} catch (err) {
		console.error(err);
		return {
			error: err instanceof Error ? err.message : "Unknown error",
			success: null,
		};
	}
}

export async function updateBusiness(
	_previousState: initialState,
	formData: FormData,
): Promise<initialState> {
	const business_name = getRequiredString(formData, "business_name");

	const result = await apiFetch("user/me", {
		method: "PATCH",
		body: JSON.stringify({ business_name }),
	});

	if (result.status === "fail" || result.status === "error") {
		return {
			error: result.message,
			success: null,
		};
	}

	revalidatePath("/profile");
	return {
		error: null,
		success: "Profile updated successfully",
	};
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

export async function regenerateApiKey(): Promise<ApiKeyResult> {
	const result = await apiFetch("user/me/api-key", { method: "POST" });

	if (result.status === "fail" || result.status === "error") {
		return {
			error: result.message,
			success: null,
			apiKey: null,
			apiKeyPrefix: null,
		};
	}

	revalidatePath("/profile");
	return {
		error: null,
		success: result.message,
		apiKey: result.data.apiKey,
		apiKeyPrefix: result.data.apiKeyPrefix,
	};
}

export async function deleteVoucher(voucherId: string | undefined) {
	const result = await apiFetch(`voucher/${voucherId}`, {
		method: "DELETE",
	});

	if (result.status === "fail" || result.status === "error") {
		console.error(result.message);
		throw new Error("Voucher could not be deleted");
	}

	revalidatePath("/voucher");
}
