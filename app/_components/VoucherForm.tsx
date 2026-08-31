"use client";
import { Input, Link } from "@/app/_components";
import React, { useActionState } from "react";

const VoucherForm = ({
	action,
	defaultValues,
}: {
	action: (
		previousState: initialState,
		formData: FormData,
	) => Promise<initialState>;
	defaultValues?: Partial<voucher>;
}) => {
	const [state, submitAction, isPending] = useActionState(action, {
		error: null,
		success: null,
	});

	const isEditing = Boolean(defaultValues);

	return (
		<form action={submitAction} className=''>
			<fieldset className='grid grid-cols-2 gap-5'>
				<legend className='text-xl font-semibold mb-5'>Voucher</legend>
				<Input
					type='text'
					label='Voucher title'
					name='title'
					required
					maxLength={30}
					minLength={3}
					defaultValue={defaultValues?.title?.toUpperCase() as string}
					placeHolder='e.g. WELCOME DISCOUNT'
				/>
				<Input
					type='text'
					label='Voucher code'
					name='code'
					required
					maxLength={20}
					minLength={2}
					defaultValue={defaultValues?.code?.toUpperCase() as string}
					placeHolder='e.g. WELCOME120'
					text='Customers will use this code when redeeming the voucher.'
				/>

				<div className=' col-span-2'>
					<label htmlFor='description' className='text-sm font-semibold'>
						Description:
					</label>

					<textarea
						id='description'
						name='description'
						rows={4}
						defaultValue={defaultValues?.description as string}
						placeholder='e.g. Get 20% off your first order with us.'
						className='w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
					/>

					<p className='font-bold text-xs text-green-600'>optional</p>
					<p className='text-xs text-text-secondary'>
						Give customers a short explanation of what this voucher offers.
					</p>
				</div>
			</fieldset>

			<fieldset className='space-y-2 grid grid-cols-2 gap-5 my-7'>
				<legend className='text-xl font-semibold mb-5'>Discount</legend>
				<label htmlFor='discountType' className='text-sm font-semibold'>
					<span className=''>Type:</span>
					<select
						id='discountType'
						name='discount_type'
						defaultValue={
							(defaultValues?.discount_type as string) ?? "percentage"
						}
						className='w-full rounded-xl mt-5 border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'>
						<option value='percentage'>Percentage</option>
						<option value='fixed'>Fixed amount</option>
					</select>
					<p className='text-xs text-text-secondary'>
						Choose whether the discount is a percentage or a fixed amount.
					</p>
				</label>

				<Input
					type='number'
					label='Discount'
					name='discount_value'
					defaultValue={defaultValues?.discount_value as number}
					required
					min='0'
					placeHolder='10'
					text='Enter the percentage or amount based on the discount type.'
				/>

				<Input
					type='number'
					label='Minimum purchase'
					name='min_purchase'
					defaultValue={defaultValues?.min_purchase?.toLocaleString() as number}
					min='0'
					placeHolder='₦ 10,000'
					optional={true}
					text='Minimum amount a customer must spend.'
				/>
				<Input
					type='number'
					label='Maximum discount'
					name='max_discount'
					defaultValue={defaultValues?.max_discount?.toLocaleString() as number}
					min='0'
					optional={true}
					placeHolder='₦ 5,000'
					text='Maximum amount the customer can save.'
				/>
			</fieldset>

			<fieldset className='grid grid-cols-2 gap-5'>
				<legend className='text-xl font-semibold mb-5'>
					Date & Usage Limit
				</legend>
				<Input
					type='date'
					required
					label='Expiry date'
					defaultValue={defaultValues?.expiry_date?.split("T")[0]}
					name='expiry_date'
					text='The date when this voucher will expire.'
				/>

				<Input
					type='number'
					label='Maximum uses'
					name='usage_limit'
					defaultValue={defaultValues?.usage_limit as number}
					min='1'
					placeHolder='100'
					text='	Maximum number of times this voucher can be redeemed'
				/>
			</fieldset>

			<div className='flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end'>
				<Link href='/voucher' secondary>
					Cancel
				</Link>

				<button
					type='submit'
					disabled={isPending}
					className='rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90'>
					{isPending
						? isEditing
							? "Editing..."
							: "Creating..."
						: isEditing
							? "Edit Voucher"
							: "Create Voucher"}
				</button>
			</div>
			{state.error && <p className='text-red-500'>{state.error}</p>}
			{state.success && <p className='text-green-600'>{state.success}</p>}
		</form>
	);
};

export default VoucherForm;
