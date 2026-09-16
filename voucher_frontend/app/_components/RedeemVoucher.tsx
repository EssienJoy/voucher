"use client";
import { useActionState, useState } from "react";
import { redeemVoucherPublic } from "../_lib/api/action";
import {
	CircleCheck,
	CircleX,
	Mail,
	Percent,
	Phone,
	ReceiptText,
	Repeat,
	Tags,
	User,
} from "lucide-react";

const RedeemVoucher = () => {
	const [state, formAction, isPending] = useActionState(redeemVoucherPublic, {
		error: null,
		success: null,
		voucher: null,
	});

	const [localError, setLocalError] = useState<string | null>(null);

	const { error, success, voucher } = state;

	const badge = (status: NonNullable<voucher["status"]>) =>
		status === "active"
			? "bg-green-100 text-green-700"
			: status === "redeemed"
				? "bg-blue-100 text-blue-700"
				: "bg-red-100 text-red-700";

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(e.currentTarget);
		const email = formData.get("redemption_email") as string;
		const phoneNumber = formData.get("redemption_phoneNumber") as string;

		if (!email?.trim() && !phoneNumber?.trim()) {
			e.preventDefault();
			setLocalError("Provide at least an email or phone number.");
		} else {
			setLocalError(null);
		}
	};

	return (
		<form action={formAction} onSubmit={handleSubmit}>
			<div className='mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white/70 shadow-sm backdrop-blur-sm'>
				<div className='flex items-center gap-3 px-6 pt-6'>
					<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/60 text-primary'>
						<Tags size={20} />
					</span>

					<div>
						<p className='text-xs text-text-secondary'>Redeem a voucher</p>

						<h2 className='text-xl font-bold text-primary'>
							{voucher?.code?.toUpperCase() ?? "Redeem Voucher"}
						</h2>
					</div>
				</div>

				<div className='space-y-4 px-6 pt-6'>
					<div className='grid gap-2'>
						<label htmlFor='code' className='text-sm font-semibold'>
							Voucher code
						</label>

						<input
							id='code'
							name='code'
							type='text'
							required
							placeholder='e.g. JOY10'
							disabled={Boolean(success)}
							className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-semibold uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-50'
						/>
					</div>
				</div>

				<div className='px-6 pt-6'>
					<p className='text-xs font-semibold uppercase tracking-wide text-text-secondary'>
						Customer details
					</p>

					<div className='mt-3 space-y-3'>
						<div className='relative'>
							<User
								size={16}
								className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary'
							/>

							<input
								name='redeemed_by'
								type='text'
								placeholder='Name (optional)'
								disabled={Boolean(success)}
								className='w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-50'
							/>
						</div>

						<div className='relative'>
							<Mail
								size={16}
								className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary'
							/>

							<input
								name='redemption_email'
								type='email'
								placeholder='Email (optional)'
								disabled={Boolean(success)}
								className='w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-50'
							/>
						</div>

						<div className='relative'>
							<Phone
								size={16}
								className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary'
							/>

							<input
								name='redemption_phoneNumber'
								type='tel'
								placeholder='Phone number (optional)'
								disabled={Boolean(success)}
								className='w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-50'
							/>
						</div>

						<p className='text-xs text-text-secondary'>
							Provide at least an email or a phone number.
						</p>
					</div>
				</div>

				<div className='px-6 pb-6 pt-6'>
					<button
						type='submit'
						disabled={isPending || Boolean(success)}
						className='flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'>
						<Repeat size={18} />
						{isPending ? "Redeeming..." : "Redeem Voucher"}
					</button>
				</div>

				{(localError || error) && (
					<p className='mx-6 mb-6 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-700'>
						<CircleX size={14} />
						{localError ?? error}
					</p>
				)}

				{success && (
					<div className='mx-6 mb-6 space-y-3'>
						<p className='flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-xs font-medium text-green-700'>
							<CircleCheck size={14} />
							{success}
						</p>

						{voucher && (
							<div className='space-y-2.5'>
								<div className='flex items-center gap-3 rounded-xl bg-secondary/30 px-4 py-3'>
									<Percent size={16} className='shrink-0 text-primary' />

									<div className='flex flex-1 items-center justify-between'>
										<span className='text-xs text-text-secondary'>Offer</span>

										<span className='font-semibold text-text-primary'>
											{voucher.discount_value}
											{voucher.discount_type === "percentage" ? "%" : ""} off
										</span>
									</div>
								</div>

								<div className='flex items-center gap-3 rounded-xl bg-secondary/30 px-4 py-3'>
									<ReceiptText size={16} className='shrink-0 text-primary' />

									<div className='flex flex-1 items-center justify-between'>
										<span className='text-xs text-text-secondary'>Redemptions</span>

										<span className='font-semibold text-text-primary'>
											{voucher.redemption_count} / {voucher.usage_limit ?? "∞"}
										</span>
									</div>
								</div>

								<span
									className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${badge(
										voucher.status,
									)}`}>
									{voucher.status}
								</span>
							</div>
						)}
					</div>
				)}
			</div>
		</form>
	);
};

export default RedeemVoucher;