import { Logo, SigninWithGoogle, SignUpForm } from "@/app/_components";
import Image from "next/image";
import Link from "next/link";
import voucher from "@/public/voucher.jpg";

export const metadata = {
	title: "Sign Up",
};

const SignUp = () => {
	return (
		<main className='grid min-h-dvh md:grid-cols-2'>
			<section className='flex items-center justify-center px-4 py-10'>
				<div className='w-full max-w-md'>
					<header className='flex justify-center'>
						<Logo />
					</header>

					<div className='mt-8 text-center'>
						<h1 className='text-3xl font-bold text-text-primary'>
							Create your account
						</h1>

						<p className='mt-2 text-sm text-text-secondary'>
							Start managing your business vouchers today.
						</p>
					</div>

					<div className='mt-8 rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8'>
						<SignUpForm />
					</div>

					<div className='my-6 flex items-center gap-4'>
						<div className='h-px flex-1 bg-gray-200' />

						<span className='text-sm text-text-secondary'>or</span>

						<div className='h-px flex-1 bg-gray-200' />
					</div>

					<SigninWithGoogle />

					<p className='mt-7 text-center text-sm text-text-secondary'>
						Already have an account?{" "}
						<Link
							href='/login'
							className='font-semibold text-primary hover:underline'>
							Log in
						</Link>
					</p>
				</div>
			</section>

			<section className='relative hidden md:block'>
				<Image
					src={voucher}
					fill
					placeholder='blur'
					quality={100}
					className='object-cover'
					alt='Use Voucherly'
				/>

				<div className='absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent' />

				<div className='absolute inset-x-0 bottom-0 p-10 text-white'>
					<p className='text-sm font-semibold uppercase tracking-widest text-white/80'>
						Voucherly
					</p>

					<p className='mt-2 max-w-md text-2xl font-bold leading-snug'>
						Create, manage, and track your business vouchers in one place.
					</p>

					<div className='mt-5 flex flex-wrap gap-2'>
						{["Create", "Validate", "Track"].map((chip) => (
							<span
								key={chip}
								className='rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm'>
								{chip}
							</span>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default SignUp;