"use client";
import { useActionState } from "react";
import { login } from "../_lib/api/auth";
import Input from "./Input";
import { CircleCheck, CircleX, LogIn } from "lucide-react";

const LoginForm = () => {
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
					flex w-full items-center justify-center gap-2 rounded-xl bg-primary
					px-5 py-3.5 font-semibold text-white
					shadow-sm transition hover:opacity-90
					disabled:cursor-not-allowed disabled:opacity-60
				'>
				<LogIn size={18} />
				{isPending ? "Logging in..." : "Log In"}
			</button>
			{state.error && (
				<p className='flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700'>
					<CircleX size={16} />
					{state.error}
				</p>
			)}
			{state.success && (
				<p className='flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700'>
					<CircleCheck size={16} />
					{state.success}
				</p>
			)}
		</form>
	);
};

export default LoginForm;