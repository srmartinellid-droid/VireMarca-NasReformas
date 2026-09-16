"use client";

import { motion } from "framer-motion";

const points = [
  {
    title: "Experiência",
    description:
      "Quinze anos de atuação na região, com foco em reformas residenciais.",
  },
  {
    title: "Atendimento regional",
    description:
      "Palhoça e Grande Florianópolis. Conhecimento do contexto local.",
  },
  {
    title: "Cuidado com o acabamento",
    description:
      "Atenção aos detalhes que definem a qualidade final do ambiente.",
  },
  {
    title: "Execução organizada",
    description:
      "Trabalho planejado, com respeito ao imóvel e à rotina de quem mora nele.",
  },
  {
    title: "Comunicação direta",
    description:
      "Contato claro e objetivo ao longo de todo o processo.",
  },
];

export function WhyNascimento() {
  return (
    <section className="py-20 md:py-28 bg-stone-100">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mb-3">
            Por que Nascimento
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-navy-900 tracking-tight">
            O que orienta o trabalho
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-xl p-6 border border-stone-200/80"
            >
              <h3 className="text-lg font-semibold text-navy-900 mb-2">
                {point.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
