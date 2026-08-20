import React from "react";

const Container = ({ children }: LayoutProps<"/">) => {
	return <div className='px-3 max-w-7xl'>{children}</div>;
};

export default Container;
