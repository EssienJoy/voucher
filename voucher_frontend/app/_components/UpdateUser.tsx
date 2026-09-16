"use client";
import { useActionState } from "react";
import Input from "./Input";
import Button from "./Button";
import { updateBusiness } from "@/app/_lib/api/action";
import { CircleCheck, CircleX, Save } from "lucide-react";

const UpdateUser = ({ business }: { business: Business }) => {
	const [state, submitAction, isPending] = useActionState(updateBusiness, {
		error: null,
		success: null,
	});

	return (
		<form action={submitAction} className='space-y-5'>
			<div className='rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm'>
				<div className='mb-5'>
					<h2 className='text-lg font-bold text-text-primary'>Business details</h2>

					<p className='mt-1 text-sm text-text-secondary'>
						Update the information shown to customers on your vouchers.
					</p>
				</div>

				<div className='space-y-5'>
					<Input
						type='text'
						name='business_name'
						label='Business Name'
						required
						minLength={2}
						defaultValue={business?.business_name ?? ""}
						placeHolder='e.g. Acme Inc.'
					/>
					<Input
						disabled
						type='text'
						name='email'
						label='Email'
						placeHolder={business?.email ?? "Not Provided"}
					/>
					<Input
						disabled
						type='text'
						name='created_at'
						label='Account Created'
						placeHolder={
							business?.createdAt
								? new Date(business.createdAt).toLocaleDateString()
								: "Not Provided"
						}
					/>
				</div>

				<div className='mt-6 flex justify-end border-t border-black/5 pt-5'>
					<Button type='submit' primary disabled={isPending} className='flex items-center gap-2'>
						<Save size={16} />
						{isPending ? "Updating..." : "Update Details"}
					</Button>
				</div>
			</div>

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
		</form>
	);
};

export default UpdateUser;