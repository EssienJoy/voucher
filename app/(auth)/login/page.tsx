import { Container, LoginForm, Logo } from "@/app/_components";
import Link from "next/link";
// import { Chrome } from "lucide-react";

const Login = () => {
	return (
		<section className='min-h-dvh flex items-center justify-center px-4 py-10'>
			<Container>
				<div className='mx-auto w-full max-w-md'>
					{/* Logo */}
					<header className='flex justify-center'>
						<Logo />
					</header>

					{/* Heading */}
					<div className='mt-8 text-center'>
						<h1 className='text-3xl font-bold text-text-primary'>
							Welcome back
						</h1>

						<p className='mt-2 text-sm text-text-secondary'>
							Log in to manage your vouchers.
						</p>
					</div>

					<LoginForm />

					{/* Divider */}
					<div className='my-6 flex items-center gap-4'>
						<div className='h-px flex-1 bg-gray-200' />

						<span className='text-sm text-text-secondary'>or</span>

						<div className='h-px flex-1 bg-gray-200' />
					</div>

					{/* Google */}
					<button
						type='button'
						className='
							flex w-full items-center justify-center
							gap-3 rounded-xl border border-gray-200
							bg-white px-5 py-3.5
							font-semibold text-text-primary
							transition hover:bg-gray-50
						'>
						{/* <Chrome size={19} /> */}
						Continue with Google
					</button>

					{/* Sign up */}
					<p className='mt-7 text-center text-sm text-text-secondary'>
						Don't have an account?{" "}
						<Link
							href='/signup'
							className='font-semibold text-primary hover:underline'>
							Sign up
						</Link>
					</p>
				</div>
			</Container>
		</section>
	);
};

export default Login;
