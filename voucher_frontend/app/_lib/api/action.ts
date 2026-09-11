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

		// apiFetch (see http.ts) attaches the logged-in user's token as an
		// Authorization header, so Express's `protect` + `req.user` know
		// which business this voucher belongs to.
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
