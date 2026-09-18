import { cookies } from "next/headers";
import Image from "next/image";
import Container from "./Container";
import Link from "./Link";
import ParallaxBackground from "./ParallaxBackground";
import { ArrowRight, Check, Star, Ticket, Zap } from "lucide-react";
import voucher from "@/public/voucher.jpg";

const Hero = async () => {
	const cookieStore = await cookies();
	const isAuthenticated = Boolean(cookieStore.get("jwt")?.value);

	const stats = [
		{ icon: Ticket, value: "3,200+", label: "vouchers redeemed" },
		{ icon: Star, value: "4.9", label: "avg. rating" },
		{ icon: Zap, value: "99.9%", label: "uptime" },
	];

	const points = [
		"Easy to manage",
		"Track redemptions",
		"Prevent invalid vouchers",
	];

	return (
		<section className='relative overflow-hidden'>
			{/* Full-bleed background image (parallax) */}
			<ParallaxBackground>
				<Image
					src={voucher}
					alt=''
					fill
					priority
					sizes='100vw'
					quality={85}
					placeholder='blur'
					className='object-cover'
				/>
			</ParallaxBackground>

			{/* Drifting color orbs for depth */}
			<div
				aria-hidden
				className='orb pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-secondary/60 blur-3xl'
			/>
			<div
				aria-hidden
				className='orb pointer-events-none absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/50 blur-3xl'
				style={{ animationDelay: "-5s" }}
			/>
			<div
				aria-hidden
				className='orb pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/20 blur-3xl'
				style={{ animationDelay: "-10s" }}
			/>

			{/* Frosted screen blur across the full width */}
			<div
				aria-hidden
				className='absolute inset-0 bg-gradient-to-b from-white/65 via-white/40 to-white/65 backdrop-blur-xl'
			/>

			{/* Fine grain on the glass */}
			<div aria-hidden className='glass-noise pointer-events-none absolute inset-0' />

			{/* Top light sheen */}
			<div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
				<div className='absolute -top-1/2 left-1/3 h-[200%] w-40 rotate-12 bg-white/20 blur-2xl' />
			</div>

			{/* Floating glass decoration (desktop) */}
			<div
				aria-hidden
				className='animate-float pointer-events-none absolute right-10 top-[18%] hidden w-52 -rotate-6 lg:block'
				style={{ "--float-rotate": "-6deg" } as React.CSSProperties}>
				<div className='rounded-2xl border border-white/60 bg-white/30 p-5 shadow-2xl shadow-black/10 backdrop-blur-lg'>
					<div className='flex items-center justify-between'>
						<span className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary'>
							<Ticket size={18} />
						</span>
						<span className='text-[10px] font-semibold uppercase tracking-wider text-text-secondary'>
							Voucherly
						</span>
					</div>
					<p className='mt-4 text-2xl font-extrabold text-text-primary'>25% OFF</p>
					<p className='mt-1 text-xs text-text-secondary'>Discount code</p>
					<p className='mt-3 rounded-lg border border-dashed border-primary/30 bg-white/40 px-3 py-1.5 text-center font-mono text-sm font-bold tracking-widest text-primary'>
						JOY25
					</p>
					<p className='mt-3 text-[10px] text-text-secondary'>
						Expires Dec 31, 2026 • one-time use
					</p>
				</div>
			</div>

			<div
				aria-hidden
				className='animate-float pointer-events-none absolute left-10 top-[38%] hidden w-48 rotate-6 lg:block'
				style={{ "--float-rotate": "6deg", animationDelay: "-3.5s" } as React.CSSProperties}>
				<div className='flex items-center gap-3 rounded-2xl border border-white/60 bg-white/30 p-4 shadow-2xl shadow-black/10 backdrop-blur-lg'>
					<span className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white'>
						<Check size={18} />
					</span>
					<div>
						<p className='text-sm font-bold text-text-primary'>Voucher redeemed</p>
						<p className='text-xs text-text-secondary'>Order #2041</p>
					</div>
				</div>
			</div>

			{/* Content stays inside the Container */}
			<div className='relative'>
				<Container>
					<div className='mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center md:py-32'>
						<div
							className='animate-fade-up mb-6 flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm'
							style={{ animationDelay: "0.05s" }}>
							<span className='h-2 w-2 animate-pulse rounded-full bg-primary' />
							<p>Simple voucher management for businesses</p>
						</div>

						<h1
							className='animate-fade-up text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-6xl'
							style={{ animationDelay: "0.15s" }}>
							Manage your business vouchers
							<span className='bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent'>
								{" "}
								with ease.
							</span>
						</h1>

						<p
							className='animate-fade-up mt-6 max-w-2xl text-base leading-7 text-text-secondary md:text-lg'
							style={{ animationDelay: "0.25s" }}>
							Create, manage, validate, and track your business vouchers from one
							simple platform.
						</p>

						{/* Glass stat chips */}
						<div
							className='animate-fade-up mt-8 grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-3'
							style={{ animationDelay: "0.35s" }}>
							{stats.map((stat) => {
								const Icon = stat.icon;
								return (
									<div
										key={stat.label}
										className='flex items-center gap-3 rounded-2xl border border-white/60 bg-white/50 px-4 py-3 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-lg'>
										<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
											<Icon size={18} />
										</span>
										<div className='text-left'>
											<p className='text-base font-extrabold text-text-primary'>
												{stat.value}
											</p>
											<p className='text-xs text-text-secondary'>{stat.label}</p>
										</div>
									</div>
								);
							})}
						</div>

						<div
							className='animate-fade-up mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row'
							style={{ animationDelay: "0.45s" }}>
							{isAuthenticated ? (
								<Link
									href='/dashboard'
									className='group relative flex items-center gap-3 overflow-hidden shadow-lg transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgb(28,25,87,0.35)]'
									primary>
									<span className='relative z-10'>Dashboard</span>
									<ArrowRight
										size={18}
										className='relative z-10 transition-transform group-hover:translate-x-1'
									/>
									<span
										aria-hidden
										className='absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/40 blur-md transition-all duration-700 ease-out group-hover:left-full'
									/>
								</Link>
							) : (
								<Link
									href='/signup'
									className='group relative flex items-center gap-3 overflow-hidden shadow-lg transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgb(28,25,87,0.35)]'
									primary>
									<span className='relative z-10'>Get started</span>
									<ArrowRight
										size={18}
										className='relative z-10 transition-transform group-hover:translate-x-1'
									/>
									<span
										aria-hidden
										className='absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/40 blur-md transition-all duration-700 ease-out group-hover:left-full'
									/>
								</Link>
							)}

							<a
								href='#how-it-works'
								className='border border-white/70 bg-white/60 text-text-primary backdrop-blur-sm
								rounded-md px-4 py-2 font-semibold shadow-sm transition
								hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-md'>
								See how it works
							</a>
						</div>

						<ul
							className='animate-fade-up mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-text-secondary'
							style={{ animationDelay: "0.55s" }}>
							{points.map((point, i) => (
								<li key={i + 1} className='flex items-center gap-2'>
									<Check size={16} className='text-primary' />
									{point}
								</li>
							))}
						</ul>
					</div>
				</Container>
			</div>

			{/* Fade into the section below */}
			<div
				aria-hidden
				className='pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent'
			/>
		</section>
	);
};

export default Hero;