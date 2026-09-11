import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../_lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	primary?: boolean;
	secondary?: boolean;
	accent?: boolean;
};

const Button = ({
	children,
	primary,
	secondary,
	accent,
	className,
	type = "button",
	...props
}: ButtonProps) => {
	const variantClassName = primary
		? "bg-primary text-white hover:opacity-90"
		: secondary
			? "border border-gray-200 bg-white text-text-primary hover:bg-gray-50"
			: accent
				? "text-text-primary hover:underline"
				: "text-white hover:underline";

	return (
		<button
			{...props}
			type={type}
			className={cn(
				`rounded-md px-4 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60`,
				variantClassName,
				className,
			)}>
			{children}
		</button>
	);
};

export default Button;
