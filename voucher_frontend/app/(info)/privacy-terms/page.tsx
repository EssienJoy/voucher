import React from "react";
import { Container } from "@/app/_components";
import { FileText, Lock, ShieldCheck, ScrollText } from "lucide-react";

export const metadata = {
	title: "Terms & Privacy",
};

const PrivacyPage = () => {
	const privacyAndTerms = [
		{
			legal: "Legal",
			title: "Terms of Service",
			updatedAt: "August 2026",
			icon: ScrollText,
			rules: [
				{
					title: "Using Voucherly",
					text: "By using Voucherly, you agree to use the platform responsibly and in accordance with these terms.",
				},
				{
					title: "Your account",
					text: "You are responsible for keeping your account information secure and for activities performed through your account.",
				},
				{
					title: "Voucher",
					text: "Businesses are responsible for the vouchers they create, including their codes, discounts, usage limits, and expiration dates.",
				},
				{
					title: "Prohibited use",
					text: "You must not use Voucherly for fraudulent, illegal, abusive, or unauthorized activities.",
				},
				{
					title: "Changes to these terms",
					text: "We may update these terms when necessary. Continued use of Voucherly after changes are made means you accept the updated terms.",
				},
				{
					title: "Contact",
					text: "If you have questions about these terms, contact us at support@voucherly.com.",
				},
			],
		},
		{
			legal: "Legal",
			title: "Privacy Policy",
			updatedAt: "August 2026",
			icon: ShieldCheck,
			rules: [
				{
					title: "Information we collect",
					text: "When you create a Voucherly account, we may collect information such as your business name, email address, and account information.",
				},
				{
					title: "How we use your information",
					text: "We use the information we collect to provide, maintain, and improve Voucherly and to help businesses manage their vouchers.",
				},
				{
					title: "Voucher Data",
					text: "Voucher information created through the platform is stored to provide voucher management, validation, and tracking functionality.",
				},
				{
					title: "Data security",
					text: "We take reasonable measures to protect information stored through the platform.",
				},
				{
					title: "Contact Us",
					text: "If you have questions about this Privacy Policy, please contact us at support@voucherly.com.",
				},
			],
		},
	];
	return (
		<main className='min-h-dvh py-16'>
			<Container>
				<div className='space-y-10'>
					{privacyAndTerms.map((rules) => {
					const Icon = rules.icon;

					return (
						<article
							key={rules.title}
							className='mx-auto max-w-3xl rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-10'>
							<header className='border-b border-black/5 pb-8'>
								<div className='flex items-center gap-4'>
									<span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/50 text-primary'>
										<Icon size={22} />
									</span>

									<div>
										<p className='text-sm font-semibold uppercase tracking-widest text-primary'>
											{rules.legal}
										</p>

										<h1 className='mt-1 text-3xl font-bold text-text-primary'>
											{rules.title}
										</h1>
									</div>
								</div>

								<p className='mt-5 flex items-center gap-1.5 text-sm text-text-secondary'>
									<Lock size={14} />
									Last updated: {rules.updatedAt}
								</p>
							</header>

							<ul className='mt-10 space-y-8'>
								{rules.rules.map((rule, i) => (
									<li key={rule.title} className='flex gap-5'>
										<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/50 text-sm font-bold text-primary'>
											{i + 1}
										</span>

										<div>
											<h2 className='text-lg font-bold text-text-primary'>
												{rule.title}
											</h2>

											<p className='mt-2 text-sm leading-7 text-text-secondary'>
												{rule.text}
											</p>
										</div>
									</li>
								))}
							</ul>
						</article>
					);
				} )}
				</div>

				<p className='mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 text-sm text-text-secondary'>
					<FileText size={14} />
					Questions? Email{" "}
					<a
						href='mailto:support@voucherly.com'
						className='font-semibold text-primary hover:underline'>
						support@voucherly.com
					</a>
				</p>
			</Container>
		</main>
	);
};

export default PrivacyPage;