import { Container, MobileHeader } from "@/app/_components";
import { createVoucher } from "@/app/_lib/api/action";
import VoucherForm from "@/app/_components/VoucherForm";

// export async function generateMetadata({ params }) {
// 	const { name } = await getCabin(params.cabinId);
// 	return { title: `Cabin ${name}` };
// }

export const metadata = {
	title: "Create ",
};

const CreateVoucherPage = () => {
	return (
		<>
			<MobileHeader text='Create Voucher' />

			<section className='py-25'>
				<Container>
					<div className='mx-auto max-w-2xl'>
						<div className='rounded-2xl bg-white p-2 md:p-8'>
							<div className='mb-8'>
								<h1 className='text-2xl font-bold text-text-primary'>
									Create a voucher
								</h1>

								<p className='mt-2 text-sm text-text-secondary'>
									Create a voucher that your customers can use for discounts.
								</p>
							</div>
							<VoucherForm action={createVoucher} />
						</div>
					</div>
				</Container>
			</section>
		</>
	);
};

export default CreateVoucherPage;
