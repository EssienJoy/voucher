import { Footer, HowItWorks } from "@/components";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<HowItWorks />
			</main>
			<Footer />
		</>
	);
}
