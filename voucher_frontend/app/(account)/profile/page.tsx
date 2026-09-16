import {
	LogoutButton,
	MobileHeader,
	ProfileMenu,
	UpdateUser,
} from "@/app/_components";
import { Building2 } from "lucide-react";
import { getBusiness } from "@/app/_lib/api/data-service";

export const metadata = {
	title: "Profile",
};

const ProfilePage = async () => {
	const { business } = await getBusiness();
	const name = business?.business_name ?? "Dear";
	const initial = name.charAt(0).toUpperCase();

	return (
		<>
			<MobileHeader text='Profile' />

			<section className='py-25 sm:py-15'>
				<div className='mx-auto max-w-3xl px-3'>
<header className='mb-8 flex items-center gap-4'>
					<span className='flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary/60 text-2xl font-bold text-primary'>
						{initial}
					</span>

					<div className='min-w-0'>
						<h1 className='truncate text-3xl font-bold capitalize text-text-primary'>
							{name}
						</h1>

						<p className='mt-1 flex items-center gap-1.5 text-sm text-text-secondary'>
							<Building2 size={14} />
							<span className='truncate'>
								{business?.email ?? "No email on file"}
							</span>
						</p>
					</div>

					<div className='ml-auto sm:hidden'>
						<ProfileMenu />
					</div>
				</header>

					<UpdateUser business={business} />

					<div className='mt-8 sm:hidden'>
						<LogoutButton />
					</div>
				</div>
			</section>
		</>
	);
};

export default ProfilePage;
