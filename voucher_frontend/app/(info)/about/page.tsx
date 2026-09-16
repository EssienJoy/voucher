import { Container } from "@/app/_components";
import React from "react";
import {
	Check,
	HelpingHand,
	Target,
	Ticket,
	TrendingUp,
	Users,
	Wallet,
} from "lucide-react";

export const metadata = {
	title: "About",
};

const AboutPage = () => {
	const features = [
		{
			icon: Ticket,
			title: "Create digital vouchers",
			text: "Set up vouchers with custom codes, discounts, and expiry dates.",
		},
		{
			icon: Check,
			title: "Manage voucher codes",
			text: "Keep every code organized from one simple dashboard.",
		},
		{
			icon: Users,
			title: "Validate in seconds",
			text: "Confirm a voucher is valid and redeem it right away.",
		},
		{
			icon: TrendingUp,
			title: "Track status",
			text: "Know exactly which vouchers are active, redeemed, or expired.",
		},
		{
			icon: Wallet,
			title: "Stay organized",
			text: "Keep all your voucher records in one tidy place.",
		},
	];

	return (
		<main className='min-h-dvh py-16'>
			<Container>
				<section className='mx-auto max-w-2xl text-center'>
					<p className='text-sm font-semibold uppercase tracking-widest text-primary'>
						About Voucherly
					</p>

					<h1 className='mt-3 text-4xl font-bold text-text-primary'>
						Simplifying voucher management for businesses.
					</h1>

					<p className='mt-5 text-base leading-7 text-text-secondary'>
						Voucherly helps businesses create, manage, validate, and track their
						vouchers from one simple platform.
					</p>

					<div className='mt-8 flex justify-center'>
						<span className='flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2 text-sm font-semibold text-primary'>
							<HelpingHand size={16} />
							Built for businesses of all sizes
						</span>
					</div>
				</section>

				<section className='mx-auto mt-14 max-w-4xl space-y-10'>
					<div className='rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8'>
						<h2 className='text-xl font-bold text-text-primary'>
							What is Voucherly?
						</h2>

						<p className='mt-3 leading-7 text-text-secondary'>
							Voucherly is a voucher management platform built for businesses
							that want a simple way to manage digital vouchers instead of
							relying on physical tickets or manual records.
						</p>
					</div>

					<div>
						<h2 className='text-center text-xl font-bold text-text-primary'>
							What we help businesses do
						</h2>

						<ul className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
							{features.map((feature) => {
								const Icon = feature.icon;

								return (
									<li
										key={feature.title}
										className='rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur-sm'>
										<span className='flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/50 text-primary'>
											<Icon size={20} />
										</span>

										<h3 className='mt-4 font-bold text-text-primary'>
											{feature.title}
										</h3>

										<p className='mt-1.5 text-sm leading-6 text-text-secondary'>
											{feature.text}
										</p>
									</li>
								);
							})}

							<li className='rounded-2xl bg-primary p-5 text-white shadow-sm'>
								<span className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent'>
									<Target size={20} />
								</span>

								<h3 className='mt-4 font-bold'>Our goal</h3>

								<p className='mt-1.5 text-sm leading-6 text-white/75'>
									To make voucher management simple, organized, and accessible
									for businesses of all sizes.
								</p>
							</li>
						</ul>
					</div>
				</section>
			</Container>
		</main>
	);
};

export default AboutPage;