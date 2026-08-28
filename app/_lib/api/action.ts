"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient as createSupabaseServer } from "../supabase/server";

type ActionState = {
	error: string;
};

export const createVoucher = async (
	_previousState: ActionState,
	formData: FormData,
): Promise<ActionState> => {
	const supabase = await createSupabaseServer();

	try {
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			throw new Error(authError?.message ?? "Not signed in");
		}

		const getRequiredString = (key: string): string => {
			const value = formData.get(key);

			if (typeof value !== "string" || value.trim() === "") {
				throw new Error(`${key} is required`);
			}

			return value.trim();
		};

		const getOptionalString = (key: string): string | null => {
			const value = formData.get(key);

			if (typeof value !== "string" || value.trim() === "") {
				return null;
			}

			return value.trim();
		};

		const getRequiredNumber = (key: string): number => {
			const value = formData.get(key);

			if (typeof value !== "string" || value.trim() === "") {
				throw new Error(`${key} is required`);
			}

			const number = Number(value);

			if (Number.isNaN(number)) {
				throw new Error(`${key} must be a valid number`);
			}

			return number;
		};

		const getOptionalNumber = (key: string): number | null => {
			const value = formData.get(key);

			if (typeof value !== "string" || value.trim() === "") {
				return null;
			}

			const number = Number(value);

			if (Number.isNaN(number)) {
				throw new Error(`${key} must be a valid number`);
			}

			return number;
		};

		const voucher: voucher = {
			business_id: user.id,
			code: getRequiredString("code"),
			title: getRequiredString("title"),
			discount_type: getRequiredString("discount_type"),
			discount_value: getRequiredNumber("discount_value"),
			expiry_date: getRequiredString("expiry_date"),
			usage_limit: getRequiredNumber("usage_limit"),
			description: getOptionalString("description"),
			min_purchase: getOptionalNumber("min_purchase"),
			max_discount: getOptionalNumber("max_discount"),
			created_at: new Date().toISOString(),
			status: "active",
		};

		const { error } = await supabase.from("voucher").insert(voucher);

		if (error) {
			throw new Error(error.message);
		}
	} catch (err) {
		console.error(err);

		return {
			error: err instanceof Error ? err.message : "Unknown error",
		};
	}

	revalidatePath("/voucher");
	redirect("/voucher");
};

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
