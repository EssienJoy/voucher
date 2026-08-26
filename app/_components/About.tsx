import React from "react";
import Container from "./Container";
import { CheckCircle, Share2, TicketCheck } from "lucide-react";

const About = () => {
	const steps = [
		{
			icon: CheckCircle,
			num: "1",
			title: "Create a voucher",
			text: "Create a voucher with a unique code, discount, usage limit, and expiry date.",
		},
		{
			icon: Share2,
			num: "2",
			title: "Share the voucher",
			text: "Give your voucher code to customers through your preferred channel.",
		},
		{
			icon: TicketCheck,
			num: "3",
			title: "Validate & redeem",
			text: "Validate voucher codes and keep track of their redemption status.",
		},
	];

	const useVoucherly = [
		{
			title: "Easy voucher management",
			text: "Create and manage all your vouchers from one place.",
		},
		{
			title: "Prevent invalid vouchers",
			text: "Know whether a voucher is active, used, or expired.",
		},
		{
			title: "Track voucher activity",
			text: "Keep a clear record of your voucher activity.",
		},
	];

	return (
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
					{steps.map((step) => {
						const Icon = step.icon;
						return (
							<article key={step.num} className='rounded-2xl bg-white p-6'>
								<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
									<Icon size={24} />
								</div>

								<p className='mt-5 text-sm font-semibold text-primary'>
									{step.num}
								</p>

								<h3 className='mt-1 text-xl font-bold'>{step.title}</h3>

								<p className='mt-2 text-sm leading-6 text-text-secondary'>
									{step.text}
								</p>
							</article>
						);
					})}
				</div>
			</section>

			<section id='features' className='my-20'>
				<div className='mx-auto max-w-2xl text-center'>
					<p className='text-sm font-semibold uppercase tracking-wider text-primary'>
						Why Voucherly?
					</p>

					<h2 className='mt-2 text-3xl font-bold text-text-primary'>
						Everything you need to manage vouchers
					</h2>
				</div>

				<div className='mx-auto mt-10 max-w-xl space-y-4'>
					{useVoucherly.map((point, i) => (
						<article
							key={i + 1}
							className='flex items-center gap-4 rounded-2xl bg-white p-5'>
							<CheckCircle className='shrink-0 text-primary' size={22} />

							<div>
								<h3 className='font-semibold'>{point.title}</h3>

								<p className='mt-1 text-sm text-text-secondary'>{point.text}</p>
							</div>
						</article>
					))}
				</div>
			</section>
		</Container>
	);
};

export default About;
