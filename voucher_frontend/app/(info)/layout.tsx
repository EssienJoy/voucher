import React from "react";
import { Footer } from "../_components";
import Header from "../_components/Header";

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
