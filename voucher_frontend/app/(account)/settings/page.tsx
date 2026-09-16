import {
	ApiKeySection,
	MobileHeader,
} from "@/app/_components";
import ArrowBack from "@/app/_components/ArrowBack";
import { getBusiness } from "@/app/_lib/api/data-service";

export const metadata = {
	title: "Settings",
};

const SettingsPage = async () => {
	const { business } = await getBusiness();

	return (
		<>
			<MobileHeader text='Settings' />

			<section className='py-25 sm:py-15'>
				<div className='mx-auto max-w-3xl px-3'>
					<header className='mb-8 flex items-center gap-5'>
						<div className='sm:hidden'>
							<ArrowBack />
						</div>

						<div>
							<h1 className='text-3xl font-bold text-text-primary'>Settings</h1>

							<p className='mt-2 text-sm text-text-secondary'>
								Manage your account and API access.
							</p>
						</div>
					</header>

					<ApiKeySection apiKeyPrefix={business?.apiKeyPrefix ?? null} />
				</div>
			</section>
		</>
	);
};

export default SettingsPage;