"use client";
import { Suspense, useEffect, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleGoogleCallback } from "@/app/_lib/api/auth";

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
		<div className='grid min-h-dvh place-items-center'>
			<p className='text-sm text-text-secondary'>
				{isPending ? "Signing you in..." : "Please wait..."}
			</p>
		</div>
	);
};

const CallbackPage = () => (
	<Suspense
		fallback={
			<p className='mt-10 text-center text-sm text-text-secondary'>
				Redirecting...
			</p>
		}>
		<CallbackContent />
	</Suspense>
);

export default CallbackPage;