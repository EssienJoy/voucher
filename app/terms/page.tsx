import { Container } from "../_components";

const TermsPage = () => {
	return (
		<section className='min-h-dvh py-16'>
			<Container>
				<article className='mx-auto max-w-3xl'>
					<header className='border-b border-gray-200 pb-8'>
						<p className='text-sm font-semibold uppercase tracking-wider text-primary'>
							Legal
						</p>

						<h1 className='mt-3 text-4xl font-bold'>Terms of Service</h1>

						<p className='mt-3 text-sm text-text-secondary'>
							Last updated: August 2026
						</p>
					</header>

					<div className='mt-10 space-y-8 text-sm leading-7 text-text-secondary'>
						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								1. Using Voucherly
							</h2>

							<p className='mt-3'>
								By using Voucherly, you agree to use the platform responsibly
								and in accordance with these terms.
							</p>
						</section>

						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								2. Your account
							</h2>

							<p className='mt-3'>
								You are responsible for keeping your account information secure
								and for activities performed through your account.
							</p>
						</section>

						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								3. Vouchers
							</h2>

							<p className='mt-3'>
								Businesses are responsible for the vouchers they create,
								including their codes, discounts, usage limits, and expiration
								dates.
							</p>
						</section>

						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								4. Prohibited use
							</h2>

							<p className='mt-3'>
								You must not use Voucherly for fraudulent, illegal, abusive, or
								unauthorized activities.
							</p>
						</section>

						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								5. Changes to these terms
							</h2>

							<p className='mt-3'>
								We may update these terms when necessary. Continued use of
								Voucherly after changes are made means you accept the updated
								terms.
							</p>
						</section>

						<section>
							<h2 className='text-xl font-bold text-text-primary'>
								6. Contact
							</h2>

							<p className='mt-3'>
								If you have questions about these terms, contact us at
								support@voucherly.com.
							</p>
						</section>
					</div>
				</article>
			</Container>
		</section>
	);
};

export default TermsPage;
