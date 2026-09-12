import { cn } from "../_lib/utils";

type ContainerProps = React.ComponentProps<"div">;

const Container = ({ className, ...props }: ContainerProps) => {
  return <div className={cn("px-3 max-w-7xl", className)} {...props} />;
};

export default Container;
