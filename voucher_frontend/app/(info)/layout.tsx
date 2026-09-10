import React from "react";
import { Footer, Header } from "../_components";

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
