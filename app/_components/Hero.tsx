import React from "react";
import Container from "./Container";

const Hero = () => {
	return (
		<Container>
			<div className='flex flex-col items-center gap-3 py-10'>
				<h1 className='text-3xl font-bold text-center'>
					Manage Your Business Vouchers Easily and Securely.
				</h1>
				<p className='text-xl font-semibold'>.Create .Validate .Track</p>
				<button>Get Started</button>
			</div>
		</Container>
	);
};

export default Hero;
