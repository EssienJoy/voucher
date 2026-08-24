"use server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClientFunc } from "../utils/server";

export const createVoucher = async (formData: FormData) => {
	const supabase = await createSupabaseServerClientFunc();

	try {
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			throw new Error(authError?.message ?? "Not signed in");
		}

		const voucher: voucher = {
			business_id: user.id,
			code: formData.get("code"),
			title: formData.get("title"),
			description: formData.get("description"),
			discount_type: formData.get("discount_type"),
			discount_value: Number(formData.get("discount_value")),
			min_purchase: Number(formData.get("min_purchase")),
			max_discount: Number(formData.get("max_discount")),
			expiry_date: formData.get("expiry_date"),
			usage_limit: Number(formData.get("usage_limit")),
		};

		const { error } = await supabase.from("voucher").insert(voucher);

		if (error) {
			throw new Error(error.message);
		}

		revalidatePath("/voucher");

		return { error: null };
	} catch (err) {
		console.error(err);
		return {
			error: err instanceof Error ? err.message : "Unknown error",
		};
	}
};
