import React from "react";

const DashboardVoucherSkeleton = () => {
	return (
		<div className='space-y-3'>
			{Array.from({ length: 5 }).map((_, index) => (
				<div key={index} className='rounded-2xl bg-white p-5 shadow-sm'>
					<div className='flex items-center justify-between gap-4'>
						{/* Voucher information */}
						<div className='min-w-0 flex-1 space-y-3'>
							<div className='h-5 w-40 animate-pulse rounded bg-gray-200' />

							<div className='h-4 w-64 max-w-full animate-pulse rounded bg-gray-200' />

							<div className='flex gap-3'>
								<div className='h-6 w-20 animate-pulse rounded-full bg-gray-200' />
								<div className='h-6 w-24 animate-pulse rounded bg-gray-200' />
							</div>
						</div>

						{/* Voucher value / action */}
						<div className='hidden space-y-3 sm:block'>
							<div className='ml-auto h-5 w-20 animate-pulse rounded bg-gray-200' />
							<div className='ml-auto h-9 w-20 animate-pulse rounded-xl bg-gray-200' />
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default DashboardVoucherSkeleton;
