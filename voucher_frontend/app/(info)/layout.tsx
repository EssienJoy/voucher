import React from "react";
import { Footer } from "@/components";
import Header from "@/components/Header";

const InfoLayout = ({ children }: LayoutProps<"/">) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default InfoLayout;
