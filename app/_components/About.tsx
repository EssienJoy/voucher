import React from "react";
import Container from "./Container";

const About = () => {
	return (
		<Container>
			<section>
				<h2 className='text-2xl font-bold text-center'>How It Works?</h2>

				<div className='grid gap-5 grid-cols-2 mt-5'>
					<p className='text-right'>
						Create <br /> Voucer
					</p>
					<p>
						Share <br /> Voucer
					</p>
					<p className='col-span-2 text-center'>
						Redeem <br /> Voucer
					</p>
				</div>
			</section>
			<section className='mt-5'>
				<h2 className='text-2xl font-bold text-center'>Why Use It?</h2>

				<div className='flex flex-col items-center mt-5'>
					<p className=''>✔️ Easy Voucher Management</p>
					<p className=''>✔️ Prevent Invalid Vouchers</p>
					<p className=''>✔️ Track Voucher States </p>
				</div>
			</section>
		</Container>
	);
};

export default About;
