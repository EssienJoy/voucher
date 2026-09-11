"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Ticket, User } from "lucide-react";
import Container from "./Container";

const navigationLinks = [
	{ href: "/dashboard", text: "Home", icon: House },
	{ href: "/voucher", text: "Vouchers", icon: Ticket },
	{ href: "/profile", text: "Profile", icon: User },
];

const MobileFooter = () => {
	const pathname = usePathname();

	return (
		<footer
			className='
				sm:hidden
				fixed bottom-0 left-0 z-50 w-full
				bg-primary
				py-3 backdrop-blur-md
				rounded-t-2xl
				text-white
			'>
			<Container>
				<nav>
					<ul className='flex items-center justify-around'>
						{navigationLinks.map((link) => {
							const Icon = link.icon;
							const isActive =
								pathname === link.href || pathname.startsWith(`${link.href}/`);

							return (
								<li key={link.href}>
									<Link
										href={link.href}
										className={`flex flex-col items-center gap-1 transition ${
											isActive ? "text-white" : "text-white/60"
										}`}>
										<Icon size={21} strokeWidth={2} />
										<span className='text-xs font-semibold'>{link.text}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</Container>
		</footer>
	);
};

export default MobileFooter;
