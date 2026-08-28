import NextLink, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../_lib/utils";

type LinkComponentProps = LinkProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		children: ReactNode;
		primary?: boolean;
		secondary?: boolean;
		accent?: boolean;
	};

const Link = ({
	children,
	primary,
	secondary,
	className,
	accent,
	...props
}: LinkComponentProps) => {
	const variantClassName = primary
		? "bg-primary text-white"
		: secondary
			? "border border-gray-200 bg-white text-text-primary"
			: accent
				? "text-text-primary hover:underline"
				: "text-white hover:underline";

	return (
		<NextLink
			{...props}
			className={cn(
				`rounded-md px-4 py-2 font-semibold`,
				variantClassName,
				className,
			)}>
			{children}
		</NextLink>
	);
};

export default Link;
