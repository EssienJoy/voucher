import {
	ApiKeySection,
	LogoutButton,
	MobileHeader,
	UpdateUser,
} from "@/app/_components";
import { getBusiness } from "@/app/_lib/api/data-service";

export const metadata = {
	title: "Profile",
};

const ProfilePage = async () => {
	const { business } = await getBusiness();
	console.log(business);

	return (
		<>
			<MobileHeader text='Profile' />

			<section className='py-25 sm:py-15'>
				<div className='max-w-3xl mx-auto px-3'>
					<h1 className='text-3xl font-bold mb-10 hidden sm:block'>Profile</h1>

					<UpdateUser business={business} />

					<ApiKeySection apiKeyPrefix={business?.apiKeyPrefix ?? null} />

					<div className='sm:hidden'>
						<LogoutButton />
					</div>
				</div>
			</section>
		</>
	);
};

export default ProfilePage;
