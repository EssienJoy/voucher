"use client";
import { Suspense, useEffect, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleGoogleCallback } from "@/app/_lib/api/auth";
import { Logo } from "@/app/_components";
import { LoaderCircle } from "lucide-react";

const CallbackContent = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const started = useRef(false);

	useEffect(() => {
		const code = searchParams.get("code");
		const error = searchParams.get("error");

		if (error || !code) {
			router.replace("/login");
			return;
		}

		if (started.current) return;
		started.current = true;

		startTransition(async () => {
			const result = await handleGoogleCallback(code);
			if (result.error) router.replace("/login");
		});
	}, [searchParams, router]);

	return (
		<div className='grid min-h-dvh place-items-center px-4'>
			<div className='flex flex-col items-center text-center'>
				<Logo />

				<div className='mt-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 text-primary'>
					<LoaderCircle
						size={28}
						className='animate-spin'
						aria-hidden='true'
					/>
				</div>

				<h1 className='mt-5 text-xl font-bold text-text-primary'>
					Signing you in
				</h1>

				<p className='mt-2 text-sm text-text-secondary'>
					{isPending
						? "Connecting your Google account..."
						: "Please wait a moment..."}
				</p>
			</div>
		</div>
	);
};

const CallbackPage = () => (
	<Suspense
		fallback={
			<div className='grid min-h-dvh place-items-center px-4'>
				<div className='flex flex-col items-center text-center'>
					<Logo />

					<div className='mt-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 text-primary'>
						<LoaderCircle
							size={28}
							className='animate-spin'
							aria-hidden='true'
						/>
					</div>

					<h1 className='mt-5 text-xl font-bold text-text-primary'>
						Redirecting...
					</h1>

					<p className='mt-2 text-sm text-text-secondary'>
						Taking you to Google to sign in.
					</p>
				</div>
			</div>
		}>
		<CallbackContent />
	</Suspense>
);

export default CallbackPage;