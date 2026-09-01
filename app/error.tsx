"use client";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	return (
		<main className='flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center'>
			<h1 className='text-3xl font-semibold text-text-primary'>
				Something went wrong!
			</h1>

			<p className='max-w-md text-lg text-text-secondary'>{error.message}</p>

			<button
				type='button'
				onClick={reset}
				className='rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white transition hover:opacity-90'>
				Try again
			</button>
		</main>
	);
}
