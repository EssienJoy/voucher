"use client";

import React, { useActionState } from "react";
import { createVoucher } from "../_lib/api/action";

const CreateVoucherForm = () => {
	const [state, submitAction, isPending] = useActionState(createVoucher, {
		error: null,
	});

	return (
		<form action={submitAction} className='space-y-6'>
			<div className='space-y-2'>
				<label htmlFor='title' className='text-sm font-semibold'>
					Voucher title
				</label>

				<input
					id='title'
					name='title'
					type='text'
					required
					maxLength={30}
					minLength={3}
					placeholder='e.g. WELCOME DISCOUNT'
					className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
				/>
			</div>

			<div className='space-y-2'>
				<label htmlFor='code' className='text-sm font-semibold'>
					Voucher code
				</label>

				<input
					id='code'
					name='code'
					type='text'
					placeholder='e.g. WELCOME20'
					required
					minLength={2}
					maxLength={20}
					className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
				/>

				<p className='text-xs text-text-secondary'>
					Customers will use this code when redeeming the voucher.
				</p>
			</div>

			<div className='space-y-2'>
				<label htmlFor='description' className='text-sm font-semibold'>
					Description
				</label>

				<textarea
					id='description'
					name='description'
					rows={4}
					placeholder='e.g. Get 20% off your first order with us.'
					className='w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
				/>

				<p className='font-bold text-green-600'>optional</p>
				<p className='text-xs text-text-secondary'>
					Give customers a short explanation of what this voucher offers.
				</p>
			</div>

			<div className='space-y-2'>
				<label htmlFor='discountType' className='text-sm font-semibold'>
					Discount type
				</label>

				<select
					id='discountType'
					name='discount_type'
					defaultValue='percentage'
					className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'>
					<option value='percentage'>Percentage</option>
					<option value='fixed'>Fixed amount</option>
				</select>

				<p className='text-xs text-text-secondary'>
					Choose whether the discount is a percentage or a fixed amount.
				</p>
			</div>

			<div className='space-y-2'>
				<label htmlFor='discount' className='text-sm font-semibold'>
					Discount
				</label>

				<div className='relative'>
					<input
						id='discount'
						name='discount_value'
						required
						type='number'
						min='0'
						placeholder='10'
						className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
					/>
					<p className='font-bold text-green-600'>optional</p>

					{/* <span className='absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-text-secondary'>
						%
					</span> */}
				</div>

				<p className='text-xs text-text-secondary'>
					Enter the percentage or amount based on the discount type.
				</p>
			</div>

			<div className='grid gap-6 sm:grid-cols-2'>
				<div className='space-y-2'>
					<label htmlFor='minPurchase' className='text-sm font-semibold'>
						Minimum purchase
					</label>

					<div className='relative'>
						<span className='absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-text-secondary'>
							₦
						</span>

						<input
							id='minPurchase'
							name='min_purchase'
							type='number'
							min='0'
							placeholder='10,000'
							className='w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
						/>
					</div>
					<p className='font-bold text-green-600'>optional</p>
					<p className='text-xs text-text-secondary'>
						Minimum amount a customer must spend.
					</p>
				</div>

				<div className='space-y-2'>
					<label htmlFor='maxDiscount' className='text-sm font-semibold'>
						Maximum discount
					</label>

					<div className='relative'>
						<span className='absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-text-secondary'>
							₦
						</span>

						<input
							id='maxDiscount'
							name='max_discount'
							type='number'
							min='0'
							placeholder='5,000'
							className='w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
						/>
					</div>
					<p className='font-bold text-green-600'>optional</p>
					<p className='text-xs text-text-secondary'>
						Maximum amount the customer can save.
					</p>
				</div>
			</div>

			<div className='grid gap-6 sm:grid-cols-2'>
				<div className='space-y-2'>
					<label htmlFor='expiresAt' className='text-sm font-semibold'>
						Expiry date
					</label>

					<input
						id='expiresAt'
						required
						name='expiry_date'
						type='date'
						className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
					/>

					<p className='text-xs text-text-secondary'>
						The date when this voucher will expire.
					</p>
				</div>

				<div className='space-y-2'>
					<label htmlFor='maxUses' className='text-sm font-semibold'>
						Maximum uses
					</label>

					<input
						required
						id='maxUses'
						name='usage_limit'
						type='number'
						min='1'
						placeholder='100'
						className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
					/>

					<p className='text-xs text-text-secondary'>
						Maximum number of times this voucher can be redeemed.
					</p>
				</div>
			</div>

			<div className='flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end'>
				<button
					type='button'
					className='rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold transition hover:bg-gray-50'>
					Cancel
				</button>

				<button
					type='submit'
					disabled={isPending}
					className='rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90'>
					{isPending ? "Creating..." : "Create Voucher"}
				</button>
			</div>
			<p className='text-red-500'>{state.error}</p>
		</form>
	);
};

export default CreateVoucherForm;
