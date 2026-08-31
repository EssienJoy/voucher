"use client";
import { useActionState } from "react";
import { getVoucherByCode } from "../_lib/api/action";
import RedeemVoucher from "./RedeemVoucher";

const VerifyVoucher = () => {
	const [state, submitAction, ispending] = useActionState(getVoucherByCode, {
		error: null,
		data: null,
		success: null,
	});

	return (
		<>
			<form
				action={submitAction}
				className='mt-8 rounded-2xl bg-white p-6 shadow-sm'>
				<div className='grid gap-2'>
					<label htmlFor='voucher' className='text-sm font-semibold'>
						Voucher code
					</label>

					<input
						id='code'
						name='code'
						type='text'
						required
						placeholder='e.g. JOY10'
						defaultValue={state?.data?.code ?? ""}
						className='
										w-full rounded-xl border border-gray-200
										bg-background px-4 py-3
										font-semibold uppercase
										outline-none transition
										focus:border-primary
										focus:ring-2 focus:ring-primary/10
                                        '
					/>
				</div>

				<button
					type='submit'
					disabled={ispending}
					className='
                mt-5 w-full rounded-xl bg-primary
                px-5 py-3.5 font-semibold text-white
                transition hover:opacity-90
                '>
					{ispending ? "Verifying..." : "Verify Voucher"}
				</button>
				{state.error && (
					<p className='text-red-500 text-xs mt-1'>{state.error}</p>
				)}
				{state.success && (
					<p className='text-green-600 text-xs mt-1'>{state.success}</p>
				)}
			</form>

			{state.data && <RedeemVoucher voucher={state.data} />}
		</>
	);
};

export default VerifyVoucher;
