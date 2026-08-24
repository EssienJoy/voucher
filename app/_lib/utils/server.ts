import { createClient as createSupabaseServerClient } from "../supabase/server";

export const createSupabaseServerClientFunc = () => {
	return createSupabaseServerClient();
};
