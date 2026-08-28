import React from "react";
import { Container } from "@/app/_components";

export const metadata = {
	title: "Terms & Privacy",
};

const PrivacyPage = () => {
	const privacyAndTerms = [
		{
			legal: "Legal",
			title: "Terms of Service",
			updatedAt: "August 2026",
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
			rules: [
				{
					title: " Information we collect",
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
		<section className='min-h-dvh py-16'>
			<Container>
				{privacyAndTerms.map((rules) => (
					<article key={rules.title} className='mx-auto max-w-3xl'>
						<header className='border-b border-gray-200 pb-8'>
							<p className='text-sm font-semibold uppercase tracking-wider text-primary'>
								{rules.legal}
							</p>

							<h1 className='mt-3 text-4xl font-bold'>{rules.title}</h1>

							<p className='mt-3 text-sm text-text-secondary'>
								Last updated: {rules.updatedAt}
							</p>
						</header>

						<ul className='mt-10 space-y-8 text-sm leading-7 text-text-secondary'>
							{rules.rules.map((rule, i) => (
								<li key={rule.text}>
									<h2 className='text-xl font-bold text-text-primary'>
										{i + 1}. {rule.title}
									</h2>

									<p className='mt-3'>{rule.text}</p>
								</li>
							))}
						</ul>
					</article>
				))}
			</Container>
		</section>
	);
};

export default PrivacyPage;
