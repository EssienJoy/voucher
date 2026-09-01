import { createClient as createSupabaseServer } from "../supabase/server";

export async function getBusiness(): Promise<{
	business: Business;
}> {
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
		.select("business_name,created_at,email,id")
		.eq("user_id", user.id)
		.maybeSingle();

	if (error) throw new Error(error.message);

	if (business) {
		return {
			business,
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
		.maybeSingle();

	if (insertError) {
		throw new Error(insertError.message);
	}

	return {
		business: newBusiness,
	};
}

export const getVouchers = async function (): Promise<{
	vouchers: voucher[] | null;
}> {
	const supabase = await createSupabaseServer();

	const { business } = await getBusiness();
	const { data: vouchers, error } = await supabase
		.from("voucher")
		.select("*")
		.eq("business_id", business.id)
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error("Vouchers could not be loaded");
	}

	if (!vouchers?.length) {
		return {
			vouchers: null,
		};
	}

	return {
		vouchers,
	};
};

export async function getVoucher(
	voucherId: string,
): Promise<baseVoucher | null> {
	const supabase = await createSupabaseServer();
	const { data, error } = await supabase
		.from("voucher")
		.select("*")
		.eq("id", voucherId)
		.single();

	if (error) throw new Error(error.message);

	return data;
}
