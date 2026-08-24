"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "../_lib/api/auth";

const LogoutButton = () => {
	const router = useRouter();

	const handleLogout = async () => {
		const { error } = await signOut();
		if (error) {
			console.error(error);
			return;
		}
		router.push("/login");
		router.refresh();
	};
	return (
		<button
			onClick={handleLogout}
			type='button'
			className='mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-50'>
			<LogOut size={18} />
			Log out
		</button>
	);
};

export default LogoutButton;
