import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/app/_components";

export const metadata = {
	title: "Contact",
};

const ContactPage = () => {
	const contacts = [
		{
			icon: Mail,
			title: "Email us",
			text: "For general questions and support.",
			mode: "support@voucherly.com",
		},
		{
			icon: MessageCircle,
			title: "Support",
			text: "Need help using your voucher management dashboard?",
			mode: "Get support",
		},
	];
	return (
		<main className='min-h-dvh py-16'>
			<Container>
				<section className='text-center'>
					<p className='text-sm font-semibold uppercase tracking-wider text-primary'>
						Contact
					</p>

					<h1 className='mt-3 text-4xl font-bold'>How can we help?</h1>

					<p className='mt-4 text-text-secondary'>
						Have a question or need help with Voucherly? Get in touch with us.
					</p>
				</section>

				<section className='mt-10 grid gap-4 sm:grid-cols-2'>
					{contacts.map((contact) => {
						const Icon = contact.icon;

						return (
							<article key={contact.title} className='rounded-2xl bg-white p-6'>
								<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary'>
									<Icon size={22} />
								</div>

								<h2 className='mt-5 font-bold'>{contact.title}</h2>

								<p className='mt-2 text-sm text-text-secondary'>
									{contact.text}
								</p>

								<a
									href='mailto:support@voucherly.com'
									className='mt-4 block font-semibold text-primary'>
									{contact.mode}
								</a>
							</article>
						);
					})}
				</section>

				<form className='mt-8 rounded-2xl bg-white p-6'>
					<h2 className='text-xl font-bold'>Send us a message</h2>

					<div className='mt-6 grid gap-5'>
						<input
							type='text'
							placeholder='Your name'
							className='rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary'
						/>

						<input
							type='email'
							placeholder='Your email'
							className='rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary'
						/>

						<textarea
							placeholder='How can we help?'
							rows={5}
							className='resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary'
						/>

						<button
							type='submit'
							className='rounded-xl bg-primary px-5 py-3.5 font-semibold text-white transition hover:opacity-90'>
							Send message
						</button>
					</div>
				</form>
			</Container>
		</main>
	);
};

export default ContactPage;
