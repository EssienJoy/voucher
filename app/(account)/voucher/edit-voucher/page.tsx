import { Container, CreateVoucherForm } from "@/app/_components";
import React from "react";

export const metadata = {
	title: "Edit",
};

const page = () => {
	return (
		<section className='py-15'>
			<Container>
				<CreateVoucherForm />
			</Container>
		</section>
	);
};

export default page;
