"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ArrowBack = () => {
	const router = useRouter();

	return (
		<button
			type='button'
			onClick={() => router.back()}
			aria-label='Go back'
			className='
				absolute left-0
				flex h-10 w-10 items-center justify-center
				rounded-full
				transition
				hover:bg-black/5
			'>
			<ArrowLeft size={21} />
		</button>
	);
};

export default ArrowBack;
