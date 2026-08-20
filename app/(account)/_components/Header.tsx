import { Container } from "@/app/_components";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Header = ({ text }: { text: string }) => {
	return (
		<header
			className='
				fixed top-0 left-0 z-50 w-full
				rounded-b-2xl
				bg-background-header/95
				py-4
				backdrop-blur-md
				border-b border-black/5
			'>
			<Container>
				<div className='relative flex h-10 items-center justify-center'>
					<Link
						href='/dashboard'
						aria-label='Go back'
						className='
							absolute left-0
							flex h-10 w-10 items-center justify-center
							rounded-full
							transition
							hover:bg-black/5
						'>
						<ArrowLeft size={21} />
					</Link>

					<h1 className='text-xl font-bold text-text-primary'>{text}</h1>
				</div>
			</Container>
		</header>
	);
};

export default Header;
