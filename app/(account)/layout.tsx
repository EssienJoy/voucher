import React from "react";

const AccountLayout = ({ children }: LayoutProps<"/">) => {
	return (
		<div>
			{children}
			AccountLayout
		</div>
	);
};

export default AccountLayout;
