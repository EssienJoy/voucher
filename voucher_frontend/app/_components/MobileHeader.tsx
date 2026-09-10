import { Container } from "@/app/_components";

import ArrowBack from "./ArrowBack";

const Header = ({ text }: { text: string }) => {
	return (
		<header
			className='
				sm:hidden
				fixed top-0 left-0 z-50 w-full
				rounded-b-2xl
				bg-primary
				py-4
				backdrop-blur-md
				text-white
				
			'>
			<Container>
				<div className='relative flex h-10 items-center justify-center'>
					<ArrowBack />

					<h1 className='text-xl font-bold '>{text}</h1>
				</div>
			</Container>
		</header>
	);
};

export default Header;
