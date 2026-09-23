import type { Metadata } from "next";
import { SITE, resolveWhatsapp } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Quem somos",
  description: `Conheça a trajetória de ${SITE.name}: ${SITE.yearsExperience} anos de experiência em reformas residenciais na Grande Florianópolis.`,
  alternates: { canonical: "/quem-somos" },
  openGraph: { url: "/quem-somos", title: `Quem somos | ${SITE.name}` },
};

export default function QuemSomosPage() {
  const whatsapp = resolveWhatsapp(SITE.whatsapp);
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mb-4">Quem somos</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-navy-900 tracking-tight text-balance">{SITE.yearsExperience} anos construindo experiência na Grande Florianópolis</h1>
          <div className="mt-10 space-y-6 text-lg text-stone-600 leading-relaxed">
            <p>A Nascimento Reformas atua a partir de Palhoça, atendendo a região metropolitana de Florianópolis há aproximadamente quinze anos.</p>
            <p>O foco está em reformas residenciais — de intervenções específicas (drywall, gesso, hidráulica, adequações) a reformas de maior porte — com atenção especial a residências de médio e alto padrão.</p>
            <p>O trabalho é orientado por execução cuidadosa, organização e respeito ao imóvel e à rotina de quem mora nele.</p>
          </div>
          <div className="mt-14 aspect-[16/9] rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center"><p className="text-stone-400 text-sm">Espaço reservado para foto do profissional</p></div>
          <div className="mt-14 p-8 rounded-2xl bg-navy-900 text-white"><h2 className="text-2xl font-semibold mb-3">Filosofia de trabalho</h2><p className="text-stone-300 leading-relaxed">Cada reforma é tratada com o mesmo critério: entender a necessidade, planejar a intervenção e executar com cuidado no acabamento. O objetivo é entregar um resultado que o cliente possa confiar.</p></div>
          <div className="mt-12"><a href={buildWhatsAppUrl(whatsapp, "Olá, gostaria de conhecer melhor o trabalho da Nascimento Reformas.")} target="_blank" rel="noopener noreferrer"><Button variant="accent" size="lg">Conversar no WhatsApp</Button></a></div>
        </div>
      </div>
    </div>
  );
}
