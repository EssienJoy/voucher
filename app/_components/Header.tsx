import React from "react";
import Container from "./Container";
import Logo from "./Logo";

const Header = () => {
	return (
		<header className='bg-[#13013d] py-6 text-white'>
			<Container>
				<div className='flex items-center justify-between'>
					<Logo />

					<div className='flex items-center gap-5'>
						<p>Login</p>
						<p>Get Started</p>
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
