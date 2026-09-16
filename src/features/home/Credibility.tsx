"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

export function Credibility() {
  return (
    <section className="py-20 md:py-28 bg-stone-50">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mb-4">
              Experiência regional
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-navy-900 tracking-tight text-balance">
              {SITE.yearsExperience} anos construindo confiança na Grande Florianópolis
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-stone-600 text-lg leading-relaxed"
          >
            <p>
              Atuação focada em reformas residenciais — do serviço pontual à
              reforma de maior porte. Trabalho organizado, comunicação direta e
              atenção ao acabamento.
            </p>
            <p>
              O objetivo é entrar em residências de médio e alto padrão e
              entregar um resultado que respeite o imóvel e as expectativas de
              quem mora nele.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
