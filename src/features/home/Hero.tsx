"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { track } from "@/lib/analytics";
import Link from "next/link";

export function Hero() {
  const handleCta = (label: string) => track({ name: "cta_clicked", props: { location: "hero", label } });
  return <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-stone-50 pt-24 md:pt-28">
    <div className="absolute inset-0 bg-grid-subtle opacity-40" />
    <div className="absolute -right-32 top-1/4 h-[34rem] w-[34rem] rounded-full bg-navy-900/[0.035] blur-3xl" />
    <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-accent-500/[0.045] blur-3xl" />
    <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.65}} className="mb-8 flex items-center gap-4">
          <span className="h-px w-12 bg-accent-500"/><span className="text-xs font-semibold uppercase tracking-[.22em] text-navy-700">{SITE.yearsExperience} anos na Grande Florianópolis</span>
        </motion.div>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.08}} className="text-5xl font-semibold leading-[.98] tracking-[-.045em] text-navy-950 sm:text-6xl lg:text-[5.25rem]">Reformas que transformam espaços.</motion.h1>
        <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2}} className="mt-7 max-w-xl text-lg leading-relaxed text-stone-600 sm:text-xl">Execução cuidadosa para residências de médio e alto padrão em Palhoça e toda a Grande Florianópolis.</motion.p>
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.32}} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={buildWhatsAppUrl(SITE.whatsapp,"Olá, gostaria de solicitar um orçamento para uma reforma.")} target="_blank" rel="noopener noreferrer" onClick={()=>handleCta("solicitar-orcamento")}><Button variant="accent" size="lg">Solicitar orçamento</Button></a>
          <Link href="/#portfolio" onClick={()=>handleCta("ver-trabalhos")}><Button variant="outline" size="lg" className="border-navy-900/20 text-navy-900 hover:bg-navy-900 hover:text-white">Ver trabalhos</Button></Link>
        </motion.div>
      </div>
      <motion.div initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} transition={{duration:1,delay:.15}} className="relative mx-auto w-full max-w-2xl">
        <div className="absolute -inset-4 border border-navy-900/10" />
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 shadow-xl">
          <Image src="/logo.png" alt="Nascimento Reformas" width={760} height={570} priority className="absolute inset-0 m-auto h-auto w-[58%] object-contain opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-navy-900/[0.06]" />
        </div>
        <div className="absolute -bottom-5 -left-5 bg-navy-900 px-6 py-4 text-white shadow-lg"><span className="block text-2xl font-semibold">15+</span><span className="text-[10px] uppercase tracking-[.18em] text-white/65">anos de experiência</span></div>
      </motion.div>
    </div>
    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-stone-100/70 to-transparent" />
  </section>;
}
