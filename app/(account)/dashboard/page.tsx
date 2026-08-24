import { Container, MobileHeader } from "@/app/_components";
import React from "react";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
	// console.log(data);
	return (
		<>
			<MobileHeader text='Dashboard' />

			<section className='py-24 pb-28'>
				<Container>
					{/* Welcome */}
					<div className='mb-8'>
						<p className='text-sm font-medium text-text-secondary'>
							Good morning
						</p>

						<h1 className='mt-1 text-2xl font-bold text-text-primary'>
							Joy 👋
						</h1>

						<p className='mt-2 text-sm text-text-secondary'>
							Here&apos;s an overview of your vouchers.
						</p>
					</div>

					{/* Stats */}
					<section className='grid grid-cols-2 gap-3'>
						<div className='rounded-2xl bg-white p-4'>
							<p className='text-sm font-medium text-text-secondary'>
								Total Vouchers
							</p>

							<p className='mt-2 text-3xl font-bold text-text-primary'>120</p>
						</div>

						<div className='rounded-2xl bg-primary p-4 text-white'>
							<p className='text-sm font-medium text-white/80'>Active</p>

							<p className='mt-2 text-3xl font-bold'>45</p>
						</div>

						<div className='rounded-2xl bg-white p-4'>
							<p className='text-sm font-medium text-text-secondary'>
								Redeemed
							</p>

							<p className='mt-2 text-3xl font-bold text-text-primary'>45</p>
						</div>

						<div className='rounded-2xl bg-white p-4'>
							<p className='text-sm font-medium text-text-secondary'>
								Remaining
							</p>

							<p className='mt-2 text-3xl font-bold text-text-primary'>30</p>
						</div>
					</section>

					{/* Recent vouchers */}
					<section className='mt-10'>
						<div className='mb-4 flex items-center justify-between'>
							<div>
								<h2 className='text-xl font-bold text-text-primary'>
									Recent Vouchers
								</h2>

								<p className='mt-1 text-sm text-text-secondary'>
									Your latest voucher activity.
								</p>
							</div>

							<Link
								href='/account/vouchers'
								className='flex items-center gap-1 text-sm font-semibold text-primary'>
								View all
								<ArrowRight size={16} />
							</Link>
						</div>

						<div className='space-y-3'>
							{/* Voucher */}
							<div className='rounded-2xl bg-white p-4'>
								<div className='flex items-center justify-between gap-4'>
									<div>
										<p className='text-lg font-bold text-text-primary'>JOY10</p>

										<div className='mt-1 flex gap-3 text-xs text-text-secondary'>
											<span>10% off</span>
											<span>•</span>
											<span>10 uses</span>
										</div>
									</div>

									<div className='text-right'>
										<span className='rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600'>
											Active
										</span>

										<p className='mt-2 text-xs text-text-secondary'>
											Expires in 7 days
										</p>
									</div>
								</div>
							</div>

							<div className='rounded-2xl bg-white p-4'>
								<div className='flex items-center justify-between gap-4'>
									<div>
										<p className='text-lg font-bold text-text-primary'>
											SUMMER20
										</p>

										<div className='mt-1 flex gap-3 text-xs text-text-secondary'>
											<span>20% off</span>
											<span>•</span>
											<span>25 uses</span>
										</div>
									</div>

									<div className='text-right'>
										<span className='rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600'>
											Active
										</span>

										<p className='mt-2 text-xs text-text-secondary'>
											Expires in 12 days
										</p>
									</div>
								</div>
							</div>

							<div className='rounded-2xl bg-white p-4'>
								<div className='flex items-center justify-between gap-4'>
									<div>
										<p className='text-lg font-bold text-text-primary'>
											WELCOME15
										</p>

										<div className='mt-1 flex gap-3 text-xs text-text-secondary'>
											<span>15% off</span>
											<span>•</span>
											<span>50 uses</span>
										</div>
									</div>

									<div className='text-right'>
										<span className='rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500'>
											Used
										</span>

										<p className='mt-2 text-xs text-text-secondary'>
											50 / 50 redeemed
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Create button */}
						<Link
							href='/voucher/create'
							className='mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90'>
							<Plus size={19} />
							Create Voucher
						</Link>
					</section>
				</Container>
			</section>
		</>
	);
};

export default DashboardPage;
