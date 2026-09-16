"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/site";
import { track } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/utils";
import { SITE } from "@/lib/site";
import Link from "next/link";

export function Services() {
  return (
    <section id="servicos" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mb-3">
            Serviços
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-navy-900 tracking-tight">
            Do detalhe à reforma completa
          </h2>
          <p className="mt-4 text-stone-600 text-lg">
            Intervenções planejadas para residências, com foco em execução e
            acabamento.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group relative p-6 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-navy-200 hover:shadow-md transition-all duration-300"
              onMouseEnter={() =>
                track({ name: "service_viewed", props: { service: service.slug } })
              }
            >
              <span className="text-xs font-mono text-stone-400 mb-3 block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold text-navy-900 mb-2 group-hover:text-navy-800">
                {service.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {service.short}
              </p>
              <a
                href={buildWhatsAppUrl(
                  SITE.whatsapp,
                  `Olá, gostaria de saber mais sobre o serviço de ${service.title.toLowerCase()}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-accent-600 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() =>
                  track({
                    name: "whatsapp_click",
                    props: { location: "service-card", service: service.slug },
                  })
                }
              >
                Solicitar →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
