"use client";

import { useRouter } from "next/navigation";
import { Container, Footer, Header } from "./_components";
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
			<Header />
			<main className='grid place-items-center min-h-dvh  gap-6 px-6 text-center'>
				<Container>
					<h1 className='text-3xl text-centerfont-semibold mb-5'>
						Something went wrong!
					</h1>
					{process.env.NODE_ENV === "development" && (
						<p className='max-w-md text-lg text-text-secondary'>
							{error.message}
						</p>
					)}

					<div className='flex mt-5 itmes-center gap-5 justify-center'>
						<button
							type='button'
							onClick={reset}
							className='rounded-xl grow bg-primary px-6 py-3 text-lg font-semibold text-white transition hover:opacity-90'>
							Try again
						</button>
						<button
							type='button'
							onClick={() => router.back()}
							className='rounded-xl grow bg-primary px-6 py-3 text-lg font-semibold text-white transition hover:opacity-90'>
							Back
						</button>
					</div>
				</Container>
			</main>
			<Footer />
		</>
	);
}
