import { createSupabaseServerClientFunc } from "../utils/server";

export async function getBusiness() {
	const supabase = await createSupabaseServerClientFunc();

	try {
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

		return { business, error: null };
	} catch (err) {
		console.error(err);
		return {
			business: null,
			error: err instanceof Error ? err.message : "Unknown error",
		};
	}
}
