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
		.eq("user_id", user.id);

	if (error) throw new Error(error.message);

	if (business.length > 0) {
		return {
			business: business[0],
		};
	}

	const { data: newBusiness, error: insertError } = await supabase
		.from("business")
		.insert({
			user_id: user.id,
			email: user.email,
			created_at: user.created_at,
		})
		.select("*")
		.single();

	if (insertError) {
		throw new Error(insertError.message);
	}

	return {
		business: newBusiness,
	};
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
