import { cookies } from "next/headers";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "./ui/Container";
import HeaderLogoutButton from "./HeaderLogoutButton";
import Logo from "./Logo";

const primaryLink =
	"group relative flex items-center gap-2 overflow-hidden rounded-md bg-primary px-4 py-2 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgb(28,25,87,0.35)]";

const sheen =
	"absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/40 blur-md transition-all duration-700 ease-out group-hover:left-full";

const Header = async () => {
	const cookieStore = await cookies();
	const isAuthenticated = Boolean(cookieStore.get("jwt")?.value);

	return (
		<header
			className={`sticky top-0 z-50 w-full transition-all
				 duration-300 
					bg-white/20 backdrop-blur-md`}>
			<Container>
				<div className='flex items-center justify-between py-4'>
					<NextLink
						href='/'
						className='text-text-primary transition hover:opacity-80'>
						<Logo />
					</NextLink>

					<nav className='flex items-center'>
						{isAuthenticated ? (
							<>
								<NextLink href='/dashboard' className={primaryLink}>
									<span className='relative z-10'>Dashboard</span>
									<ArrowRight
										size={18}
										className='relative z-10 transition-transform group-hover:translate-x-1'
									/>
									<span aria-hidden className={sheen} />
								</NextLink>
								<HeaderLogoutButton />
							</>
						) : (
							<>
								<NextLink
									href='/login'
									className='rounded-md px-4 py-2 font-semibold text-text-secondary transition hover:bg-white/40 hover:text-text-primary'>
									Log in
								</NextLink>
								<NextLink href='/signup' className={primaryLink}>
									<span className='relative z-10'>Get started</span>
									<ArrowRight
										size={18}
										className='relative z-10 transition-transform group-hover:translate-x-1'
									/>
									<span aria-hidden className={sheen} />
								</NextLink>
							</>
						)}
					</nav>
				</div>
			</Container>
		</header>
	);
};

export default Header;
