import { Container, Logo } from "@/app/_components";

const Login = () => {
	return (
		<section className='h-dvh flex items-center justify-center'>
			<Container>
				<header className='flex items-center justify-center'>
					<Logo />
				</header>

				<h1 className='text-2xl font-bold my-5'>Welcome Back</h1>

				<div className='mb-5'>
					<form action=''>
						<div className='grid gap-2'>
							<label
								className='text-xl font-semibold
							'>
								Email:
							</label>
							<input className='bg-white px-2 py-2 rounded-xl' type='text' />
						</div>
						<div className='grid gap-2'>
							<label
								className='text-xl font-semibold
							'>
								Password:
							</label>
							<input className='bg-white px-2 py-2 rounded-xl' type='text' />
						</div>
					</form>

					<div className='mt-3'>
						<p>Forgot Password?</p>
						<button>Log In</button>
					</div>
				</div>

				<div>
					<p className='text-center my-2'>or</p>
					<button>Continue With Google</button>
					<p>Already have an account Login</p>
				</div>
			</Container>
		</section>
	);
};

export default Login;
