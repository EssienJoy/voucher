import React from "react";

const VoucherCardSkeleton = () => {
	return (
		<div className='grid gap-5 sm:grid-cols-2 '>
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
	);
};

export default VoucherCardSkeleton;
