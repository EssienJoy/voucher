import { createSupabaseClientBrowserFunc } from "../utils/browser";

export const signInWithEmailAndPassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const supabase = createSupabaseClientBrowserFunc();
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	return { error };
};

export const signUpWithEmailAndPassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const supabase = createSupabaseClientBrowserFunc();
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${window.location.origin}/dashboard`,
		},
	});

	return { data, error };
};

export const signOut = async () => {
	const supabase = createSupabaseClientBrowserFunc();
	const { error } = await supabase.auth.signOut();
	return { error };
};
