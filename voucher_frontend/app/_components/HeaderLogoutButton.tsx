"use client";

import { LogOut } from "lucide-react";
import { logout } from "../_lib/api/auth";

const HeaderLogoutButton = () => {
	return (
		<button
			type='button'
			onClick={() => logout()}
			className='flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-text-secondary transition hover:text-text-primary'>
			<LogOut size={18} />
			Log out
		</button>
	);
};

export default HeaderLogoutButton;