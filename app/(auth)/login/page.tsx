import { Container, Logo } from "@/app/_components";
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

					{/* Form */}
					<form className='mt-8 space-y-5'>
						<div className='grid gap-2'>
							<label
								htmlFor='email'
								className='text-sm font-semibold text-text-primary'>
								Email
							</label>

							<input
								id='email'
								name='email'
								type='email'
								placeholder='you@example.com'
								className='
									w-full rounded-xl border border-gray-200
									bg-white px-4 py-3
									outline-none transition
									focus:border-primary
									focus:ring-2 focus:ring-primary/10
								'
							/>
						</div>

						<div className='grid gap-2'>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='text-sm font-semibold text-text-primary'>
									Password
								</label>

								<Link
									href='/forgot-password'
									className='text-xs font-semibold text-primary hover:underline'>
									Forgot password?
								</Link>
							</div>

							<input
								id='password'
								name='password'
								type='password'
								placeholder='Enter your password'
								className='
									w-full rounded-xl border border-gray-200
									bg-white px-4 py-3
									outline-none transition
									focus:border-primary
									focus:ring-2 focus:ring-primary/10
								'
							/>
						</div>

						<button
							type='submit'
							className='
								w-full rounded-xl bg-primary
								px-5 py-3.5
								font-semibold text-white
								transition hover:opacity-90
							'>
							Log In
						</button>
					</form>

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
