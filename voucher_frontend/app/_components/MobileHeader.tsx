import { Container } from "@/app/_components";

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
				<h1 className='text-xl text-center font-bold '>{text}</h1>
			</Container>
		</header>
	);
};

export default Header;
