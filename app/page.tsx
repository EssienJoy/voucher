import { About, Footer, Header, Hero } from "./_components";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<About />
			</main>
			<Footer />
		</>
	);
}
