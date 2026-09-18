import {
	Container,
	DashboardStatsSkeleton,
	DashboardVoucherSkeleton,
	Link,
	MobileHeader,
} from "@/app/_components";
import {
	ArrowRight,
	CalendarDays,
	CircleCheck,
	CircleOff,
	CircleX,
	Plus,
	Ticket,
} from "lucide-react";
import { getBusiness, getVouchers } from "@/app/_lib/api/data-service";
import { Suspense } from "react";

export const metadata = {
	title: "Dashboard",
};

const DashboardPage = async () => {
	const [vouchersResult, businessResult] = await Promise.all([
		getVouchers(),
		getBusiness(),
	]);

	const { vouchers }: { vouchers: voucher[] | null } = vouchersResult;

	const total = vouchers?.length ?? 0;
	const active = vouchers?.filter((v) => v.status === "active").length ?? 0;
	const expired = vouchers?.filter((v) => v.status === "expired").length ?? 0;
	const exhausted =
		vouchers?.filter((v) => v.status === "exhausted").length ?? 0;

	const { business } = businessResult;

	const progress = total > 0 ? Math.round((active / total) * 100) : 0;

	const stats = [
		{
			title: "Vouchers",
			num: total,
			icon: Ticket,
			chip: "bg-secondary/60 text-primary",
		},
		{
			title: "Active",
			num: active,
			icon: CircleCheck,
			chip: "bg-green-100 text-green-700",
		},
		{
			title: "Expired",
			num: expired,
			icon: CircleX,
			chip: "bg-red-100 text-red-700",
		},
		{
			title: "Exhausted",
			num: exhausted,
			icon: CircleOff,
			chip: "bg-amber-100 text-amber-700",
		},
	];

	const badge = (status: voucher["status"]) =>
		status === "active"
			? "bg-green-100 text-green-700"
			: status === "redeemed"
				? "bg-blue-100 text-blue-700"
				: "bg-red-100 text-red-700";

	return (
		<>
			<MobileHeader text='Dashboard' />

			<section className='py-25 sm:py-15'>
				<Container>
					<header className='mb-8 flex flex-wrap items-end justify-between gap-4'>
						<div>
							<h1 className='text-3xl font-bold capitalize text-text-primary'>
								Welcome back, {business?.business_name ?? "Dear"} 👋
							</h1>

							<p className='mt-2 text-sm text-text-secondary'>
								Here&apos;s an overview of your vouchers.
							</p>
						</div>

						<Link
							href='/voucher/create-voucher'
							primary
							className='flex items-center gap-2'>
							<Plus size={16} />
							Create Voucher
						</Link>
					</header>

					<Suspense fallback={<DashboardStatsSkeleton />}>
						<section className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
							{stats.map((stat) => {
								const Icon = stat.icon;

								return (
									<div
										key={stat.title}
										className={` rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:shadow-md`}>
										<div className='flex items-center justify-between gap-4'>
											<p className='text-sm font-medium text-text-secondary'>
												{stat.title}
											</p>

											<span
												className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.chip}`}>
												<Icon size={20} />
											</span>
										</div>

										<p className='mt-3 text-3xl font-bold text-text-primary'>
											{stat.num}
										</p>
									</div>
								);
							})}
						</section>

						{total > 0 && (
							<div className='mt-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm'>
								<div className='flex items-center justify-between text-sm'>
									<span className='font-semibold text-text-primary'>
										{active} of {total} vouchers active
									</span>

									<span className='font-medium text-text-secondary'>
										{progress}%
									</span>
								</div>

								<div className='mt-3 h-2 overflow-hidden rounded-full bg-gray-100'>
									<div
										className='h-full rounded-full bg-primary transition-all'
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
						)}
					</Suspense>

					<section className='mt-10'>
						<div className='mb-4 flex items-center justify-between'>
							<div>
								<h2 className='text-xl font-bold text-text-primary'>
									Recent Vouchers
								</h2>

								<p className='mt-1 text-sm text-text-secondary'>
									Your latest voucher activity.
								</p>
							</div>

							<Link href='/voucher' accent className='flex items-center gap-3'>
								View all
								<ArrowRight size={16} />
							</Link>
						</div>

						<Suspense fallback={<DashboardVoucherSkeleton />}>
							{!vouchers || vouchers.length === 0 ? (
								<div className='rounded-2xl border border-dashed border-text-secondary/30 bg-white/60 px-6 py-14 text-center backdrop-blur-sm'>
									<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/60 text-primary'>
										<Ticket size={28} />
									</div>

									<p className='mt-4 text-xl font-bold text-text-primary'>
										No vouchers yet
									</p>

									<p className='mx-auto mt-2 max-w-sm text-sm text-text-secondary'>
										Create your first voucher to start managing your promotions.
									</p>

									<Link
										href='/voucher/create-voucher'
										primary
										className='mt-6 inline-flex items-center gap-2'>
										<Plus size={16} />
										Create your first voucher
									</Link>
								</div>
							) : (
								<div className='space-y-3'>
									{vouchers?.slice(0, 2)?.map((voucher) => (
										<div
											key={voucher.id}
											className='rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:shadow-md'>
											<div className='flex items-start justify-between gap-4'>
												<div className='min-w-0'>
													<p className='truncate text-base font-bold capitalize text-text-primary'>
														{voucher.title}
													</p>

													<p className='mt-0.5 text-sm font-medium uppercase tracking-wider text-primary'>
														{voucher.code}
													</p>

													<div className='mt-2 flex gap-3 text-xs text-text-secondary'>
														<span>
															{voucher.discount_value}
															{voucher.discount_type === "percentage"
																? "%"
																: "₦"}{" "}
															off
														</span>
														<span>•</span>
														<span>{voucher.usage_limit} uses</span>
													</div>
												</div>

												<span
													className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${badge(
														voucher.status,
													)}`}>
													{voucher.status}
												</span>
											</div>

											<div className='mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-text-secondary'>
												<span className='flex items-center gap-1.5'>
													<CalendarDays size={14} />
													Created{" "}
													{new Date(voucher.createdAt).toLocaleDateString()}
												</span>

												<span className='font-semibold text-text-primary'>
													{voucher.redemption_count}/{voucher.usage_limit}{" "}
													redeemed
												</span>
											</div>
										</div>
									))}
								</div>
							)}
						</Suspense>
					</section>
				</Container>
			</section>
		</>
	);
};

export default DashboardPage;
