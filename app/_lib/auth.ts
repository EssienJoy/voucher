import { createClient as createClientBrowser } from "./supabase/client";

export const signInWithEmailAndPassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const supabase = createClientBrowser();
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
	const supabase = createClientBrowser();
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		// options: {
		// 	emailRedirectTo: `${window.location.origin}/dashboard`,
		// },
	});

	return { data, error };
};

export const signOut = async () => {
	const supabase = createClientBrowser();
	const { error } = await supabase.auth.signOut();
	return { error };
};
