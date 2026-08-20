import { Container } from "@/app/_components";
import React from "react";

const Header = ({ text }: { text: string }) => {
	return (
		<header
			className='fixed top-0 left-0 
                w-full bg-background-header py-5 rounded-bl-2xl
             rounded-br-2xl'>
			<Container>
				<div className='flex items-center'>
					<button>back</button>
					<h1 className='text-2xl font-bold mx-auto'>{text}</h1>
				</div>
			</Container>
		</header>
	);
};

export default Header;
