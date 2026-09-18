import Container from "./ui/Container";
import { CheckCircle, Share2, TicketCheck } from "lucide-react";

const HowItWorks = () => {
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
			<section id='how-it-works' className='py-16 pt-12 md:py-20'>
				<div className='mx-auto max-w-2xl text-center'>
					<div className='mx-auto flex w-fit items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm'>
						<span className='h-2 w-2 animate-pulse rounded-full bg-primary' />
						How it works
					</div>

					<h2 className='mt-4 text-3xl font-bold text-text-primary md:text-4xl'>
						Vouchers made{" "}
						<span className='bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent'>
							simple.
						</span>
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
							<article
								key={step.num}
								className='rounded-2xl border border-white/60 bg-white/50 p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-lg'>
								<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
									<Icon size={24} />
								</div>

								<p className='mt-5 text-sm font-semibold text-primary'>
									Step {step.num}
								</p>

								<h3 className='mt-1 text-xl font-bold text-text-primary'>
									{step.title}
								</h3>

								<p className='mt-2 text-sm leading-6 text-text-secondary'>
									{step.text}
								</p>
							</article>
						);
					})}
				</div>
			</section>

			<section id='features' className='py-16 md:py-20'>
				<div className='mx-auto max-w-2xl text-center'>
					<div className='mx-auto flex w-fit items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm'>
						<span className='h-2 w-2 animate-pulse rounded-full bg-primary' />
						Why Voucherly?
					</div>

					<h2 className='mt-4 text-3xl font-bold text-text-primary md:text-4xl'>
						Everything you need to{" "}
						<span className='bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent'>
							manage vouchers
						</span>
					</h2>
				</div>

				<div className='mx-auto mt-10 max-w-xl space-y-4'>
					{useVoucherly.map((point, i) => (
						<article
							key={i + 1}
							className='flex items-center gap-4 rounded-2xl border border-white/60 bg-white/50 p-5 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-lg'>
							<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
								<CheckCircle size={22} />
							</span>

							<div>
								<h3 className='font-semibold text-text-primary'>
									{point.title}
								</h3>

								<p className='mt-1 text-sm text-text-secondary'>{point.text}</p>
							</div>
						</article>
					))}
				</div>
			</section>
		</Container>
	);
};

export default HowItWorks;
