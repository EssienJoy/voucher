import Container from "./Container";

const Footer = () => {
	return (
		<footer className=' mt-5 py-5  bg-[#13013d] text-white'>
			<Container>
				<div className='grid gap-10 md:grid-cols-2 lg:grid-cols-4'>
					{/* Brand */}
					<div className='lg:col-span-2'>
						<h2 className='text-2xl font-bold'>Voucherly</h2>

						<p className='mt-4 max-w-md text-sm leading-6 text-[#AEA9EF]'>
							A simple voucher management platform that helps businesses create,
							manage, validate, and track their vouchers with ease.
						</p>
					</div>

					<section className='flex gap-10'>
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
									<a href='/login' className='transition hover:text-white'>
										Login
									</a>
								</li>

								<li>
									<a href='/signup' className='transition hover:text-white'>
										Get started
									</a>
								</li>
							</ul>
						</div>

						{/* Company */}
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
					</section>
				</div>

				<div className='mt-12  gap-4 border-t border-white/10 pt-6 text-sm text-accent text-center'>
					<p>© {new Date().getFullYear()} Voucherly. All rights reserved.</p>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
