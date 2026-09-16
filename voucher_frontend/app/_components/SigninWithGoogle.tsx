"use client";
import Image from "next/image";
import { useTransition } from "react";
import { signInWithGoogle } from "../_lib/api/auth";

const SigninWithGoogle = () => {
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			const url = await signInWithGoogle();
			if (url) window.location.assign(url);
		});
	};

	return (
		<button
			onClick={handleClick}
			disabled={isPending}
			type='button'
			className='
							flex w-full items-center justify-center
							gap-3 rounded-xl border border-black/5
							bg-white px-5 py-3.5
							font-semibold text-text-primary
							shadow-sm transition hover:bg-gray-50
							disabled:opacity-60
						'>
			<Image
				src='https://authjs.dev/img/providers/google.svg'
				alt='Google logo'
				height='24'
				width='24'
				className='h-6 w-6'
			/>
			{isPending ? "Redirecting to Google..." : "Continue with Google"}
		</button>
	);
};

export default SigninWithGoogle;