import { Container } from "@/app/_components";
import React from "react";
import { AccountHeader } from "../_components";

const ProfilePage = () => {
	return (
		<>
			<AccountHeader text='Profile' />
			<section className='py-25'>
				<Container>
					<form action='' className='grid mt-7 gap-6'>
						<div className='grid'>
							<label
								className='text-xl font-semibold
							'>
								Business Name:
							</label>
							<input
								className='bg-none outline-none border-primary
                                border-b border-solid px-2 '
								type='text'
							/>
						</div>
						<div className='grid'>
							<label
								className='text-xl font-semibold
							'>
								Email:
							</label>
							<input
								className='bg-none outline-none border-primary
                                border-b border-solid px-2 '
								type='text'
							/>
						</div>
						<div className='grid'>
							<label
								className='text-xl font-semibold
							'>
								Account Created:
							</label>
							<input
								className='bg-none outline-none border-primary
                                border-b border-solid px-2 '
								type='text'
							/>
						</div>
					</form>

					<div className='mt-10'>
						<button>logout</button>
					</div>
				</Container>
			</section>
		</>
	);
};

export default ProfilePage;
