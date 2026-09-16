"use client";
import { useActionState } from "react";
import { getVoucherByCode } from "../_lib/api/action";
import {
	CalendarClock,
	CircleCheck,
	CircleX,
	Percent,
	ReceiptText,
	Search,
	TicketCheck,
} from "lucide-react";

const VerifyVoucher = () => {
	const [state, submitAction, isPending] = useActionState(getVoucherByCode, {
		error: null,
		success: null,
		data: null,
	});

	const voucher = state.data;

	const badge = (status: NonNullable<voucher["status"]>) =>
		status === "active"
			? "bg-green-100 text-green-700"
			: status === "redeemed" || status === "exhausted"
				? "bg-blue-100 text-blue-700"
				: "bg-red-100 text-red-700";

	const redemptionPercent = (used: number, limit: number | null) => {
		if (!limit || limit <= 0) return 0;
		return Math.min(100, Math.round((used / limit) * 100));
	};

	return (
		<>
			<form
				action={submitAction}
				className='rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm'>
				<div className='mb-5 flex items-center gap-3'>
					<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/60 text-primary'>
						<TicketCheck size={20} />
					</span>

					<div>
						<p className='text-xs text-text-secondary'>Check a voucher</p>

						<h2 className='text-lg font-bold text-text-primary'>
							Verify a voucher code
						</h2>
					</div>
				</div>

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
						defaultValue={voucher?.code ?? ""}
						className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-semibold uppercase outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
					/>
				</div>

				<button
					type='submit'
					disabled={isPending}
					className='mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'>
					<Search size={18} />
					{isPending ? "Verifying..." : "Verify Voucher"}
				</button>

				{state.error && (
					<p className='mt-3 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-700'>
						<CircleX size={14} />
						{state.error}
					</p>
				)}
			</form>

			{voucher && (
				<div className='mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white/70 shadow-sm backdrop-blur-sm'>
					<div className='px-6 pt-6'>
						<p className='flex items-center gap-2 text-sm font-semibold text-green-700'>
							<CircleCheck size={16} />
							Voucher is valid
						</p>

						<div className='mt-4 flex items-start justify-between gap-4'>
							<div className='min-w-0'>
								<p className='truncate text-lg font-bold capitalize text-text-primary'>
									{voucher.title}
								</p>

								<p className='mt-1 text-sm text-text-secondary'>
									{voucher.discount_value} off
								</p>
							</div>

							<span
								className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${badge(
									voucher.status,
								)}`}>
								{voucher.status}
							</span>
						</div>
					</div>

					<div className='px-6 pt-5'>
						<div className='rounded-xl bg-secondary/40 p-4'>
							<p className='text-xs font-medium uppercase tracking-wide text-text-secondary'>
								Voucher code
							</p>

							<p className='mt-1 text-xl font-bold uppercase tracking-wider text-primary'>
								{voucher.code}
							</p>
						</div>
					</div>

					<div className='space-y-2.5 px-6 pt-5'>
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
							<CalendarClock size={16} className='shrink-0 text-primary' />

							<div className='flex flex-1 items-center justify-between'>
								<span className='text-xs text-text-secondary'>Expires</span>

								<span className='font-semibold text-text-primary'>
									{new Date(voucher.expiry_date).toLocaleDateString()}
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
					</div>

					<div className='px-6 pb-6 pt-4'>
						<div className='h-1.5 overflow-hidden rounded-full bg-gray-200'>
							<div
								className='h-full rounded-full bg-primary'
								style={{
									width: `${redemptionPercent(
										voucher.redemption_count,
										voucher.usage_limit,
									)}%`,
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default VerifyVoucher;