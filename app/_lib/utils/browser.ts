import { createClient as createSupabaseClientBrowser } from "../supabase/client";

export const createSupabaseClientBrowserFunc = () => {
	return createSupabaseClientBrowser();
};
