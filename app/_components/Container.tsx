import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
	return <div className='px-3 max-w-7xl'>{children}</div>;
};

export default Container;
