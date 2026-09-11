"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Ticket, User } from "lucide-react";
import LogoutButton from "./LogoutButton";

const navigationLinks = [
	{ href: "/dashboard", text: "Dashboard", icon: LayoutDashboard },
	{ href: "/voucher", text: "Vouchers", icon: Ticket },
	{ href: "/profile", text: "Profile", icon: User },
];

const SideBar = () => {
	const pathname = usePathname();

	return (
		<aside
			className='px-5 py-16 sm:w-1/3 lg:w-1/5 hidden
        min-h-dvh sm:flex flex-col gap-60  bg-primary text-white'>
			<nav className='flex flex-col gap-5 '>
				{navigationLinks.map((link) => {
					const Icon = link.icon;
					const isActive =
						pathname === link.href || pathname.startsWith(`${link.href}/`);

					return (
						<Link
							key={link.href}
							href={link.href}
							className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${
								isActive ? "text-white" : "text-white/60"
							}`}>
							<Icon />
							{link.text}
						</Link>
					);
				})}
			</nav>

			<div className=''>
				<LogoutButton />
			</div>
		</aside>
	);
};

export default SideBar;
