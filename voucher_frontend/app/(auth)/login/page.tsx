import { LoginForm, Logo } from "@/app/_components";
import Image from "next/image";
import Link from "next/link";
import voucher from "@/public/voucher.jpg";

export const metadata = {
	title: "Login",
};

const Login = () => {
	return (
		<main className='grid md:grid-cols-2 min-h-dvh gap-5'>
			<section className='mx-auto w-full max-w-md my-7 px-3'>
				<header className='flex justify-center mt-7'>
					<Logo />
				</header>

				<div className='mt-8 text-center'>
					<h1 className='text-3xl font-bold text-text-primary'>Welcome back</h1>

					<p className='mt-2 text-sm text-text-secondary'>
						Log in to manage your vouchers.
					</p>
				</div>

				<LoginForm />

				<div className='my-6 flex items-center gap-4'>
					<div className='h-px flex-1 bg-gray-200' />

					<span className='text-sm text-text-secondary'>or</span>

					<div className='h-px flex-1 bg-gray-200' />
				</div>

				<button
					type='button'
					className='
							flex w-full items-center justify-center
							gap-3 rounded-xl border border-gray-200
							bg-white px-5 py-3.5
							font-semibold text-text-primary
							transition hover:bg-gray-50
						'>
					<Image
						src='https://authjs.dev/img/providers/google.svg'
						alt='Google logo'
						height='24'
						width='24'
					/>
					Continue with Google
				</button>

				<p className='my-7 text-center text-sm text-text-secondary'>
					Don&apos;t have an account?{" "}
					<Link
						href='/signup'
						className='font-semibold text-primary hover:underline'>
						Sign up
					</Link>
				</p>
			</section>

			<section className='hidden md:block relative'>
				<Image
					src={voucher}
					fill
					placeholder='blur'
					quality={100}
					className='object-cover absolute'
					alt='Use Voucherly'
				/>
			</section>
		</main>
	);
};

export default Login;
