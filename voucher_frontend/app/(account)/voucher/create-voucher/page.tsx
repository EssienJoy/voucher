import { Container, MobileHeader } from "@/app/_components";
import { createVoucher } from "@/app/_lib/api/action";
import VoucherForm from "@/app/_components/VoucherForm";
import ArrowBack from "@/app/_components/ArrowBack";

export const metadata = {
	title: "Create ",
};

const CreateVoucherPage = () => {
	return (
		<>
			<MobileHeader text='Create Voucher' />

			<section className='py-25 sm:py-15'>
				<Container>
					<div className='mx-auto max-w-2xl'>
						<header className='mb-8 flex items-center gap-5'>
							<div className='sm:hidden'>
								<ArrowBack />
							</div>
							<div>
								<h1 className='text-2xl font-bold text-text-primary'>
									Create a voucher
								</h1>

								<p className='mt-1 text-sm text-text-secondary'>
									Create a voucher that your customers can use for discounts.
								</p>
							</div>
						</header>

						<VoucherForm action={createVoucher} />
					</div>
				</Container>
			</section>
		</>
	);
};

export default CreateVoucherPage;
