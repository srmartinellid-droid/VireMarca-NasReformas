"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/site";

export function Process() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mb-3">
            Como trabalhamos
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-navy-900 tracking-tight">
            Processo claro, do primeiro contato à entrega
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line on desktop */}
          <div className="hidden lg:block absolute left-[2.25rem] top-0 bottom-0 w-px bg-stone-200" />

          <ol className="space-y-10 lg:space-y-12">
            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="relative flex gap-6 lg:gap-10"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-navy-800 text-white text-sm font-semibold flex items-center justify-center z-10">
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-stone-600 max-w-xl">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
