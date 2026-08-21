import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
	return (
		<header className='bg-[#13013D] py-4 text-white'>
			<Container>
				<div className='flex items-center justify-between'>
					<Logo />

					<nav className='flex items-center gap-3'>
						<Link
							href='/login'
							className='rounded-xl px-4 py-2 text-sm font-semibold transition hover:bg-white/10'>
							Log in
						</Link>

						<Link
							href='/signup'
							className='rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#13013D] transition hover:bg-white/90'>
							Get started
						</Link>
					</nav>
				</div>
			</Container>
		</header>
	);
};

export default Header;
