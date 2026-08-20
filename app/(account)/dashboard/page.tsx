import { Container } from "@/app/_components";
import React from "react";
import { AccountHeader } from "../_components";

const DashboardPage = () => {
	return (
		<>
			<AccountHeader text='Dashboard' />
			<section className='py-25'>
				<Container>
					<h1 className='text-2xl font-bold'>Goodmorning Joy</h1>

					<section className='grid grid-cols-2 gap-3 my-6'>
						<div
							className='flex flex-col border-primary p-2 
                    border-solid border-2'>
							<h2 className='text-xl font-bold'>Total</h2>
							<p>120</p>
						</div>
						<div
							className='flex flex-col border-primary p-2 
                    border-solid border-2'>
							<h2 className='text-xl font-bold'>Active</h2>
							<p>45</p>
						</div>

						<div
							className='flex flex-col border-primary p-2 
                    border-solid border-2'>
							<h2 className='text-xl font-bold'>Used</h2>
							<p>45</p>
						</div>

						<div
							className='flex flex-col border-primary p-2 
                    border-solid border-2'>
							<h2 className='text-xl font-bold'>Unused</h2>
							<p>45</p>
						</div>
					</section>

					<section className='mt-7'>
						<h2 className='text-2xl font-bold'>Recent Vouchers</h2>

						<div>
							<div
								className='
                        grid  gap-3  my-3'>
								<div className=' bg-white flex gap-5  rounded-md p-4'>
									<div className='space-y-1.5'>
										<p className='text-2xl font-bold'>JOY 10</p>
										<div className='text-sm flex'>
											<p>.validity 1 week</p>
											<p>.10 qty</p>
										</div>
									</div>
									<div>
										<p>Active</p>
										<p>view</p>
									</div>
								</div>
								<div className=' bg-white flex gap-5  rounded-md p-4'>
									<div className='space-y-1.5'>
										<p className='text-2xl font-bold'>JOY 10</p>
										<div className='text-sm flex'>
											<p>.validity 1 week</p>
											<p>.10 qty</p>
										</div>
									</div>
									<div>
										<p>Active</p>
										<p>view</p>
									</div>
								</div>
								<div className=' bg-white flex gap-5  rounded-md p-4'>
									<div className='space-y-1.5'>
										<p className='text-2xl font-bold'>JOY 10</p>
										<div className='text-sm flex'>
											<p>.validity 1 week</p>
											<p>.10 qty</p>
										</div>
									</div>
									<div>
										<p>Active</p>
										<p>view</p>
									</div>
								</div>
								<div className=' bg-white flex gap-5  rounded-md p-4'>
									<div className='space-y-1.5'>
										<p className='text-2xl font-bold'>JOY 10</p>
										<div className='text-sm flex'>
											<p>.validity 1 week</p>
											<p>.10 qty</p>
										</div>
									</div>
									<div>
										<p>Active</p>
										<p>view</p>
									</div>
								</div>
							</div>
						</div>

						<div className='my-3'>
							<button>Create</button>
						</div>
					</section>
				</Container>
			</section>
		</>
	);
};

export default DashboardPage;
