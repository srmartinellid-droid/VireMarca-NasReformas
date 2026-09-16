import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-800 text-white hover:bg-navy-700 focus-visible:ring-navy-500",
  secondary:
    "bg-stone-100 text-navy-900 hover:bg-stone-200 focus-visible:ring-stone-400",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-400",
  ghost:
    "bg-transparent text-navy-800 hover:bg-stone-100 focus-visible:ring-stone-400",
  outline:
    "border border-navy-800/20 text-navy-800 hover:bg-navy-800 hover:text-white focus-visible:ring-navy-500",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
