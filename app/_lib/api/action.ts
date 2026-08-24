"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClientFunc } from "../utils/server";
import { revalidatePath } from "next/cache";

export const createVoucher = async (previousState, formData: FormData) => {
	const supabase = await createSupabaseServerClientFunc();
	try {
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			throw new Error(authError?.message ?? "Not signed in");
		}

		const getString = (key: string) => {
			const value = formData.get(key);

			if (typeof value !== "string" || !value) {
				throw new Error(`${key} is required`);
			}

			return value;
		};

		const voucher: voucher = {
			business_id: user.id,
			code: getString("code"),
			title: getString("title"),
			description: getString("description"),
			discount_type: getString("discount_type"),
			discount_value: Number(getString("discount_value")),
			min_purchase: Number(getString("min_purchase")),
			max_discount: Number(getString("max_discount")),
			expiry_date: getString("expiry_date"),
			usage_limit: Number(getString("usage_limit")),
			created_at: new Date().toISOString(),
		};

		const { error } = await supabase.from("voucher").insert(voucher);

		if (error) {
			throw new Error(error.message);
		}

		revalidatePath("/voucher");
		redirect("/voucher");
	} catch (err) {
		console.error(err);
		return {
			error: err instanceof Error ? err.message : "Unknown error",
		};
	}
};
