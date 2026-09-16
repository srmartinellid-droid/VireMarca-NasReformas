import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps { className?: string; variant?: "default" | "light" | "dark"; size?: "sm" | "md" | "lg"; showText?: boolean; href?: string; }

const sizes = { sm: { width: 48, height: 44, image: 40, title: "text-base" }, md: { width: 68, height: 62, image: 58, title: "text-xl" }, lg: { width: 86, height: 78, image: 76, title: "text-2xl" } };

export function Logo({ className, variant = "default", size = "md", showText = true, href = "/" }: LogoProps) {
  const s = sizes[size];
  const text = variant === "light" ? "text-white" : "text-navy-900";
  const content = (
    <span className={cn("inline-flex items-center gap-3.5", className)}>
      <Image src="/logo.png" alt="Nascimento Reformas" width={s.width} height={s.height} className="object-contain" priority style={{ width: "auto", height: s.image }} />
      {showText && <span className={cn("font-semibold tracking-[-0.025em] leading-[.95]", s.title, text)}>
        Nascimento
        <span className="block mt-1 text-[0.52em] font-medium tracking-[0.18em] uppercase opacity-65">Reformas</span>
      </span>}
    </span>
  );
  return href ? <Link href={href} className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500">{content}</Link> : content;
}
