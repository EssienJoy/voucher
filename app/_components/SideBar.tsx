import Link from "next/link";
import { LayoutDashboard, Ticket, User } from "lucide-react";
import LogoutButton from "./LogoutButton";

const SideBar = () => {
	const navigationLinks = [
		{ href: "/dashboard", text: "Dashboard", icon: LayoutDashboard },
		{ href: "/voucher", text: "Vouchers", icon: Ticket },
		{ href: "/profile", text: "Profile", icon: User },
	];
	return (
		<aside
			className='px-5 py-16 sm:w-1/3 lg:w-1/5 hidden
        min-h-dvh sm:flex flex-col  bg-primary text-white'>
			<nav className='flex flex-col gap-5 '>
				{navigationLinks.map((link) => {
					const Icon = link.icon;

					return (
						<Link
							key={link.href}
							href={link.href}
							className='flex items-center gap-2'>
							<Icon />
							{link.text}
						</Link>
					);
				})}
			</nav>

			<div className='my-auto'>
				<LogoutButton />
			</div>
		</aside>
	);
};

export default SideBar;
