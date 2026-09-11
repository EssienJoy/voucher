"use client";
import { useActionState } from "react";
import Input from "./Input";
import Button from "./Button";
import { updateBusiness } from "@/app/_lib/api/action";

const UpdateUser = ({ business }: { business: Business }) => {
	const [state, submitAction, isPending] = useActionState(updateBusiness, {
		error: null,
		success: null,
	});

	return (
		<form action={submitAction} className='space-y-5 '>
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

			<div className='grid place-items-center'>
				<Button type='submit' primary disabled={isPending}>
					{isPending ? "Updating..." : "Update Details"}
				</Button>
			</div>

			{state.error && <p className='text-red-500'>{state.error}</p>}
			{state.success && <p className='text-green-600'>{state.success}</p>}
		</form>
	);
};

export default UpdateUser;
