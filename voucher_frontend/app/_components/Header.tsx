import Container from "./Container";
import Link from "./Link";
import Logo from "./Logo";
import NextLink from "next/link";

const Header = () => {
	return (
		<header className='bg-[#13013D] py-4 text-white'>
			<Container>
				<div className='flex items-center justify-between'>
					<NextLink href='/'>
						<Logo />
					</NextLink>

					<nav className='flex items-center gap-3'>
						<Link href='/login'>Log in</Link>

						<Link href='/signup' secondary>
							Get started
						</Link>
					</nav>
				</div>
			</Container>
		</header>
	);
};

export default Header;
