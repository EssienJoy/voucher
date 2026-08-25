import { createClient as createSupabaseServer } from "../supabase/server";

export async function getBusiness() {
	const supabase = await createSupabaseServer();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		throw new Error(authError?.message ?? "Not signed in");
	}

	const { data: business, error } = await supabase
		.from("business")
		.select("*")
		.eq("user_id", user.id)
		.single();

	if (error) throw new Error(error.message);

	return { business };
}

export const getVouchers = async function () {
	const supabase = await createSupabaseServer();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		throw new Error(authError?.message ?? "Not signed in");
	}
	const { data: vouchers, error } = await supabase
		.from("voucher")
		.select("*")
		.eq("business_id", user.id)
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error("Vouchers could not be loaded");
	}

	return {
		vouchers,
	};
};
