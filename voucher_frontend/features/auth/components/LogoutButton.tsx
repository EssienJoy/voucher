"use client";
import { LogOut } from "lucide-react";
import { logout } from "@/features/auth/lib/auth";
import { cn } from "@/utils/utils";

const LogoutButton = ({ className }: { className?: string }) => {
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
