import React from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
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
				<section className='mx-auto max-w-2xl text-center'>
					<p className='text-sm font-semibold uppercase tracking-widest text-primary'>
						Contact
					</p>

					<h1 className='mt-3 text-4xl font-bold text-text-primary'>
						How can we help?
					</h1>

					<p className='mt-4 text-text-secondary'>
						Have a question or need help with Voucherly? Get in touch with us.
					</p>
				</section>

				<section className='mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2'>
					{contacts.map((contact) => {
						const Icon = contact.icon;

						return (
							<article
								key={contact.title}
								className='rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm'>
								<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 text-primary'>
									<Icon size={22} />
								</div>

								<h2 className='mt-5 font-bold text-text-primary'>
									{contact.title}
								</h2>

								<p className='mt-2 text-sm text-text-secondary'>
									{contact.text}
								</p>

								<a
									href='mailto:support@voucherly.com'
									className='mt-4 inline-block font-semibold text-primary hover:underline'>
									{contact.mode}
								</a>
							</article>
						);
					})}
				</section>

				<form className='mx-auto mt-10 max-w-4xl rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8'>
					<h2 className='text-xl font-bold text-text-primary'>
						Send us a message
					</h2>

					<p className='mt-1 text-sm text-text-secondary'>
						We&apos;ll get back to you as soon as we can.
					</p>

					<div className='mt-6 grid gap-5'>
						<input
							type='text'
							placeholder='Your name'
							className='rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
						/>

						<input
							type='email'
							placeholder='Your email'
							className='rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
						/>

						<textarea
							placeholder='How can we help?'
							rows={5}
							className='resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10'
						/>

						<button
							type='submit'
							className='flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-sm transition hover:opacity-90 sm:justify-self-end sm:px-8'>
							<Send size={18} />
							Send message
						</button>
					</div>
				</form>
			</Container>
		</main>
	);
};

export default ContactPage;