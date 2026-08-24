import { Container, LogoutButton, MobileHeader } from "@/app/_components";
import { getBusiness } from "@/app/_lib/api/business";

const ProfilePage = async () => {
	const { business } = await getBusiness();
	// console.log(business);

	return (
		<>
			<MobileHeader text='Profile' />

			<section className='py-25'>
				<Container>
					<div className='mt-7 '>
						<div className='space-y-5 '>
							<div className='bg-white rounded-2xl  p-6'>
								<p className='text-sm  font-medium text-text-secondary'>
									Business Name
								</p>
								<p className='mt-1 text-lg font-semibold text-text-primary'>
									{business.business_name}
								</p>
							</div>

							<div className='bg-white rounded-2xl  p-6'>
								<p className='text-sm font-medium text-text-secondary'>Email</p>
								<p className='mt-1 text-lg font-semibold text-text-primary'>
									{business.email}
								</p>
							</div>

							<div className='bg-white rounded-2xl  p-6'>
								<p className='text-sm font-medium text-text-secondary'>
									Account Created
								</p>
								<p className='mt-1 text-lg font-semibold text-text-primary'>
									20 August 2026
								</p>
							</div>
						</div>
					</div>

					<LogoutButton />
				</Container>
			</section>
		</>
	);
};

export default ProfilePage;
