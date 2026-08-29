import Link from "next/link";
import { Container } from "@/app/_components";
import { ArrowLeft, Ticket } from "lucide-react";
import ArrowBack from "./_components/ArrowBack";

const NotFound = () => {
	return (
		<main className='min-h-dvh flex items-center justify-center px-4'>
			<Container>
				<div className='mx-auto max-w-md text-center'>
					{/* Icon */}
					<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
						<Ticket size={32} />
					</div>

					{/* Error */}
					<p className='mt-8 text-7xl font-bold text-primary'>404</p>

					<h1 className='mt-4 text-2xl font-bold'>Page not found</h1>

					<p className='mx-auto mt-3 max-w-sm text-sm leading-6 text-text-secondary'>
						Sorry, we couldn&apos;t find the page you&apos;re looking for. It
						may have been moved or no longer exists.
					</p>

					{/* Action */}
					<Link
						href='/'
						className='mx-auto mt-8 flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90'>
						<ArrowLeft size={18} />
						Back to home
					</Link>
					<ArrowBack />
				</div>
			</Container>
		</main>
	);
};

export default NotFound;
