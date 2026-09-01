import { Container, Footer, Header, VerifyVoucher } from "@/app/_components";
import { TicketCheck } from "lucide-react";

const RedeemVoucherPage = async () => {
	return (
		<>
			<Header />
			<main className='min-h-dvh'>
				<section className='py-16'>
					<Container>
						<div className='mx-auto max-w-md'>
							<div className='text-center'>
								<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
									<TicketCheck size={32} />
								</div>

								<h1 className='mt-6 text-3xl font-bold'>Redeem Voucher</h1>

								<p className='mt-2 text-sm leading-6 text-text-secondary'>
									Enter your voucher code to check if it is valid and redeem it.
								</p>
							</div>

							<VerifyVoucher />
						</div>
					</Container>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default RedeemVoucherPage;
