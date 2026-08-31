"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient as createSupabaseServer } from "../supabase/server";
import {
	getRequiredString,
	getOptionalString,
	getRequiredNumber,
	getOptionalNumber,
} from "@/app/_lib/utils";

export async function getVoucher(voucherId: string) {
	const supabase = await createSupabaseServer();
	const { data, error } = await supabase
		.from("voucher")
		.select("*")
		.eq("id", voucherId)
		.single();

	if (error) {
		console.error(error);
		return null;
	}

	return data;
}

export const createVoucher = async (
	_previousState: initialState,
	formData: FormData,
): Promise<initialState> => {
	try {
		const supabase = await createSupabaseServer();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			throw new Error(authError?.message ?? "Not signed in");
		}

		const voucher: VoucherInsert = {
			business_id: user.id,
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
			created_at: new Date().toISOString(),
			status: "active",
		};

		const { error } = await supabase.from("voucher").insert(voucher).select();

		if (error) {
			throw new Error(error.message);
		}

		revalidatePath("/voucher");
		revalidatePath("/dashboard");
		redirect("/voucher");
	} catch (err) {
		console.error(err);

		return {
			error: err instanceof Error ? err.message : "Unknown error",
			success: null,
		};
	}
};

export async function updateVoucher(
	voucherId: string,
	_previousState: initialState,
	formData: FormData,
): Promise<initialState> {
	try {
		const supabase = await createSupabaseServer();

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			throw new Error(authError?.message ?? "Not signed in");
		}

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

		const { error } = await supabase
			.from("voucher")
			.update(voucher)
			.eq("id", voucherId);

		if (error) throw new Error("Error updating voucher", { cause: error });

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

export async function deleteVoucher(voucherId: number | undefined) {
	const supabase = await createSupabaseServer();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		throw new Error(authError?.message ?? "Not signed in");
	}

	const { error } = await supabase.from("voucher").delete().eq("id", voucherId);

	if (error) {
		console.error(error);
		throw new Error("Voucher could not be deleted");
	}

	revalidatePath("/voucher");
}
