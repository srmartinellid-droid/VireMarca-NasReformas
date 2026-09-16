"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { track } from "@/lib/analytics";
import Link from "next/link";

export function Hero() {
  const handleCta = (label: string) => {
    track({ name: "cta_clicked", props: { location: "hero", label } });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Subtle architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/60 to-navy-950" />

      {/* Soft radial accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-accent-400 text-sm font-medium tracking-widest uppercase mb-6"
        >
          {SITE.yearsExperience} anos na Grande Florianópolis
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight text-balance leading-[1.1] max-w-4xl mx-auto"
        >
          Reformas que transformam espaços
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed"
        >
          Execução cuidadosa para residências de médio e alto padrão em
          Palhoça e toda a Grande Florianópolis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={buildWhatsAppUrl(
              SITE.whatsapp,
              "Olá, gostaria de solicitar um orçamento para uma reforma."
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCta("solicitar-orcamento")}
          >
            <Button variant="accent" size="lg">
              Solicitar orçamento
            </Button>
          </a>
          <Link href="/#portfolio" onClick={() => handleCta("ver-trabalhos")}>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-navy-900"
            >
              Ver trabalhos
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent" />
    </section>
  );
}
