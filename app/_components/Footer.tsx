import Container from "./Container";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className='bg-[#13013D] py-12 text-white'>
			<Container>
				<div className='grid gap-10 md:grid-cols-3'>
					{/* Brand */}
					<div className='md:col-span-2'>
						<h2 className='text-2xl font-bold'>Voucherly</h2>

						<p className='mt-4 max-w-md text-sm leading-6 text-[#AEA9EF]'>
							A simple voucher management platform that helps businesses create,
							manage, validate, and track their vouchers with ease.
						</p>
					</div>

					{/* Links */}
					<div className='grid grid-cols-2 gap-8'>
						<div>
							<h3 className='text-sm font-semibold'>Product</h3>

							<ul className='mt-4 space-y-3 text-sm text-[#AEA9EF]'>
								<li>
									<a href='#features' className='transition hover:text-white'>
										Features
									</a>
								</li>

								<li>
									<a
										href='#how-it-works'
										className='transition hover:text-white'>
										How it works
									</a>
								</li>

								<li>
									<Link href='/login' className='transition hover:text-white'>
										Log in
									</Link>
								</li>

								<li>
									<Link href='/signup' className='transition hover:text-white'>
										Get started
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='text-sm font-semibold'>Company</h3>

							<ul className='mt-4 space-y-3 text-sm text-[#AEA9EF]'>
								<li>
									<a href='#' className='transition hover:text-white'>
										About
									</a>
								</li>

								<li>
									<a href='#' className='transition hover:text-white'>
										Contact
									</a>
								</li>

								<li>
									<a href='#' className='transition hover:text-white'>
										Privacy
									</a>
								</li>

								<li>
									<a href='#' className='transition hover:text-white'>
										Terms
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='mt-10 border-t border-white/10 pt-6 text-center text-sm text-[#AEA9EF]'>
					<p>© {new Date().getFullYear()} Voucherly. All rights reserved.</p>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
