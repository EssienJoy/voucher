import React from "react";
import { Container } from "../_components";
// import { AccountHeader } from "./_components";

const AccountLayout = ({ children }: LayoutProps<"/">) => {
	return (
		<div>
			{/* <AccountHeader /> */}
			{children}
			<footer
				className='fixed bottom-0 left-0
                w-full bg-background-header py-5 rounded-tl-2xl
             rounded-tr-2xl'>
				<Container>
					<ul className='flex items-center justify-between'>
						<li className='font-bold text-xl'>Home</li>
						<li className='font-bold  text-xl'>Voucher</li>
						<li className='font-bold  text-xl'>Profile</li>
					</ul>
				</Container>
			</footer>
		</div>
	);
};

export default AccountLayout;
