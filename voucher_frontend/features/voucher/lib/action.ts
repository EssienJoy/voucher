"use server";

import { apiFetch } from "@/lib/http";
import {
	getOptionalNumber,
	getOptionalString,
	getRequiredNumber,
	getRequiredString,
} from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
