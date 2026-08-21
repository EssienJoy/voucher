import { Container, Logo } from "@/app/_components";
import Link from "next/link";
// import { Chrome } from "lucide-react";

const SignUp = () => {
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
							Create your account
						</h1>

						<p className='mt-2 text-sm text-text-secondary'>
							Start managing your business vouchers today.
						</p>
					</div>

					{/* Form */}
					<form className='mt-8 space-y-5'>
						{/* Business name */}
						<div className='grid gap-2'>
							<label
								htmlFor='businessName'
								className='text-sm font-semibold text-text-primary'>
								Business name
							</label>

							<input
								id='businessName'
								name='businessName'
								type='text'
								placeholder='e.g. Joy Kitchen'
								className='
									w-full rounded-xl border border-gray-200
									bg-white px-4 py-3
									outline-none transition
									focus:border-primary
									focus:ring-2 focus:ring-primary/10
								'
							/>
						</div>

						{/* Email */}
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

						{/* Password */}
						<div className='grid gap-2'>
							<label
								htmlFor='password'
								className='text-sm font-semibold text-text-primary'>
								Password
							</label>

							<input
								id='password'
								name='password'
								type='password'
								placeholder='Create a password'
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
							Create Account
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

					{/* Login */}
					<p className='mt-7 text-center text-sm text-text-secondary'>
						Already have an account?{" "}
						<Link
							href='/login'
							className='font-semibold text-primary hover:underline'>
							Log in
						</Link>
					</p>
				</div>
			</Container>
		</section>
	);
};

export default SignUp;
