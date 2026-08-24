import React from "react";
import { Container } from "@/app/_components";
import { TicketCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

const RedeemVoucherPage = () => {
	return (
		<main className='min-h-dvh'>
			<section className='py-16'>
				<Container>
					<div className='mx-auto max-w-md'>
						{/* Header */}
						<div className='text-center'>
							<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
								<TicketCheck size={32} />
							</div>

							<h1 className='mt-6 text-3xl font-bold'>Redeem Voucher</h1>

							<p className='mt-2 text-sm leading-6 text-text-secondary'>
								Enter your voucher code to check if it is valid and redeem it.
							</p>
						</div>

						{/* Form */}
						<form className='mt-8 rounded-2xl bg-white p-6 shadow-sm'>
							<div className='grid gap-2'>
								<label htmlFor='voucher' className='text-sm font-semibold'>
									Voucher code
								</label>

								<input
									id='voucher'
									name='voucher'
									type='text'
									placeholder='e.g. JOY10'
									className='
										w-full rounded-xl border border-gray-200
										bg-background px-4 py-3
										font-semibold uppercase
										outline-none transition
										focus:border-primary
										focus:ring-2 focus:ring-primary/10
									'
								/>
							</div>

							<button
								type='submit'
								className='
									mt-5 w-full rounded-xl bg-primary
									px-5 py-3.5 font-semibold text-white
									transition hover:opacity-90
								'>
								Verify Voucher
							</button>
						</form>

						{/* Example of what appears after verification */}
						<div className='mt-6 rounded-2xl border border-gray-200 bg-white p-6'>
							<div className='flex items-start justify-between'>
								<div>
									<p className='text-xs font-semibold uppercase text-text-secondary'>
										Voucher
									</p>

									<h2 className='mt-1 text-xl font-bold'>JOY10</h2>
								</div>

								<span className='rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700'>
									Valid
								</span>
							</div>

							<div className='mt-5 space-y-3 text-sm'>
								<div className='flex justify-between'>
									<span className='text-text-secondary'>Offer</span>

									<span className='font-semibold'>10% off</span>
								</div>

								<div className='flex justify-between'>
									<span className='text-text-secondary'>Business</span>

									<span className='font-semibold'>Joy Kitchen</span>
								</div>

								<div className='flex justify-between'>
									<span className='text-text-secondary'>Expires</span>

									<span className='font-semibold'>30 Jan 2027</span>
								</div>
							</div>

							<button
								type='button'
								className='
									mt-6 w-full rounded-xl
									border-2 border-primary
									px-5 py-3 font-semibold text-primary
									transition hover:bg-primary hover:text-white
								'>
								Redeem Voucher
							</button>
						</div>

						{/* Back */}
						<Link
							href='/'
							className='mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-primary'>
							<ArrowLeft size={16} />
							Back
						</Link>
					</div>
				</Container>
			</section>
		</main>
	);
};

export default RedeemVoucherPage;
