import { Input, LogoutButton, MobileHeader } from "@/app/_components";
import { getBusiness } from "@/app/_lib/api/data-service";

export const metadata = {
	title: "Profile",
};

const ProfilePage = async () => {
	const { business } = await getBusiness();

	return (
		<>
			<MobileHeader text='Profile' />

			<section className='py-25 sm:py-15'>
				<div className='max-w-3xl mx-auto px-3'>
					<h1 className='text-3xl font-bold mb-10 hidden sm:block'>Profile</h1>
					<div className=''>
						<form className='space-y-5 '>
							<Input
								type='text'
								name='business_name'
								label='Business Name:'
								placeHolder={business?.business_name ?? "Not Provided"}
							/>
							<Input
								type='text'
								name='email'
								label='Email:'
								placeHolder={business?.email ?? "Not Provided"}
							/>
							<Input
								type='text'
								name='created_at'
								label='Account Created:'
								placeHolder={
									business?.created_at
										? new Date(business.created_at).toLocaleDateString()
										: "Not Provided"
								}
							/>
						</form>
					</div>

					<div className='sm:hidden'>
						<LogoutButton />
					</div>
				</div>
			</section>
		</>
	);
};

export default ProfilePage;
