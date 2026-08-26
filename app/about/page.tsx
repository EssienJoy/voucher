import React from "react";
import { Container } from "../_components";

const AboutPage = () => {
	return (
		<section className='min-h-dvh py-16'>
			<Container>
				<div className='mx-auto max-w-3xl'>
					<div className='text-center'>
						<p className='text-sm font-semibold uppercase tracking-wider text-primary'>
							About Voucherly
						</p>

						<h1 className='mt-3 text-4xl font-bold'>
							Simplifying voucher management for businesses.
						</h1>

						<p className='mt-5 text-base leading-7 text-text-secondary'>
							Voucherly helps businesses create, manage, validate, and track
							their vouchers from one simple platform.
						</p>
					</div>

					<div className='mt-12 space-y-8'>
						<section className='rounded-2xl bg-white p-6'>
							<h2 className='text-xl font-bold'>What is Voucherly?</h2>

							<p className='mt-3 leading-7 text-text-secondary'>
								Voucherly is a voucher management platform built for businesses
								that want a simple way to manage digital vouchers instead of
								relying on physical tickets or manual records.
							</p>
						</section>

						<section className='rounded-2xl bg-white p-6'>
							<h2 className='text-xl font-bold'>What we help businesses do</h2>

							<ul className='mt-4 space-y-3 text-text-secondary'>
								<li>✓ Create digital vouchers</li>
								<li>✓ Manage voucher codes</li>
								<li>✓ Validate vouchers</li>
								<li>✓ Track voucher status</li>
								<li>✓ Keep voucher records organized</li>
							</ul>
						</section>

						<section className='rounded-2xl bg-primary p-6 text-white'>
							<h2 className='text-xl font-bold'>Our goal</h2>

							<p className='mt-3 leading-7 text-white/75'>
								To make voucher management simple, organized, and accessible for
								businesses of all sizes.
							</p>
						</section>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default AboutPage;
