import cn from "classnames";

const buttonVariationClasses = {
  primary:
    "border p-2 font-mono max-w-fit w-full shadow-md hover:bg-white hover:text-black",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariationClasses;
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      className={cn(
        buttonVariationClasses[variant],
        "flex items-center justify-around",
        className
      )}
    >
      {children}
    </button>
  );
}
