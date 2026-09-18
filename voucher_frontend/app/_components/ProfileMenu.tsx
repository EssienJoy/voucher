"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Settings, TicketCheck, X } from "lucide-react";

const menuLinks = [
	{ href: "/settings", text: "Settings", icon: Settings },
	{ href: "/redeem-voucher", text: "Redeem voucher", icon: TicketCheck },
];

const ProfileMenu = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className='relative'>
			<button
				type='button'
				onClick={() => setOpen((v) => !v)}
				aria-label={open ? "Close menu" : "Open menu"}
				aria-expanded={open}
				className={`flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 shadow-sm backdrop-blur-sm transition ${
					open ? "bg-primary text-white" : "bg-white text-text-primary hover:bg-gray-50"
				}`}>
				{open ? <X size={20} /> : <Menu size={20} />}
			</button>

			{open && (
				<div className='absolute right-0 top-full z-40 mt-2 w-48 overflow-hidden rounded-2xl border border-black/5 bg-white/80 shadow-xl backdrop-blur-xl'>
					{menuLinks.map((link) => {
						const Icon = link.icon;

						return (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setOpen(false)}
								className='flex items-center gap-3 px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-secondary/50'>
								<span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-primary'>
									<Icon size={16} />
								</span>
								{link.text}
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;