import React from "react";

const DashboardStatsSkeleton = () => {
	return (
		<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
			{Array.from({ length: 4 }).map((_, index) => (
				<div key={index} className='rounded-2xl bg-white p-6 shadow-sm'>
					<div className='space-y-4'>
						{/* Icon */}
						<div className='h-10 w-10 animate-pulse rounded-xl bg-gray-200' />

						{/* Label */}
						<div className='h-4 w-28 animate-pulse rounded bg-gray-200' />

						{/* Number */}
						<div className='h-8 w-20 animate-pulse rounded bg-gray-200' />

						{/* Small supporting text */}
						<div className='h-3 w-32 animate-pulse rounded bg-gray-200' />
					</div>
				</div>
			))}
		</div>
	);
};

export default DashboardStatsSkeleton;
