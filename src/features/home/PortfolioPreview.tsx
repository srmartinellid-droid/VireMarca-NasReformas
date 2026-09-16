"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Portfolio section — when no real projects exist in the database,
 * we show an elegant empty state that invites the client to upload
 * real work via the admin panel. Never invents photos or project names.
 */
export function PortfolioPreview() {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-stone-50">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mb-3">
              Trabalhos
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-navy-900 tracking-tight">
              Portfólio
            </h2>
            <p className="mt-3 text-stone-600">
              Galeria de obras e intervenções. As imagens reais são gerenciadas
              pelo painel administrativo.
            </p>
          </div>
        </motion.div>

        {/* Empty state — elegant, not broken */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 md:p-20 text-center"
        >
          <div className="mx-auto max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-navy-900 mb-2">
              Galeria em construção
            </h3>
            <p className="text-stone-600 mb-8">
              Os projetos reais serão publicados aqui assim que as fotos de
              obras forem carregadas no painel. Até lá, o espaço permanece
              reservado para o trabalho autêntico.
            </p>
            <p className="text-sm text-stone-500">
              Categorias previstas: Reforma completa · Drywall · Gesso ·
              Hidráulica · Acabamentos · Antes e depois
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
