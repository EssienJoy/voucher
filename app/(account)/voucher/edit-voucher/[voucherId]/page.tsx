import { Container, MobileHeader } from "@/app/_components";
import { getVoucher, updateVoucher } from "@/app/_lib/api/action";
import VoucherForm from "@/app/_components/VoucherForm";
import React from "react";
import { notFound } from "next/navigation";

export const metadata = {
	title: "Edit",
};

const page = async ({ params }: { params: Promise<{ voucherId: string }> }) => {
	const { voucherId } = await params;
	const voucher = await getVoucher(voucherId);
	// console.log(voucher);

	if (!voucher) {
		notFound();
	}

	const updateVoucherWithId = updateVoucher.bind(null, voucherId);
	return (
		<>
			<MobileHeader text='Edit Voucher' />

			<section className='py-15'>
				<Container>
					<div className='mx-auto max-w-2xl'>
						<div className='rounded-2xl bg-white p-6 md:p-8'>
							<h1 className='text-2xl font-bold text-text-primary mb-7'>
								Edit voucher
							</h1>
							<VoucherForm
								action={updateVoucherWithId}
								defaultValues={voucher}
							/>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
};

export default page;
