import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
}

const sizes = {
  sm: { width: 40, height: 36 },
  md: { width: 56, height: 51 },
  lg: { width: 72, height: 66 },
};

export function Logo({
  className,
  variant = "default",
  size = "md",
  showText = true,
  href = "/",
}: LogoProps) {
  const { width, height } = sizes[size];

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        className
      )}
    >
      <Image
        src="/logo.png"
        alt="Nascimento Reformas"
        width={width}
        height={height}
        className="object-contain"
        priority
        style={{ width: "auto", height: size === "sm" ? 36 : size === "md" ? 48 : 60 }}
      />
      {showText && (
        <span
          className={cn(
            "font-semibold tracking-tight leading-tight",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-lg",
            variant === "light" && "text-white",
            variant === "dark" && "text-navy-900",
            variant === "default" && "text-navy-900"
          )}
        >
          Nascimento
          <span className="block text-[0.7em] font-medium opacity-80">
            Reformas
          </span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-md">
        {content}
      </Link>
    );
  }

  return content;
}
