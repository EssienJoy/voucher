import React from "react";
import Container from "./Container";
import { CheckCircle, Share2, TicketCheck } from "lucide-react";

const About = () => {
	return (
		<section className='py-20'>
			<Container>
				{/* How it works */}
				<section id='how-it-works'>
					<div className='mx-auto max-w-2xl text-center'>
						<p className='text-sm font-semibold uppercase tracking-wider text-primary'>
							How it works
						</p>

						<h2 className='mt-2 text-3xl font-bold text-text-primary'>
							Vouchers made simple
						</h2>

						<p className='mt-3 text-text-secondary'>
							Create your voucher, share it with customers, and keep track of
							every redemption.
						</p>
					</div>

					<div className='mt-10 grid gap-5 md:grid-cols-3'>
						{/* Step 1 */}
						<div className='rounded-2xl bg-white p-6'>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
								<TicketCheck size={24} />
							</div>

							<p className='mt-5 text-sm font-semibold text-primary'>01</p>

							<h3 className='mt-1 text-xl font-bold'>Create a voucher</h3>

							<p className='mt-2 text-sm leading-6 text-text-secondary'>
								Create a voucher with a unique code, discount, usage limit, and
								expiry date.
							</p>
						</div>

						{/* Step 2 */}
						<div className='rounded-2xl bg-white p-6'>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
								<Share2 size={24} />
							</div>

							<p className='mt-5 text-sm font-semibold text-primary'>02</p>

							<h3 className='mt-1 text-xl font-bold'>Share the voucher</h3>

							<p className='mt-2 text-sm leading-6 text-text-secondary'>
								Give your voucher code to customers through your preferred
								channel.
							</p>
						</div>

						{/* Step 3 */}
						<div className='rounded-2xl bg-white p-6'>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
								<CheckCircle size={24} />
							</div>

							<p className='mt-5 text-sm font-semibold text-primary'>03</p>

							<h3 className='mt-1 text-xl font-bold'>Validate & redeem</h3>

							<p className='mt-2 text-sm leading-6 text-text-secondary'>
								Validate voucher codes and keep track of their redemption
								status.
							</p>
						</div>
					</div>
				</section>

				{/* Why use it */}
				<section id='features' className='mt-24'>
					<div className='mx-auto max-w-2xl text-center'>
						<p className='text-sm font-semibold uppercase tracking-wider text-primary'>
							Why Voucherly?
						</p>

						<h2 className='mt-2 text-3xl font-bold text-text-primary'>
							Everything you need to manage vouchers
						</h2>
					</div>

					<div className='mx-auto mt-10 max-w-xl space-y-4'>
						<div className='flex items-center gap-4 rounded-2xl bg-white p-5'>
							<CheckCircle className='shrink-0 text-primary' size={22} />

							<div>
								<h3 className='font-semibold'>Easy voucher management</h3>

								<p className='mt-1 text-sm text-text-secondary'>
									Create and manage all your vouchers from one place.
								</p>
							</div>
						</div>

						<div className='flex items-center gap-4 rounded-2xl bg-white p-5'>
							<CheckCircle className='shrink-0 text-primary' size={22} />

							<div>
								<h3 className='font-semibold'>Prevent invalid vouchers</h3>

								<p className='mt-1 text-sm text-text-secondary'>
									Know whether a voucher is active, used, or expired.
								</p>
							</div>
						</div>

						<div className='flex items-center gap-4 rounded-2xl bg-white p-5'>
							<CheckCircle className='shrink-0 text-primary' size={22} />

							<div>
								<h3 className='font-semibold'>Track voucher activity</h3>

								<p className='mt-1 text-sm text-text-secondary'>
									Keep a clear record of your voucher activity.
								</p>
							</div>
						</div>
					</div>
				</section>
			</Container>
		</section>
	);
};

export default About;
