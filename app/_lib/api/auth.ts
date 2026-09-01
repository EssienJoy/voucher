import { redirect } from "next/navigation";
import { createClient as createSupabaseClient } from "../supabase/client";

export const signInWithEmailAndPassword = async (
	_previousState: initialState,
	formData: FormData,
): Promise<initialState> => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = createSupabaseClient();

	try {
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				throw new Error(error.message, { cause: error });
			}
		}
	} catch (err) {
		console.error(err);

		return {
			error: err instanceof Error ? err.message : "Unknown error",
			success: null,
		};
	}

	redirect("/dashboard");
};

export const signUpWithEmailAndPassword = async (
	_previousState: initialState,
	formData: FormData,
): Promise<initialState> => {
	try {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const supabase = createSupabaseClient();

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/dashboard`,
				},
			});

			if (error) throw new Error(error.message);
		}
	} catch (err) {
		console.error(err);
		return {
			error: err instanceof Error ? err.message : "Unknown error",
			success: null,
		};
	}

	redirect("/dashboard");
};

export const signOut = async (): Promise<{ error: string }> => {
	try {
		const supabase = createSupabaseClient();
		const { error } = await supabase.auth.signOut();
		if (error) throw new Error(error.message);
	} catch (err) {
		return {
			error: err instanceof Error ? err.message : "Unknown error",
		};
	}

	redirect("/login");
};

// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { createGuest, getGuest } from "./data-service";

// const authConfig = {
// 	providers: [
// 		Google({
// 			clientId: process.env.AUTH_GOOGLE_ID,
// 			clientSecret: process.env.AUTH_GOOGLE_SECRET,
// 		}),
// 	],
// 	callbacks: {
// 		authorized({ auth, request }) {
// 			return !!auth?.user;
// 		},
// 		async signIn({ user, account, profile }) {
// 			try {
// 				const existingGuest = await getGuest(user.email);

// 				if (!existingGuest)
// 					await createGuest({ email: user.email, fullName: user.name });

// 				return true;
// 			} catch {
// 				return false;
// 			}
// 		},
// 		async session({ session, user }) {
// 			const guest = await getGuest(session.user.email);
// 			session.user.guestId = guest.id;
// 			return session;
// 		},
// 	},
// 	pages: {
// 		signIn: "/login",
// 	},
// };

// export const {
// 	auth,
// 	signIn,
// 	signOut,
// 	handlers: { GET, POST },
// } = NextAuth(authConfig);
