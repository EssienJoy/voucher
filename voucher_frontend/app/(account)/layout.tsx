import React from "react";
import { SideBar, MobileFooter } from "../_components";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className='block sm:flex gap-5'>
				<SideBar />
				<main className='grow'>{children}</main>
			</div>

			<MobileFooter />
		</>
	);
};

export default AccountLayout;
