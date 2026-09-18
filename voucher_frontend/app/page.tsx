import { Footer, HowItWorks } from "./_components";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export const dynamic = "force-dynamic";

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
