import { Container, LogoutButton } from "@/app/_components";
import { AccountHeader } from "../_components";

const ProfilePage = () => {
	return (
		<>
			<AccountHeader text='Profile' />

			<section className='py-25'>
				<Container>
					<div className='mt-7 '>
						<div className='space-y-5 '>
							<div className='bg-white rounded-2xl  p-6'>
								<p className='text-sm  font-medium text-text-secondary'>
									Business Name
								</p>
								<p className='mt-1 text-lg font-semibold text-text-primary'>
									Joy Kitchen
								</p>
							</div>

							<div className='bg-white rounded-2xl  p-6'>
								<p className='text-sm font-medium text-text-secondary'>Email</p>
								<p className='mt-1 text-lg font-semibold text-text-primary'>
									joy@example.com
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
