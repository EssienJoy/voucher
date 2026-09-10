"use client";
import { useActionState } from "react";
import { login } from "../_lib/api/auth";
import Input from "./Input";

const LoginForm = () => {
	// login (in auth.ts) is a real Server Action: it already matches the
	// (previousState, formData) => newState shape useActionState wants,
	// and it already redirects to /dashboard itself on success (server-side,
	// via redirect()). So we can hand it to useActionState directly — no
	// wrapper function needed here.
	const [state, formAction, isPending] = useActionState(login, {
		error: null,
		success: null,
	});

	return (
		<form action={formAction} className='mt-8 space-y-5'>
			<Input
				label='Email'
				type='text'
				placeHolder='you@example.com'
				name='email'
				required
			/>
			<Input
				label='Password'
				type='password'
				placeHolder='Input a password'
				name='password'
				required
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
				{isPending ? "Logging..." : "Log In"}
			</button>
			<p className='text-red-500 text-xs'>{state.error}</p>
			<p className=' text-green-500 text-xs'>{state.success}</p>
		</form>
	);
};

export default LoginForm;
