import React from "react";
import Link from "next/link";
import { Container } from "../_components";
import { House, Ticket, User } from "lucide-react";

const AccountLayout = ({ children }: LayoutProps<"/">) => {
	return (
		<div className='min-h-screen pb-24'>
			{children}

			<footer
				className='
					fixed bottom-0 left-0 z-50 w-full
					border-t border-gray-200
					bg-background-header/95
					py-3 backdrop-blur-md
					rounded-t-2xl
				'>
				<Container>
					<nav>
						<ul className='flex items-center justify-around'>
							<li>
								<Link
									href='/dashboard'
									className='flex flex-col items-center gap-1 text-primary'>
									<House size={21} strokeWidth={2} />
									<span className='text-xs font-semibold'>Home</span>
								</Link>
							</li>

							<li>
								<Link
									href='/voucher'
									className='flex flex-col items-center gap-1 text-primary'>
									<Ticket size={21} strokeWidth={2} />
									<span className='text-xs font-semibold'>Vouchers</span>
								</Link>
							</li>

							<li>
								<Link
									href='/profile'
									className='flex flex-col items-center gap-1 text-primary'>
									<User size={21} strokeWidth={2} />
									<span className='text-xs font-semibold'>Profile</span>
								</Link>
							</li>
						</ul>
					</nav>
				</Container>
			</footer>
		</div>
	);
};

export default AccountLayout;
