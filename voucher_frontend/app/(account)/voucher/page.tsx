import {
	Container,
	MobileHeader,
	VoucherCardSkeleton,
} from "@/app/_components";
import Link from "next/link";
import { getVouchers } from "@/app/_lib/api/data-service";
import DeleteVoucher from "@/app/_components/DeleteVoucher";
import { Suspense } from "react";
import {
	CalendarClock,
	ChevronLeft,
	ChevronRight,
	Percent,
	Plus,
	Repeat,
	Ticket,
} from "lucide-react";

export const metadata = {
	title: "Voucher",
};

const VoucherPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ status?: string; page?: string }>;
}) => {
	const filters = [
		{ label: "All", status: undefined },
		{ label: "Active", status: "active" },
		{ label: "Redeemed", status: "redeemed" },
		{ label: "Expired", status: "expired" },
	] as const;

	const PAGE_SIZE = 4;
	const { status, page: rawPage } = await searchParams;
	const activeStatus = filters.some((filter) => filter.status === status)
		? (status as voucher["status"] | undefined)
		: undefined;
	const page = Math.max(1, Number(rawPage) || 1);

	const { vouchers }: { vouchers: voucher[] | null } = await getVouchers(
		activeStatus,
		page,
		PAGE_SIZE,
	);

	const hasPrevPage = page > 1;
	const hasNextPage = (vouchers?.length ?? 0) === PAGE_SIZE;

	const pageHref = (targetPage: number) => {
		const params = new URLSearchParams({ page: String(targetPage) });
		if (activeStatus) params.set("status", activeStatus);
		return `/voucher?${params.toString()}`;
	};

	const badge = (status: voucher["status"]) =>
		status === "active"
			? "bg-green-100 text-green-700"
			: status === "redeemed"
				? "bg-blue-100 text-blue-700"
				: "bg-red-100 text-red-700";

	const redemptionPercent = (used: number, limit: number | null) => {
		if (!limit || limit <= 0) return 0;
		return Math.min(100, Math.round((used / limit) * 100));
	};

	return (
		<>
			<MobileHeader text='Vouchers' />

			<section className='py-26 sm:py-15'>
				<Container>
					<header className='mb-8 flex flex-wrap items-end justify-between gap-4'>
						<div>
							<h1 className='text-3xl font-bold text-text-primary'>
								Your vouchers
							</h1>

							<p className='mt-2 text-sm text-text-secondary'>
								Create and manage your business vouchers.
							</p>
						</div>

						<div className='flex gap-3'>
							<Link
								href='/voucher/verify-voucher'
								className='flex items-center gap-2 rounded-xl border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-text-primary shadow-sm transition hover:bg-gray-50'>
								<Repeat size={16} />
								Verify
							</Link>

							<Link
								href='/voucher/create-voucher'
								className='flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90'>
								<Plus size={16} />
								Create
							</Link>
						</div>
					</header>

					<section>
						<aside className='mb-8 overflow-x-auto'>
							<div className='flex  gap-1 rounded-xl border border-black/5 bg-white p-1.5 shadow-sm '>
								{filters.map((filter) => (
									<Link
										key={filter.label}
										href={
											filter.status
												? `/voucher?status=${filter.status}`
												: "/voucher"
										}
										className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
											activeStatus === filter.status
												? "bg-primary text-white"
												: "text-text-secondary hover:bg-gray-100"
										}`}>
										{filter.label}
									</Link>
								))}
							</div>
						</aside>

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
									className='mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90'>
									<Plus size={16} />
									Create your first voucher
								</Link>
							</div>
						) : (
							<Suspense fallback={<VoucherCardSkeleton />}>
								<ul className='grid gap-5 md:grid-cols-2'>
									{vouchers.map(
										({
											id,
											code,
											title,
											createdAt,
											discount_type,
											discount_value,
											expiry_date,
											usage_limit,
											status,
											redemption_count,
										}) => (
											<li
												key={id}
												className='rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:shadow-md'>
												<div className='flex items-start justify-between gap-4'>
													<div className='min-w-0'>
														<p className='truncate text-lg font-bold capitalize text-text-primary'>
															{title}
														</p>

														<p className='mt-1 text-sm text-text-secondary'>
															Created {new Date(createdAt).toLocaleDateString()}
														</p>
													</div>

													<span
														className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${badge(
															status,
														)}`}>
														{status}
													</span>
												</div>

												<div className='mt-5 rounded-xl bg-secondary/40 p-4'>
													<p className='text-xs font-medium uppercase tracking-wide text-text-secondary'>
														Voucher code
													</p>

													<p className='mt-1 text-xl font-bold uppercase tracking-wider text-primary'>
														{code}
													</p>
												</div>

												<div className='mt-5 grid grid-cols-2 gap-4'>
													<div className='flex items-start gap-3'>
														<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/50 text-primary'>
															<Percent size={16} />
														</span>

														<div>
															<p className='text-xs text-text-secondary'>
																Discount
															</p>

															<p className='mt-0.5 font-semibold text-text-primary'>
																{discount_value}{" "}
																{discount_type === "percentage" ? "%" : "₦"}
															</p>
														</div>
													</div>

													<div className='flex items-start gap-3'>
														<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/50 text-primary'>
															<CalendarClock size={16} />
														</span>

														<div>
															<p className='text-xs text-text-secondary'>
																Expires
															</p>

															<p className='mt-0.5 font-semibold text-text-primary'>
																{new Date(expiry_date).toLocaleDateString()}
															</p>
														</div>
													</div>
												</div>

												<div className='mt-5 rounded-xl bg-gray-50 p-4'>
													<div className='flex items-center justify-between text-xs'>
														<p className='text-text-secondary'>Redemptions</p>

														<p className='font-semibold text-text-primary'>
															{redemption_count} / {usage_limit ?? "∞"}
														</p>
													</div>

													<div className='mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200'>
														<div
															className={`h-full rounded-full ${
																status === "expired"
																	? "bg-red-500"
																	: "bg-primary"
															}`}
															style={{
																width: `${redemptionPercent(
																	redemption_count,
																	usage_limit,
																)}%`,
															}}
														/>
													</div>
												</div>

												<div className='mt-6 flex gap-3 border-t border-gray-100 pt-5'>
													<Link
														href={`/voucher/edit-voucher/${id}`}
														className='flex-1 rounded-xl border border-black/5 bg-white px-4 py-2.5 text-center text-sm font-semibold text-text-primary shadow-sm transition hover:bg-gray-50'>
														Edit
													</Link>
													<DeleteVoucher id={id} />
												</div>
											</li>
										),
									)}
								</ul>
							</Suspense>
						)}

						{(hasPrevPage || hasNextPage) && (
							<div className='mt-8 flex items-center justify-between gap-4'>
								{hasPrevPage ? (
									<Link
										href={pageHref(page - 1)}
										className='flex items-center gap-1.5 rounded-lg border border-black/5 bg-white px-5 py-2.5 text-sm font-semibold text-text-primary shadow-sm transition hover:bg-gray-100'>
										<ChevronLeft size={16} />
										Previous
									</Link>
								) : (
									<span className='flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-text-secondary/50'>
										Previous
									</span>
								)}

								<span className='text-sm text-text-secondary'>Page {page}</span>

								{hasNextPage ? (
									<Link
										href={pageHref(page + 1)}
										className='flex items-center gap-1.5 rounded-lg border border-black/5 bg-white px-5 py-2.5 text-sm font-semibold text-text-primary shadow-sm transition hover:bg-gray-100'>
										Next
										<ChevronRight size={16} />
									</Link>
								) : (
									<span className='flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-text-secondary/50'>
										Next
									</span>
								)}
							</div>
						)}
					</section>
				</Container>
			</section>
		</>
	);
};

export default VoucherPage;
