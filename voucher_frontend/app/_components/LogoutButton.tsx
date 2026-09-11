"use client";
import { LogOut } from "lucide-react";
import { logout } from "../_lib/api/auth";

const LogoutButton = () => {
	// logout is a Server Action. Server Actions can be called directly
	// (not just bound to a <form>) — clicking this button runs logout()
	// on the Next.js server, which deletes the "jwt" cookie and calls
	// redirect("/login") itself, so no extra navigation code is needed here.
	return (
		<button
			onClick={() => logout()}
			type='button'
			className=' mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-background px-5 py-3 font-semibold text-red-500 transition hover:bg-red-50'>
			<LogOut size={18} />
			Log out
		</button>
	);
};

export default LogoutButton;
