"use client";
import { useActionState } from "react";
import { signUp } from "../_lib/api/auth";
import Input from "./Input";

const SignUpForm = () => {
	// signUp is a real Server Action with the exact shape useActionState
	// expects, and it redirects to /dashboard itself on success — see
	// auth.ts for the full explanation of how the cookie reaches the
	// browser even though this code runs on the Next.js server.
	const [state, formAction, isPending] = useActionState(signUp, {
		error: null,
		success: null,
	});
	return (
		<form action={formAction} className='mt-8 space-y-5'>
			<Input
				label='Email'
				type='text'
				placeHolder='you@example.com'
				required
				name='email'
			/>
			<Input
				required
				label='Password'
				type='password'
				placeHolder='Create a password'
				name='password'
			/>
			<Input
				required
				label='Confirm Password'
				type='password'
				placeHolder='Confirm your password'
				name='confirmPassword'
			/>

			<button
				type='submit'
				disabled={isPending}
				className='
								w-full rounded-xl bg-primary
								px-5 py-3.5
								font-semibold text-white
								transition hover:opacity-90
							'>
				{isPending ? "Creating..." : "Create Account"}
			</button>
			<p className='text-red-500 text-xs'>{state.error}</p>
			<p className=' text-green-500 text-xs'>{state.success}</p>
		</form>
	);
};

export default SignUpForm;
