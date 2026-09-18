import { Container, MobileHeader, VerifyVoucher } from "@/app/_components";
import ArrowBack from "@/app/_components/ArrowBack";
import React from "react";

const VerifyvoucherPage = () => {
	return (
		<>
			<MobileHeader text='Verify Voucher' />

			<section className='py-25 sm:py-15'>
				<Container>
					<div className='mx-auto max-w-xl'>
						<header className='mb-8 flex items-center gap-5'>
							<div className='sm:hidden'>
								<ArrowBack />
							</div>

							<div>
								<h1 className='text-2xl font-bold text-text-primary'>
									Verify a voucher
								</h1>

								<p className='mt-1 text-sm text-text-secondary'>
									Input a voucher code to check its details and validity.
								</p>
							</div>
						</header>

						<VerifyVoucher />
					</div>
				</Container>
			</section>
		</>
	);
};

export default VerifyvoucherPage;
