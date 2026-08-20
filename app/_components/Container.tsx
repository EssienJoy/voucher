import React from "react";

const Container = ({ children }: LayoutProps<"/">) => {
	return <section className='px-3 max-w-7xl'>{children}</section>;
};

export default Container;
