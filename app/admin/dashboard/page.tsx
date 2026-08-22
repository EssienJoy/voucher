import React from "react";
import { Container } from "@/app/_components";
import { Users, Ticket, TicketCheck, Clock3, ArrowRight } from "lucide-react";

const AdminDashboardPage = () => {
	return (
		<section className='min-h-dvh bg-background'>
			<Container>
				<div className='py-10'>
					{/* Header */}
					<header className='flex items-center justify-between'>
						<div>
							<p className='text-sm font-semibold text-primary'>Admin Panel</p>

							<h1 className='mt-1 text-3xl font-bold'>Overview</h1>

							<p className='mt-1 text-sm text-text-secondary'>
								Monitor Voucherly activity.
							</p>
						</div>

						<div className='flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white font-bold'>
							A
						</div>
					</header>

					{/* Stats */}
					<section className='mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4'>
						<div className='rounded-2xl bg-white p-5'>
							<div className='flex items-center justify-between'>
								<p className='text-sm font-semibold text-text-secondary'>
									Total Users
								</p>

								<Users size={20} className='text-primary' />
							</div>

							<p className='mt-4 text-3xl font-bold'>120</p>

							<p className='mt-1 text-xs text-text-secondary'>
								Registered businesses
							</p>
						</div>

						<div className='rounded-2xl bg-white p-5'>
							<div className='flex items-center justify-between'>
								<p className='text-sm font-semibold text-text-secondary'>
									Total Vouchers
								</p>

								<Ticket size={20} className='text-primary' />
							</div>

							<p className='mt-4 text-3xl font-bold'>1,240</p>

							<p className='mt-1 text-xs text-text-secondary'>
								Created on the platform
							</p>
						</div>

						<div className='rounded-2xl bg-white p-5'>
							<div className='flex items-center justify-between'>
								<p className='text-sm font-semibold text-text-secondary'>
									Used
								</p>

								<TicketCheck size={20} className='text-primary' />
							</div>

							<p className='mt-4 text-3xl font-bold'>680</p>

							<p className='mt-1 text-xs text-text-secondary'>
								Vouchers redeemed
							</p>
						</div>

						<div className='rounded-2xl bg-white p-5'>
							<div className='flex items-center justify-between'>
								<p className='text-sm font-semibold text-text-secondary'>
									Expired
								</p>

								<Clock3 size={20} className='text-primary' />
							</div>

							<p className='mt-4 text-3xl font-bold'>210</p>

							<p className='mt-1 text-xs text-text-secondary'>
								Expired vouchers
							</p>
						</div>
					</section>

					{/* Quick actions */}
					<section className='mt-8'>
						<h2 className='text-xl font-bold'>Management</h2>

						<div className='mt-4 grid gap-4 md:grid-cols-2'>
							<button className='flex items-center justify-between rounded-2xl bg-primary p-5 text-left text-white transition hover:opacity-90'>
								<div>
									<Users size={22} />

									<h3 className='mt-3 font-bold'>Manage Users</h3>

									<p className='mt-1 text-sm text-white/70'>
										View all registered businesses.
									</p>
								</div>

								<ArrowRight size={20} />
							</button>

							<button className='flex items-center justify-between rounded-2xl bg-white p-5 text-left transition hover:bg-gray-50'>
								<div>
									<Ticket size={22} className='text-primary' />

									<h3 className='mt-3 font-bold'>View Vouchers</h3>

									<p className='mt-1 text-sm text-text-secondary'>
										Track vouchers created on Voucherly.
									</p>
								</div>

								<ArrowRight size={20} className='text-primary' />
							</button>
						</div>
					</section>

					{/* Recent vouchers */}
					<section className='mt-10'>
						<div className='flex items-center justify-between'>
							<div>
								<h2 className='text-xl font-bold'>Recent Vouchers</h2>

								<p className='mt-1 text-sm text-text-secondary'>
									Latest voucher activity.
								</p>
							</div>

							<button className='text-sm font-semibold text-primary'>
								View all
							</button>
						</div>

						<div className='mt-4 overflow-hidden rounded-2xl bg-white'>
							<div className='divide-y divide-gray-100'>
								<div className='flex items-center justify-between p-5'>
									<div>
										<p className='font-bold'>JOY10</p>
										<p className='mt-1 text-sm text-text-secondary'>
											Joy Kitchen
										</p>
									</div>

									<span className='rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700'>
										Active
									</span>
								</div>

								<div className='flex items-center justify-between p-5'>
									<div>
										<p className='font-bold'>WELCOME20</p>
										<p className='mt-1 text-sm text-text-secondary'>
											Fashion Hub
										</p>
									</div>

									<span className='rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700'>
										Used
									</span>
								</div>

								<div className='flex items-center justify-between p-5'>
									<div>
										<p className='font-bold'>SAVE15</p>
										<p className='mt-1 text-sm text-text-secondary'>
											Tech Store
										</p>
									</div>

									<span className='rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600'>
										Expired
									</span>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Container>
		</section>
	);
};

export default AdminDashboardPage;
