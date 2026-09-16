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
				overflow-hidden
				bg-primary
				py-3 backdrop-blur-md
				rounded-t-2xl
				text-white
			'>
			<div
				aria-hidden
				className='pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl'
			/>

			<div
				aria-hidden
				className='pointer-events-none absolute -right-16 bottom-0 h-32 w-32 rounded-full bg-white/5 blur-2xl'
			/>

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
										className={`relative flex flex-col items-center gap-1 px-5 py-1 transition ${
											isActive ? "text-white" : "text-white/55"
										}`}>
										<Icon
											size={21}
											strokeWidth={isActive ? 2.5 : 2}
										/>
										<span className='text-xs font-semibold'>
											{link.text}
										</span>

										{isActive && (
											<span className='absolute -bottom-3 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-white' />
										)}
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
