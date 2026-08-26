import React from "react";
import { Container } from "../_components";

const PrivacyPage = () => {
	return (
		<section className='min-h-dvh py-16'>
			<Container>
				<article className='mx-auto max-w-3xl'>
					<header className='border-b border-gray-200 pb-8'>
						<p className='text-sm font-semibold uppercase tracking-wider text-primary'>
							Legal
						</p>

						<h1 className='mt-3 text-4xl font-bold'>Privacy Policy</h1>

						<p className='mt-3 text-sm text-text-secondary'>
							Last updated: August 2026
						</p>
					</header>

					<div className='mt-10 space-y-8 text-sm leading-7 text-text-secondary'>
						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								1. Information we collect
							</h2>

							<p className='mt-3'>
								When you create a Voucherly account, we may collect information
								such as your business name, email address, and account
								information.
							</p>
						</section>

						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								2. How we use your information
							</h2>

							<p className='mt-3'>
								We use the information we collect to provide, maintain, and
								improve Voucherly and to help businesses manage their vouchers.
							</p>
						</section>

						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								3. Voucher data
							</h2>

							<p className='mt-3'>
								Voucher information created through the platform is stored to
								provide voucher management, validation, and tracking
								functionality.
							</p>
						</section>

						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								4. Data security
							</h2>

							<p className='mt-3'>
								We take reasonable measures to protect information stored
								through the platform.
							</p>
						</section>

						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								5. Contact us
							</h2>

							<p className='mt-3'>
								If you have questions about this Privacy Policy, please contact
								us at support@voucherly.com.
							</p>
						</section>
					</div>
				</article>
			</Container>
		</section>
	);
};

export default PrivacyPage;
