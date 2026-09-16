"use client";

import { motion } from "framer-motion";

export function Specialty() {
  return (
    <section className="py-20 md:py-28 bg-navy-900 text-white overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent-400 text-sm font-medium tracking-widest uppercase mb-4">
              Especialidade
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance leading-tight">
              Do detalhe à reforma completa
            </h2>
            <p className="mt-6 text-stone-300 text-lg leading-relaxed">
              Atuamos tanto em intervenções específicas — drywall, gesso,
              hidráulica, adequações — quanto em reformas de maior porte.
            </p>
            <p className="mt-4 text-stone-300 text-lg leading-relaxed">
              O mesmo padrão de organização e cuidado com o acabamento em
              qualquer escala de trabalho.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center">
              <div className="text-center px-8">
                <p className="text-stone-400 text-sm uppercase tracking-wider mb-2">
                  Espaço para imagem editorial
                </p>
                <p className="text-stone-500 text-xs max-w-xs mx-auto">
                  Ambiente residencial em processo de acabamento — luz natural,
                  materiais e precisão de execução.
                </p>
              </div>
            </div>
            {/* Subtle architectural lines */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent-500/30 rounded-lg pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
