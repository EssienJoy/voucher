import { Container, Link, MobileHeader } from "@/app/_components";
import { ArrowRight } from "lucide-react";
import { getBusiness, getVouchers } from "@/app/_lib/api/data-service";
// import { capitalize } from "@/app/_lib/utils";

export const metadata = {
	title: "Dashboard",
};

const DashboardPage = async () => {
	const [vouchersResult, businessResult] = await Promise.all([
		getVouchers(),
		getBusiness(),
	]);

	const { vouchers }: { vouchers: voucher[] | null } = vouchersResult;

	const active = vouchers.filter((v) => v.status === "active").length;

	const expired = vouchers.filter((v) => v.status === "expired").length;

	const { business } = businessResult;

	const dashboard = [
		{
			title: "Total Vouchers",
			num: vouchers.length,
		},
		{
			title: "Active",
			num: active,
		},
		{
			title: "Epired",
			num: expired,
		},
	];
	return (
		<>
			<MobileHeader text='Dashboard' />

			<section className='py-25 sm:py-15 '>
				<Container>
					<div className='mb-8'>
						<h1 className='mt-1 capitalize text-3xl font-bold text-text-primary'>
							Welcome, {business.business_name ? business.business_name : " "}{" "}
							👋
						</h1>

						<p className='mt-2 text-sm text-text-secondary'>
							Here&apos;s an overview of your vouchers.
						</p>
					</div>

					<section className='grid grid-cols-3 gap-3'>
						{dashboard.map((data) => (
							<div key={data.title} className='rounded-2xl bg-white p-4'>
								<p className='text-sm font-medium text-text-secondary'>
									{data.title}
								</p>

								<p className='mt-2 text-3xl font-bold text-text-primary'>
									{data.num}
								</p>
							</div>
						))}
					</section>

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

							<Link href='/voucher' accent className='flex gap-3 items-center'>
								View all
								<ArrowRight size={16} />
							</Link>
						</div>

						<div className='space-y-3'>
							{vouchers.map((voucher) => (
								<div key={voucher.id} className='rounded-2xl bg-white p-4'>
									<div className='flex items-center justify-between gap-4'>
										<div>
											<p className='text-lg font-bold text-text-primary'>
												{voucher.code}
											</p>

											<div className='mt-1 flex gap-3 text-xs text-text-secondary'>
												<span>
													{voucher.discount_value}
													{voucher.discount_type === "percentage" ? "%" : "₦"}
													{""} off
												</span>
												<span>•</span>
												<span>{voucher.usage_limit} uses</span>
											</div>
										</div>

										<div className='text-right'>
											<span
												className={`rounded-full bg-green-50 px-3 py-1 
											text-xs font-semibold capitalize text-green-600 ${
												voucher.status === "expired"
													? "text-red-700 bg-red-50"
													: "text-green-600 bg-green-50"
											}`}>
												{voucher.status}
											</span>

											<p className='mt-2 capitalize text-xs text-text-secondary'>
												{voucher.status}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className='my-10 flex justify-end'>
							<Link href='/voucher/create-voucher' primary>
								Create Voucher
							</Link>
						</div>
					</section>
				</Container>
			</section>
		</>
	);
};

export default DashboardPage;
