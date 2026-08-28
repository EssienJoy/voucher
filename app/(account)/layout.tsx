import React from "react";
import Link from "next/link";
import { Container, SideBar } from "../_components";
import { House, Ticket, User } from "lucide-react";

const AccountLayout = ({ children }: LayoutProps<"/">) => {
	return (
		<>
			<div className='flex gap-5'>
				<SideBar />
				<main className='grow'>{children}</main>
			</div>

			<footer
				className='
					sm:hidden
					fixed bottom-0 left-0 z-50 w-full
					bg-primary
					py-3 backdrop-blur-md
					rounded-t-2xl
					text-white
				'>
				<Container>
					<nav>
						<ul className='flex items-center justify-around'>
							<li>
								<Link
									href='/dashboard'
									className='flex flex-col items-center gap-1'>
									<House size={21} strokeWidth={2} />
									<span className='text-xs font-semibold'>Home</span>
								</Link>
							</li>

							<li>
								<Link
									href='/voucher'
									className='flex flex-col items-center gap-1'>
									<Ticket size={21} strokeWidth={2} />
									<span className='text-xs font-semibold'>Vouchers</span>
								</Link>
							</li>

							<li>
								<Link
									href='/profile'
									className='flex flex-col items-center gap-1'>
									<User size={21} strokeWidth={2} />
									<span className='text-xs font-semibold'>Profile</span>
								</Link>
							</li>
						</ul>
					</nav>
				</Container>
			</footer>
		</>
	);
};

export default AccountLayout;
