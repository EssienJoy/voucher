import { Container } from "@/app/_components";

import ArrowBack from "./ArrowBack";

const Header = ({ text }: { text: string }) => {
	return (
		<header
			className='
				sm:hidden
				fixed top-0 left-0 z-50 w-full
				rounded-b-2xl
				bg-background-header/95
				py-4
				backdrop-blur-md
				border-b border-black/5
			'>
			<Container>
				<div className='relative flex h-10 items-center justify-center'>
					<ArrowBack />

					<h1 className='text-xl font-bold text-text-primary'>{text}</h1>
				</div>
			</Container>
		</header>
	);
};

export default Header;
