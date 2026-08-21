import React from "react";
import Container from "./Container";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const Hero = () => {
	return (
		<section className='overflow-hidden'>
			<Container>
				<div className='mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center md:py-28'>
					{/* Small badge */}
					<div className='mb-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm'>
						<span className='h-2 w-2 rounded-full bg-primary' />
						Simple voucher management for businesses
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
						<Link
							href='/signup'
							className='flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:opacity-90'>
							Get started
							<ArrowRight size={18} />
						</Link>

						<a
							href='#how-it-works'
							className='rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-text-primary transition hover:bg-gray-50'>
							See how it works
						</a>
					</div>

					{/* Value points */}
					<div className='mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-text-secondary'>
						<div className='flex items-center gap-2'>
							<Check size={16} className='text-primary' />
							Easy to manage
						</div>

						<div className='flex items-center gap-2'>
							<Check size={16} className='text-primary' />
							Track redemptions
						</div>

						<div className='flex items-center gap-2'>
							<Check size={16} className='text-primary' />
							Prevent invalid vouchers
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Hero;
