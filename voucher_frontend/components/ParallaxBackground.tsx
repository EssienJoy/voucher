"use client";

import { useEffect, useRef, type ReactNode } from "react";

const ParallaxBackground = ({ children }: { children: ReactNode }) => {
	const bgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = bgRef.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				el.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0) scale(1.1)`;
			});
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div ref={bgRef} className='absolute inset-0' style={{ transform: "scale(1.1)" }}>
			{children}
		</div>
	);
};

export default ParallaxBackground;