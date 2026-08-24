"use client";
import React, { useState } from "react";
import { signUpWithEmailAndPassword } from "../_lib/api/auth";

const SignUpForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const { data, error } = await signUpWithEmailAndPassword({
				email,
				password,
			});

			if (error) {
				console.error("Error signing up:", error.message);
				return;
			}
			console.log(data);
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit} className='mt-8 space-y-5'>
			{/* Business name */}
			{/* <div className='grid gap-2'>
							<label
								htmlFor='businessName'
								className='text-sm font-semibold text-text-primary'>
								Business name
							</label>

							<input
								id='businessName'
								name='businessName'
								type='text'
								placeholder='e.g. Joy Kitchen'
								className='
									w-full rounded-xl border border-gray-200
									bg-white px-4 py-3
									outline-none transition
									focus:border-primary
									focus:ring-2 focus:ring-primary/10
								'
							/>
						</div> */}

			{/* Email */}
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

			{/* Password */}
			<div className='grid gap-2'>
				<label
					htmlFor='password'
					className='text-sm font-semibold text-text-primary'>
					Password
				</label>

				<input
					id='password'
					name='password'
					type='password'
					placeholder='Create a password'
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
				{isLoading ? "Creating..." : "Create Account"}
			</button>
			<p className='text-red-500'>{error}</p>
		</form>
	);
};

export default SignUpForm;
