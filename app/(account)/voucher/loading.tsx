const Loading = () => {
	return (
		<main className='min-h-[70vh] px-4 py-10'>
			<div className='mx-auto max-w-5xl space-y-8'>
				{/* Header skeleton */}
				<div className='space-y-3'>
					<div className='h-8 w-48 animate-pulse rounded-lg bg-gray-200' />
					<div className='h-4 w-72 animate-pulse rounded-lg bg-gray-200' />
				</div>

				{/* Content skeleton */}
				<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
					{Array.from({ length: 6 }).map((_, index) => (
						<div key={index} className='rounded-2xl bg-white p-6 shadow-sm'>
							<div className='space-y-4'>
								<div className='h-5 w-32 animate-pulse rounded bg-gray-200' />

								<div className='h-8 w-44 animate-pulse rounded bg-gray-200' />

								<div className='h-4 w-full animate-pulse rounded bg-gray-200' />

								<div className='h-4 w-2/3 animate-pulse rounded bg-gray-200' />

								<div className='flex justify-between pt-3'>
									<div className='h-6 w-20 animate-pulse rounded-full bg-gray-200' />
									<div className='h-6 w-24 animate-pulse rounded bg-gray-200' />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default Loading;
