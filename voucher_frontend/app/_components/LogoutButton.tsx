"use client";
import { LogOut } from "lucide-react";
import { logout } from "../_lib/api/auth";
import { cn } from "../_lib/utils";

const LogoutButton = ({ className }: { className?: string }) => {
	// logout is a Server Action. Server Actions can be called directly
	// (not just bound to a <form>) — clicking this button runs logout()
	// on the Next.js server, which deletes the "jwt" cookie and calls
	// redirect("/login") itself, so no extra navigation code is needed here.
	return (
		<button
			onClick={() => logout()}
			type='button'
			className={cn(
				"flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/60 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-50",
				className,
			)}>
			<LogOut size={18} />
			Log out
		</button>
	);
};

export default LogoutButton;
