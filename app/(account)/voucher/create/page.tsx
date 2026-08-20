import React from "react";
import { Container } from "@/app/_components";
import { AccountHeader } from "../../_components";

const CreateVoucherPage = () => {
	return (
		<>
			<AccountHeader text='Create Voucher' />

			<section className='py-25'>
				<Container>
					<div className='mx-auto max-w-2xl'>
						<div className='rounded-2xl bg-white p-6 md:p-8'>
							<div className='mb-8'>
								<h1 className='text-2xl font-bold text-text-primary'>
									Create a voucher
								</h1>

								<p className='mt-2 text-sm text-text-secondary'>
									Create a voucher that your customers can use for discounts.
								</p>
							</div>

							<form className='space-y-6'>
								{/* Voucher title */}
								<div className='space-y-2'>
									<label htmlFor='title' className='text-sm font-semibold'>
										Voucher title
									</label>

									<input
										id='title'
										type='text'
										placeholder='e.g. 10% OFF FIRST ORDER'
										className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
									/>
								</div>

								{/* Voucher code */}
								<div className='space-y-2'>
									<label htmlFor='code' className='text-sm font-semibold'>
										Voucher code
									</label>

									<input
										id='code'
										type='text'
										placeholder='e.g. JOY10'
										className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
									/>

									<p className='text-xs text-text-secondary'>
										Customers will use this code when redeeming the voucher.
									</p>
								</div>

								{/* Discount */}
								<div className='space-y-2'>
									<label htmlFor='discount' className='text-sm font-semibold'>
										Discount
									</label>

									<div className='relative'>
										<input
											id='discount'
											type='number'
											placeholder='10'
											className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
										/>

										<span className='absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-text-secondary'>
											%
										</span>
									</div>
								</div>

								{/* Expiry and limit */}
								<div className='grid gap-6 sm:grid-cols-2'>
									<div className='space-y-2'>
										<label
											htmlFor='expiresAt'
											className='text-sm font-semibold'>
											Expiry date
										</label>

										<input
											id='expiresAt'
											type='date'
											className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
										/>
									</div>

									<div className='space-y-2'>
										<label htmlFor='maxUses' className='text-sm font-semibold'>
											Maximum uses
										</label>

										<input
											id='maxUses'
											type='number'
											placeholder='100'
											className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
										/>
									</div>
								</div>

								{/* Actions */}
								<div className='flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end'>
									<button
										type='button'
										className='rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold transition hover:bg-gray-50'>
										Cancel
									</button>

									<button
										type='submit'
										className='rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90'>
										Create Voucher
									</button>
								</div>
							</form>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
};

export default CreateVoucherPage;
