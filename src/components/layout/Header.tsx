"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { buildWhatsAppUrl as waUrl } from "@/lib/utils";

const nav = [
  { href: "/", label: "Início" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#portfolio", label: "Trabalhos" },
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleWhatsApp = () => {
    track({ name: "whatsapp_click", props: { location: "header" } });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Logo size="md" showText={true} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-navy-800/80 hover:text-navy-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={waUrl(SITE.whatsapp, "Olá, gostaria de solicitar um orçamento para uma reforma.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsApp}
            >
              <Button variant="accent" size="sm">
                Solicitar orçamento
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-navy-800"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-3 text-base font-medium text-navy-800 rounded-lg hover:bg-stone-100"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={waUrl(SITE.whatsapp, "Olá, gostaria de solicitar um orçamento para uma reforma.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsApp}
              className="mt-2"
            >
              <Button variant="accent" className="w-full">
                Solicitar orçamento
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
