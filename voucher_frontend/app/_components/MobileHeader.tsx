import { Container } from "@/app/_components";

const Header = ({ text }: { text: string }) => {
	return (
		<header
			className='
				sm:hidden
				fixed top-0 left-0 z-50 w-full
				overflow-hidden
				bg-primary
				py-4
				text-white
			'>
			<div
				aria-hidden
				className='pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-2xl'
			/>

			<div
				aria-hidden
				className='pointer-events-none absolute -right-14 bottom-0 h-32 w-32 rounded-full bg-white/5 blur-2xl'
			/>

			<Container>
				<h1 className='text-center text-xl font-bold'>{text}</h1>
			</Container>
		</header>
	);
};

export default Header;
