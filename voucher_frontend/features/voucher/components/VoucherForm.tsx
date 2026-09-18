"use client";
import { Input, Link } from "@/components";
import React, { useActionState } from "react";
import {
	CalendarClock,
	CircleCheck,
	CircleX,
	Lock,
	Percent,
	Save,
	Tags,
} from "lucide-react";

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
	const isLocked =
		defaultValues?.status === "expired" || defaultValues?.status === "redeemed";

	return (
		<form action={submitAction} className='space-y-6'>
			<section className='rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur-sm sm:p-6'>
				<header className='mb-6 flex items-center gap-3'>
					<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-primary'>
						<Tags size={18} />
					</span>

					<div>
						<h2 className='font-bold text-text-primary'>Voucher</h2>

						<p className='text-xs text-text-secondary'>
							Give your voucher a name and the code customers will use.
						</p>
					</div>
				</header>

				<div className='grid gap-5 sm:grid-cols-2'>
					<Input
						type='text'
						label='Voucher title'
						name='title'
						required
						maxLength={30}
						minLength={3}
						defaultValue={defaultValues?.title?.toUpperCase() as string}
						placeHolder='e.g. Welcome Discount'
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

					<div className='sm:col-span-2'>
						<label htmlFor='description' className='text-sm font-semibold'>
							Description:
						</label>

						<textarea
							id='description'
							name='description'
							rows={4}
							defaultValue={defaultValues?.description as string}
							placeholder='e.g. Get 20% off your first order with us.'
							className='mt-3 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
						/>

						<p className='font-bold text-xs text-green-600'>optional</p>
						<p className='text-xs text-text-secondary'>
							Give customers a short explanation of what this voucher offers.
						</p>
					</div>
				</div>
			</section>

			<section className='rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur-sm sm:p-6'>
				<header className='mb-6 flex items-center gap-3'>
					<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-primary'>
						<Percent size={18} />
					</span>

					<div>
						<h2 className='font-bold text-text-primary'>Discount</h2>

						<p className='text-xs text-text-secondary'>
							Set the discount and any spending limits.
						</p>
					</div>
				</header>

				<div className='grid gap-5 sm:grid-cols-2'>
					<div>
						<label htmlFor='discountType' className='text-sm font-semibold'>
							Type:
						</label>

						<select
							id='discountType'
							name='discount_type'
							defaultValue={
								(defaultValues?.discount_type as string) ?? "percentage"
							}
							className='mt-3 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'>
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
						defaultValue={defaultValues?.min_purchase?.toLocaleString() ?? ""}
						min='0'
						placeHolder='₦ 10,000'
						optional={true}
						text='Minimum amount a customer must spend.'
					/>
					<Input
						type='number'
						label='Maximum discount'
						name='max_discount'
						defaultValue={defaultValues?.max_discount?.toLocaleString() ?? ""}
						min='0'
						optional={true}
						placeHolder='₦ 5,000'
						text='Maximum amount the customer can save.'
					/>
				</div>
			</section>

			<section className='rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur-sm sm:p-6'>
				<header className='mb-6 flex items-center gap-3'>
					<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-primary'>
						<CalendarClock size={18} />
					</span>

					<div>
						<h2 className='font-bold text-text-primary'>Date & usage limit</h2>

						<p className='text-xs text-text-secondary'>
							How long the voucher runs and how many times it can be used.
						</p>
					</div>
				</header>

				<div className='grid gap-5 sm:grid-cols-2'>
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
						text='Maximum number of times this voucher can be redeemed.'
					/>
				</div>
			</section>

			{isLocked && (
				<p className='flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800'>
					<Lock size={14} />
					Cannot edit a voucher that is already {defaultValues?.status}.
				</p>
			)}
			{state.error && (
				<p className='flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700'>
					<CircleX size={16} />
					{state.error}
				</p>
			)}
			{state.success && (
				<p className='flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700'>
					<CircleCheck size={16} />
					{state.success}
				</p>
			)}

			<div className='flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end sm:border-t sm:border-black/5'>
				<Link href='/voucher' secondary className='text-center'>
					Cancel
				</Link>

				<button
					type='submit'
					disabled={isPending || isLocked}
					className='flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'>
					<Save size={16} />
					{isPending
						? isEditing
							? "Editing..."
							: "Creating..."
						: isEditing
							? "Edit Voucher"
							: "Create Voucher"}
				</button>
			</div>
		</form>
	);
};

export default VoucherForm;
