"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

export function Region() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mb-3">
            Região de atuação
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-navy-900 tracking-tight">
            Palhoça e Grande Florianópolis
          </h2>
          <p className="mt-4 text-stone-600 text-lg leading-relaxed">
            Atendimento em Palhoça e municípios da região metropolitana de
            Florianópolis. Experiência local de {SITE.yearsExperience} anos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
