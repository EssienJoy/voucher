"use client";
import { useActionState } from "react";
import { signUpWithEmailAndPassword } from "../_lib/api/auth";
import Input from "./Input";

const SignUpForm = () => {
	const [state, submitAction, isPending] = useActionState(
		signUpWithEmailAndPassword,
		{
			error: null,
			success: null,
		},
	);
	return (
		<form action={submitAction} className='mt-8 space-y-5'>
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
