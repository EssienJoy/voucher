"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "../_lib/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const { error } = await signInWithEmailAndPassword({
				email,
				password,
			});
			if (error) {
				throw new Error(`Error logging user: ${error.message}`);
			}
			router.replace("/dashboard");
			// console.log(data);
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit} className='mt-8 space-y-5'>
			<div className='grid gap-2'>
				<label
					htmlFor='email'
					className='text-sm font-semibold text-text-primary'>
					Email
				</label>

				<input
					id='email'
					name='email'
					type='email'
					placeholder='you@example.com'
					className='
									w-full rounded-xl border border-gray-200
									bg-white px-4 py-3
									outline-none transition
									focus:border-primary
									focus:ring-2 focus:ring-primary/10
								'
				/>
			</div>

			<div className='grid gap-2'>
				<div className='flex items-center justify-between'>
					<label
						htmlFor='password'
						className='text-sm font-semibold text-text-primary'>
						Password
					</label>

					<Link
						href='/forgot-password'
						className='text-xs font-semibold text-primary hover:underline'>
						Forgot password?
					</Link>
				</div>

				<input
					id='password'
					name='password'
					type='password'
					placeholder='Enter your password'
					className='
									w-full rounded-xl border border-gray-200
									bg-white px-4 py-3
									outline-none transition
									focus:border-primary
									focus:ring-2 focus:ring-primary/10
								'
				/>
			</div>

			<button
				type='submit'
				disabled={isLoading}
				className='
								w-full rounded-xl bg-primary
								px-5 py-3.5
								font-semibold text-white
								transition hover:opacity-90
							'>
				{isLoading ? "Logging..." : "Log In"}
			</button>
			<p className='text-red-500'>{error}</p>
		</form>
	);
};

export default LoginForm;
