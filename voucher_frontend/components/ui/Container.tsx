import type { ComponentProps } from "react";
import { cn } from "../../utils/utils";

type ContainerProps = ComponentProps<"div">;

const Container = ({ className, ...props }: ContainerProps) => {
	return <div className={cn("px-2 max-w-7xl", className)} {...props} />;
};

export default Container;
