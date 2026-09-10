import Container from "./Container";
import { ArrowRight, Check } from "lucide-react";
import Link from "./Link";

const Hero = () => {
	const points = [
		"Easy to manage",
		"Track redemptions",
		"Prevent invalid vouchers",
	];
	return (
		<Container>
			<div className='mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center md:py-28'>
				<div className='mb-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm'>
					<span className='h-2 w-2 rounded-full bg-primary' />
					<p>Simple voucher management for businesses</p>
				</div>

				<h1 className='text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-6xl'>
					Manage your business vouchers
					<span className='text-primary'> with ease.</span>
				</h1>

				<p className='mt-6 max-w-2xl text-base leading-7 text-text-secondary md:text-lg'>
					Create, manage, validate, and track your business vouchers from one
					simple platform.
				</p>

				<div className='mt-8 flex flex-col items-center gap-4 sm:flex-row'>
					<Link href='/signup' className='flex gap-3 items-center' primary>
						<span>Get started</span>
						<ArrowRight size={18} />
					</Link>

					<a
						href='#how-it-works'
						className='border border-gray-200 bg-white text-text-primary 
						rounded-md px-4 py-2 font-semibold'>
						See how it works
					</a>
				</div>

				<ul className='mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-text-secondary'>
					{points.map((point, i) => (
						<li key={i + 1} className='flex items-center gap-2'>
							<Check size={16} className='text-primary' />
							{point}
						</li>
					))}
				</ul>
			</div>
		</Container>
	);
};

export default Hero;
