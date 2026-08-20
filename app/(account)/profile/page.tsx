import { Container } from "@/app/_components";
import React from "react";
import { AccountHeader } from "../_components";
import { LogOut } from "lucide-react";

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

					<button
						type='button'
						className='mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-50'>
						<LogOut size={18} />
						Log out
					</button>
				</Container>
			</section>
		</>
	);
};

export default ProfilePage;
