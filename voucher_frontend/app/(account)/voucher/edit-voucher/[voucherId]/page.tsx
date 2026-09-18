import { Container, MobileHeader } from "@/components";
import VoucherForm from "@/features/voucher/components/VoucherForm";
import { notFound } from "next/navigation";
import ArrowBack from "@/components/ui/ArrowBack";
import { getVoucher } from "@/features/voucher/lib/data-service";
import { updateVoucher } from "@/features/voucher/lib/action";

export const metadata = {
	title: "Edit",
};

const page = async ({ params }: { params: Promise<{ voucherId: string }> }) => {
	const { voucherId } = await params;
	const voucher = await getVoucher(voucherId);

	if (!voucher) {
		notFound();
	}

	const updateVoucherWithId = updateVoucher.bind(null, voucherId);
	return (
		<>
			<MobileHeader text='Edit Voucher' />

			<section className='py-25 sm:py-15'>
				<Container>
					<div className='mx-auto max-w-2xl'>
						<header className='mb-8 flex items-center gap-5'>
							<div className='sm:hidden'>
								<ArrowBack />
							</div>
							<div>
								<h1 className='text-2xl font-bold text-text-primary'>
									Edit voucher
								</h1>
							</div>
						</header>

						<VoucherForm action={updateVoucherWithId} defaultValues={voucher} />
					</div>
				</Container>
			</section>
		</>
	);
};

export default page;
