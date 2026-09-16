import Container from "./Container";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className='relative mt-16 overflow-hidden border-t border-white/60 bg-white/40 backdrop-blur-xl'>
			<div
				aria-hidden
				className='orb pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-secondary/40 blur-3xl'
			/>
			<div
				aria-hidden
				className='orb pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent/30 blur-3xl'
				style={{ animationDelay: "-8s" }}
			/>
			<div
				aria-hidden
				className='glass-noise pointer-events-none absolute inset-0'
			/>

			<div className='relative'>
				<Container>
					<div className='grid gap-10 py-12 md:grid-cols-3'>
						<div className='md:col-span-2'>
							<h2 className='text-2xl font-bold text-text-primary'>Voucherly</h2>

							<p className='mt-4 max-w-md text-sm leading-6 text-text-secondary'>
								A simple voucher management platform that helps businesses create,
								manage, validate, and track their vouchers with ease.
							</p>
						</div>

						<div className='grid grid-cols-2 gap-8'>
							<div>
								<h3 className='text-sm font-semibold text-text-primary'>
									Product
								</h3>

								<ul className='mt-4 space-y-3 text-sm text-text-secondary'>
									{[
										{ label: "Features", href: "/#features" },
										{ label: "How it works", href: "/#how-it-works" },
										{ label: "Log in", href: "/login" },
										{ label: "Get started", href: "/signup" },
										{ label: "Redeem", href: "/redeem-voucher" },
									].map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												className='transition hover:text-primary'>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>

							<div>
								<h3 className='text-sm font-semibold text-text-primary'>
									Company
								</h3>

								<ul className='mt-4 space-y-3 text-sm text-text-secondary'>
									{[
										{ label: "About", href: "/about" },
										{ label: "Contact", href: "/contact" },
										{ label: "Terms & Privacy", href: "/privacy-terms" },
									].map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												className='transition hover:text-primary'>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					<div className='border-t border-black/5 py-6 text-center text-sm text-text-secondary'>
						<p>© {new Date().getFullYear()} Voucherly. All rights reserved.</p>
					</div>
				</Container>
			</div>
		</footer>
	);
};

export default Footer;
