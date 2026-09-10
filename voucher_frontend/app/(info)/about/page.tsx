import { Container } from "@/app/_components";
import React from "react";

export const metadata = {
	title: "About",
};

const AboutPage = () => {
	return (
		<main className='min-h-dvh py-16'>
			<Container>
				<section className='text-center max-w-2xl mx-auto'>
					<p className='text-sm font-semibold uppercase tracking-wider text-primary'>
						About Voucherly
					</p>

					<h1 className='mt-3 text-4xl font-bold'>
						Simplifying voucher management for businesses.
					</h1>

					<p className='mt-5 text-base leading-7 text-text-secondary'>
						Voucherly helps businesses create, manage, validate, and track their
						vouchers from one simple platform.
					</p>
				</section>

				<div className='mt-12 space-y-8 max-w-4xl mx-auto'>
					<section className=''>
						<h2 className='text-xl text-center font-bold'>
							What is Voucherly?
						</h2>

						<p className='mt-3 leading-7 text-text-secondary'>
							Voucherly is a voucher management platform built for businesses
							that want a simple way to manage digital vouchers instead of
							relying on physical tickets or manual records.
						</p>
					</section>

					<section className=''>
						<h2 className='text-xl font-bold text-center'>
							What we help businesses do
						</h2>

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
			</Container>
		</main>
	);
};

export default AboutPage;
