"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	Ticket,
	User,
	Settings,
	TicketCheck,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { cn } from "../_lib/utils";

const navigationLinks = [
	{ href: "/dashboard", text: "Dashboard", icon: LayoutDashboard },
	{ href: "/voucher", text: "Vouchers", icon: Ticket },
	{ href: "/profile", text: "Profile", icon: User },
	{ href: "/settings", text: "Settings", icon: Settings },
];

const SideBar = () => {
	const pathname = usePathname();

	return (
		<aside className='sticky top-0 hidden h-dvh shrink-0 flex-col bg-primary px-4 py-8 text-white sm:flex sm:w-56 lg:w-64'>
			<div className='flex items-center gap-2.5 px-2'>
				<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent'>
					<TicketCheck size={20} />
				</span>

				<span className='text-xl font-bold'>Voucherly</span>
			</div>

			<p className='mt-10 px-2 text-xs font-semibold uppercase tracking-widest text-white/40'>
				Menu
			</p>

			<nav className='mt-3 flex flex-col gap-1.5'>
				{navigationLinks.map((link) => {
					const Icon = link.icon;
					const isActive =
						pathname === link.href || pathname.startsWith(`${link.href}/`);

					return (
						<Link
							key={link.href}
							href={link.href}
							className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
								isActive
									? "bg-white/10 text-white"
									: "text-white/60 hover:bg-white/5 hover:text-white"
							}`}>
							{isActive && (
								<span className='absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-accent' />
							)}

							<Icon
								size={18}
								className={cn(
									"transition",
									isActive
										? "text-accent"
										: "text-white/50 group-hover:text-white",
								)}
							/>

							{link.text}
						</Link>
					);
				})}
			</nav>

			<div className='mt-auto border-t border-white/10 pt-6'>
				<LogoutButton className='border-white/10 bg-white/5 text-red-300 hover:bg-white/10 hover:text-red-200' />
			</div>
		</aside>
	);
};

export default SideBar;