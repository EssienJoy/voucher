"use client";

import { useRouter } from "next/navigation";
import { Container, Footer } from "@/components";
import { ArrowLeft, RotateCcw, TriangleAlert } from "lucide-react";
interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	if (process.env.NODE_ENV === "development") {
		console.error(error);
	}
	const router = useRouter();
	return (
		<>
			<main className='flex min-h-dvh items-center justify-center px-4'>
				<Container>
					<div className='mx-auto max-w-md text-center'>
						<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600'>
							<TriangleAlert size={32} />
						</div>

						<h1 className='mt-6 text-3xl font-bold text-text-primary'>
							Something went wrong
						</h1>

						<p className='mx-auto mt-3 max-w-sm text-sm leading-6 text-text-secondary'>
							We hit an unexpected error while loading this page. Please try
							again — if the problem persists, try again later.
						</p>

						{process.env.NODE_ENV === "development" && (
							<p className='mx-auto mt-4 max-w-md break-words rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-left text-xs font-medium text-red-700'>
								{error.message}
							</p>
						)}

						<div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
							<button
								type='button'
								onClick={reset}
								className='flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90'>
								<RotateCcw size={18} />
								Try again
							</button>

							<button
								type='button'
								onClick={() => router.back()}
								className='flex items-center justify-center gap-2 rounded-xl border border-black/5 bg-white px-6 py-3 font-semibold text-text-primary shadow-sm transition hover:bg-gray-50'>
								<ArrowLeft size={18} />
								Go back
							</button>
						</div>
					</div>
				</Container>
			</main>

			<Footer />
		</>
	);
}
