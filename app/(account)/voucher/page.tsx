import React from "react";
import { Container, MobileHeader } from "@/app/_components";
import Link from "next/link";
import { getVouchers } from "@/app/_lib/api/data-service";
import DeleteVoucher from "@/app/_components/DeleteVoucher";

const VoucherPage = async () => {
	const { vouchers }: { vouchers: voucher[] | null } = await getVouchers();
	// console.log(vouchers);
	return (
		<>
			<MobileHeader text='Vouchers' />

			<section className='py-26 md:py-20'>
				<Container>
					<div className='mb-8 flex items-center justify-between gap-4'>
						<div>
							<h1 className='text-2xl font-bold text-text-primary'>
								Your vouchers
							</h1>

							<p className='mt-1 text-sm text-text-secondary'>
								Create and manage your business vouchers.
							</p>
						</div>

						<Link
							href='/voucher/create'
							className='rounded-xl  bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90'>
							Create
						</Link>
					</div>

					<div className='mb-8 overflow-x-auto'>
						<div className='flex min-w-max gap-2 rounded-xl bg-white p-1'>
							<button className='rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white'>
								All
							</button>

							<button className='rounded-lg px-5 py-2.5 text-sm font-semibold text-text-secondary transition hover:bg-gray-100'>
								Active
							</button>

							<button className='rounded-lg px-5 py-2.5 text-sm font-semibold text-text-secondary transition hover:bg-gray-100'>
								Used
							</button>

							<button className='rounded-lg px-5 py-2.5 text-sm font-semibold text-text-secondary transition hover:bg-gray-100'>
								Expired
							</button>
						</div>
					</div>

					<section className='grid gap-5 md:grid-cols-2'>
						{vouchers.map(
							({
								id,
								code,
								title,
								created_at,
								discount_type,
								discount_value,
								expiry_date,
								usage_limit,
							}) => (
								<article
									key={id}
									className='rounded-2xl bg-white p-5 shadow-sm'>
									<div className='flex items-start justify-between gap-4'>
										<div>
											<p className='text-lg font-bold text-text-primary'>
												{title}
											</p>

											<p className='mt-1 text-sm text-text-secondary'>
												Created {new Date(created_at).toLocaleDateString()}
											</p>
										</div>

										<span className='rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600'>
											Active
										</span>
									</div>

									{/* Code */}
									<div className='mt-5 rounded-xl bg-gray-50 p-4'>
										<p className='text-xs font-medium uppercase tracking-wide text-text-secondary'>
											Voucher code
										</p>

										<p className='mt-1 text-xl font-bold tracking-wider text-primary'>
											{code}
										</p>
									</div>

									{/* Details */}
									<div className='mt-5 grid grid-cols-2 gap-4'>
										<div>
											<p className='text-xs text-text-secondary'>Discount</p>

											<p
												className='mt-1 font-semibold
									 text-text-primary'>
												{discount_value}{" "}
												{discount_type === "percentage" ? "%" : "₦"}
											</p>
										</div>

										<div>
											<p className='text-xs text-text-secondary'>Expires</p>

											<p className='mt-1 font-semibold text-text-primary'>
												{new Date(expiry_date).toLocaleDateString()}
											</p>
										</div>

										<div>
											<p className='text-xs text-text-secondary'>Redemptions</p>

											<p className='mt-1 font-semibold text-text-primary'>
												0 / {usage_limit}
											</p>
										</div>

										<div>
											<p className='text-xs text-text-secondary'>Status</p>

											<p className='mt-1 font-semibold text-green-600'>
												Available
											</p>
										</div>
									</div>

									<div className='mt-6 flex gap-3 border-t border-gray-100 pt-5'>
										<button className='flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:bg-gray-50'>
											Edit
										</button>
										<DeleteVoucher id={id} />
									</div>
								</article>
							),
						)}
					</section>
				</Container>
			</section>
		</>
	);
};

export default VoucherPage;
