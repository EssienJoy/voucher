import { Container, Footer, RedeemVoucher } from "@/app/_components";
import Header from "@/app/_components/Header";
import { TicketCheck } from "lucide-react";

export const metadata = {
	title: "Redeem Voucher",
};

const RedeemVoucherPage = async () => {
	return (
		<>
			<Header />

			<main className='min-h-dvh'>
				<section className='py-16'>
					<Container>
						<div className='mx-auto max-w-md text-center'>
							<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
								<TicketCheck size={32} />
							</div>

							<h1 className='mt-6 text-3xl font-bold'>Redeem Voucher</h1>

							<p className='mt-2 text-sm leading-6 text-text-secondary'>
								Enter your voucher code below to check it is valid and redeem
								it for a discount.
							</p>
						</div>

						<div className='mx-auto max-w-md'>
							<RedeemVoucher />
						</div>
					</Container>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default RedeemVoucherPage;