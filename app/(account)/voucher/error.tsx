"use client";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
	return (
		<main className='flex min-h-[70vh] items-center justify-center px-6'>
			<div className='w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm'>
				{/* Error icon */}
				<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='1.8'
						className='h-8 w-8 text-red-500'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 9v3.75m0 3.75h.008M10.29 3.86 2.82 17a2 2 0 0 0 1.73 3h14.9a2 2 0 0 0 1.73-3L13.71 3.86a2 2 0 0 0-3.42 0Z'
						/>
					</svg>
				</div>

				<h1 className='mt-6 text-2xl font-bold text-text-primary'>
					Something went wrong
				</h1>

				<p className='mt-3 text-sm leading-6 text-text-secondary'>
					We could not load this page right now. Please try again.
				</p>

				{/* Only useful during development */}
				{process.env.NODE_ENV === "development" && (
					<p className='mt-4 rounded-lg bg-gray-50 p-3 text-left text-xs text-red-500'>
						{error.message}
					</p>
				)}

				<button
					type='button'
					onClick={reset}
					className='mt-6 w-full rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90'>
					Try again
				</button>
			</div>
		</main>
	);
};

export default Error;
