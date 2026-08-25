"use client";

import React, { useActionState } from "react";
import { createVoucher } from "../_lib/api/action";
import Input from "./Input";

const CreateVoucherForm = () => {
	const [state, submitAction, isPending] = useActionState(createVoucher, {
		error: "",
	});

	return (
		<form action={submitAction} className='space-y-6'>
			<Input
				type='text'
				label='Voucher title'
				name='title'
				required
				maxLength={30}
				minLength={3}
				placeHolder='e.g. WELCOME DISCOUNT'
			/>
			<Input
				type='text'
				label='Voucher code'
				name='code'
				required
				maxLength={20}
				minLength={2}
				placeHolder='e.g. WELCOME DISCOUNT'
				text='Customers will use this code when redeeming the voucher.'
			/>

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

			<Input
				type='number'
				label='Discount'
				name='discount_value'
				required
				min='0'
				placeHolder='10'
				text='Enter the percentage or amount based on the discount type.'
			/>
			<Input
				type='number'
				label='Minimum purchase'
				name='min_purchase'
				min='0'
				placeHolder='₦ 10,000'
				optional={true}
				text='Minimum amount a customer must spend.'
			/>
			<Input
				type='number'
				label='Maximum discount'
				name='max_discount'
				min='0'
				optional={true}
				placeHolder='₦ 5,000'
				text='Maximum amount the customer can save.'
			/>
			<Input
				type='date'
				required
				label='Expiry date'
				name='expiry_date'
				text='The date when this voucher will expire.'
			/>

			<Input
				type='number'
				label='Maximum uses'
				name='usage_limit'
				min='1'
				placeHolder='100'
				text='	Maximum number of times this voucher can be redeemed'
			/>

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
