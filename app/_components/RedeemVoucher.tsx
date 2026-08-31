"use client";
import { useTransition, useState } from "react";
import { redeemVoucher } from "../_lib/api/action";

const RedeemVoucher = ({ voucher }: { voucher: redeemVoucher }) => {
	// console.log(voucher);
	const [isPending, startTransition] = useTransition();
	const [message, setMessage] = useState<{
		error: string | null;
		success: string | null;
	}>({
		error: null,
		success: null,
	});

	const handleRedeem = () => {
		startTransition(async () => {
			const result = await redeemVoucher(voucher.id, voucher.business_id);
			setMessage({ error: result.error, success: result.success });
		});
	};
	return (
		<div className='mt-6 rounded-2xl border border-gray-200 bg-white p-6'>
			<div className='flex items-start justify-between'>
				<div>
					<p className='text-xs font-semibold uppercase text-text-secondary'>
						Voucher
					</p>

					<h2 className='mt-1 text-xl font-bold uppercase'>{voucher?.code}</h2>
				</div>

				<span className='rounded-full capitalize bg-green-50 px-3 py-1 text-xs font-semibold text-green-700'>
					{voucher?.status}
				</span>
			</div>

			<div className='mt-5 space-y-3 text-sm'>
				<div className='flex justify-between'>
					<span className='text-text-secondary'>Offer</span>

					<span className='font-semibold'>
						{voucher.discount_value}
						{voucher.discount_type ? "%" : ""} off
					</span>
				</div>

				<div className='flex justify-between'>
					<span className='text-text-secondary'>Expires</span>

					<span className='font-semibold'>
						{new Date(voucher.expiry_date).toLocaleDateString()}
					</span>
				</div>
			</div>

			<button
				type='button'
				onClick={handleRedeem}
				disabled={isPending}
				className='
                mt-6 w-full rounded-xl
                border-2 border-primary
                px-5 py-3 font-semibold text-primary
                transition hover:bg-primary hover:text-white
                disabled:opacity-50
        '>
				{isPending ? "Redeeming..." : "Redeem Voucher"}
			</button>

			{message.error && (
				<p className='text-red-500 text-xs mt-2'>{message.error}</p>
			)}
			{message.success && (
				<p className='text-green-600 text-xs mt-2'>{message.success}</p>
			)}
		</div>
	);
};

export default RedeemVoucher;
