"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SITE, resolveWhatsapp } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { HomepageContent, ServiceCategory } from "@/lib/cms-defaults";

type Props = { content: HomepageContent; siteAccent?: string; orange?: string };

export function DynamicHomeV2({ content, siteAccent = "#0B3A64", orange = "#E47C19" }: Props) {
  const accent = siteAccent || content.hero.accentColor || "#0B3A64";
  const whatsapp = resolveWhatsapp(content.whatsapp);
  const wa = buildWhatsAppUrl(whatsapp, "Olá, gostaria de solicitar um orçamento para uma reforma.");
  const handleWhatsApp = (location: "hero" | "service" | "cta") => track({ name: "whatsapp_click", props: { location } });
  const [slide, setSlide] = useState(0);
  const slides = content.hero.images.filter((item) => item.image);

  useEffect(() => {
    if (slide >= slides.length) setSlide(0);
  }, [slide, slides.length]);
  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % slides.length), Math.max(2500, content.hero.heroInterval));
    return () => window.clearInterval(timer);
  }, [slides.length, content.hero.heroInterval]);

  return (
    <main style={{ ["--site-accent" as string]: accent }}>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#081A2A] text-white">
        {slides.length ? slides.map((item, index) => (
          <motion.div key={`${item.image}-${index}`} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: index === slide ? 1 : 0, scale: index === slide ? 1 : 1.025 }} transition={{ duration: 1.1, ease: "easeInOut" }}><Image src={item.image} alt={item.alt || "Obra Nascimento Reformas"} fill sizes="100vw" className="object-cover" priority={index === 0} /></motion.div>
        )) : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(11,58,100,.5),transparent_38%),linear-gradient(135deg,#0B3A64,#07131e)]" />}
        <div className="absolute inset-0 bg-black" style={{ opacity: Math.min(90, Math.max(0, content.hero.heroOverlay)) / 100 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        {content.hero.showGrid && <div className="absolute inset-0 bg-grid-subtle opacity-15" />}
        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1380px] items-end px-5 pb-10 pt-32 sm:px-8 lg:px-12 lg:pb-16">
          <div className="grid w-full items-end gap-10 lg:grid-cols-[1fr_430px]">
            <div className="max-w-4xl pb-4">
              <div className="mb-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-[.24em] text-white/80"><span className="h-px w-12" style={{ backgroundColor: accent }} />{content.hero.eyebrow}</div>
              <AnimatePresence mode="wait"><motion.div key={`${content.hero.title}-${content.hero.highlight}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: .6 }}><h1 className="max-w-4xl text-5xl font-semibold leading-[.96] tracking-[-.05em] sm:text-6xl lg:text-7xl">{content.hero.title} <span style={{ color: "#FFFFFF", textShadow: "0 2px 12px rgba(0,0,0,.55)" }}>{content.hero.highlight}</span></h1><p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/82 sm:text-xl">{content.hero.description}</p></motion.div></AnimatePresence>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={wa} target="_blank" rel="noreferrer" onClick={() => handleWhatsApp("hero")}><Button variant="accent" size="lg">{content.hero.primaryLabel}</Button></a><Link href="#servicos"><Button variant="outline" size="lg" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-navy-900">{content.hero.secondaryLabel}</Button></Link></div>
              {slides.length > 0 && <div className="mt-10 flex items-center gap-3">{slides.map((item, index) => <button key={`${item.image}-${index}`} onClick={() => setSlide(index)} aria-label={`Mostrar imagem ${index + 1}`}><span className="block h-px transition-all duration-500" style={{ width: index === slide ? 48 : 20, backgroundColor: index === slide ? accent : "rgba(255,255,255,.45)" }} /></button>)}</div>}
            </div>
            <motion.aside initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden border border-white/20 bg-white/[.09] p-7 backdrop-blur-xl sm:p-8"><span className="absolute left-0 top-0 h-20 w-1" style={{ backgroundColor: accent }} /><span className="absolute right-0 bottom-0 h-24 w-1" style={{ backgroundColor: orange }} /><div className="mb-8 text-xs font-semibold uppercase tracking-[.22em] text-white/60">01 · Primeiro passo</div><h2 className="text-2xl font-semibold leading-tight sm:text-3xl">{content.hero.panelTitle}</h2><p className="mt-4 leading-relaxed text-white/76">{content.hero.panelText}</p><a href={wa} target="_blank" rel="noreferrer" onClick={() => handleWhatsApp("hero")} className="mt-8 flex h-12 items-center justify-between border px-5 text-sm font-semibold transition hover:bg-white hover:text-navy-900" style={{ borderColor: accent }}>{content.hero.primaryLabel}<span>↗</span></a><Link href="#servicos" className="mt-3 flex h-12 items-center justify-between border border-white/15 px-5 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white">Ver áreas de atuação <span>→</span></Link></motion.aside>
          </div>
        </div>
      </section>

      <section id="servicos" className="scroll-mt-24 bg-[#F4F3EF] px-5 py-24 text-navy-950 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end"><div><p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em]" style={{ color: orange }}><span className="h-px w-10" style={{ backgroundColor: orange }} />{content.areas.eyebrow}</p><h2 className="text-4xl font-semibold leading-[1.02] tracking-[-.05em] sm:text-6xl">{content.areas.title}<br /><em className="not-italic" style={{ color: accent }}>{content.areas.highlight}</em></h2></div><p className="text-lg leading-relaxed text-stone-600">{content.areas.description}</p></div>
          <div className="mt-16 grid gap-6 lg:grid-cols-2">{content.areas.categories.map((category, index) => <ServiceCard key={`${category.id ?? category.slug ?? category.title}-${index}`} category={category} index={index} accent={accent} orange={orange} wa={wa} />)}</div>
        </div>
      </section>

      <GalleryRail content={content.gallery} accent={accent} orange={orange} />

      <section className="relative overflow-hidden bg-white px-5 py-24 text-navy-950 sm:px-8 lg:px-12 lg:py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-stone-200" /><div className="absolute left-0 top-0 h-1 w-24" style={{ backgroundColor: orange }} /><div className="absolute right-0 bottom-0 h-1 w-32" style={{ backgroundColor: accent }} />
        <div className="mx-auto max-w-[1280px]"><div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20"><div className="border-l-2 pl-6" style={{ borderColor: orange }}><p className="text-xs font-bold uppercase tracking-[.24em]" style={{ color: orange }}>{content.method.eyebrow}</p><div className="mt-8 font-mono text-sm tracking-[.16em] text-stone-400">01 <span className="mx-3 inline-block h-px w-14 align-middle bg-stone-300" /> 04</div><p className="mt-5 max-w-[180px] text-sm leading-6 text-stone-500">Um processo contínuo, do primeiro alinhamento à entrega.</p></div><div><h2 className="max-w-5xl text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">{content.method.title}<br /><span style={{ color: accent }}>{content.method.highlight}</span></h2><div className="mt-9 flex max-w-4xl items-start gap-5"><span className="mt-3 h-px w-10 shrink-0" style={{ backgroundColor: orange }} /><p className="text-lg leading-8 text-stone-600 sm:text-xl">{content.method.description}</p></div><ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{content.method.steps.map((step) => <li key={step.number} className="border-t-2 border-stone-200 pt-5"><div className="font-mono text-xs font-semibold tracking-[.18em]" style={{ color: orange }}>{step.number}</div><h3 className="mt-4 text-lg font-semibold text-navy-950">{step.title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{step.description}</p></li>)}</ol></div></div></div>
      </section>

      <section id="contato" className="relative overflow-hidden bg-[#0B3A64] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-28"><div className="relative mx-auto flex max-w-[1280px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="mb-5 text-xs font-semibold uppercase tracking-[.24em]" style={{ color: orange }}>Nascimento Reformas · {SITE.region}</p><h2 className="text-4xl font-semibold tracking-[-.045em] sm:text-6xl">{content.finalCta.title}</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{content.finalCta.description}</p></div><a href={wa} target="_blank" rel="noreferrer" onClick={() => handleWhatsApp("cta")}><Button variant="accent" size="lg">{content.finalCta.button} ↗</Button></a></div></section>
    </main>
  );
}

function ServiceCard({ category, index, accent, orange, wa }: { category: ServiceCategory; index: number; accent: string; orange: string; wa: string }) {
  const lineColor = index % 2 === 0 ? accent : orange;
  return <motion.article whileHover={{ y: -4 }} transition={{ duration: .25 }} className="group relative grid min-h-[300px] overflow-hidden border border-stone-200 bg-white shadow-[0_12px_40px_rgba(10,28,43,.06)] sm:grid-cols-[46%_54%]"><span className="absolute left-0 top-0 z-20 h-14 w-1 transition-all duration-500 group-hover:h-20" style={{ backgroundColor: lineColor }} /><div className="relative min-h-[230px] overflow-hidden bg-stone-100 p-4 sm:min-h-full sm:p-5">{category.image ? <div className="h-full overflow-hidden bg-stone-200"><Image src={category.image} alt={category.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 580px" className="object-cover object-center transition duration-700 group-hover:scale-[1.012]" loading="lazy" /></div> : <div className="grid h-full min-h-[230px] place-items-center p-8 text-center text-sm text-stone-400">Imagem da área ainda não cadastrada</div>}</div><div className="relative flex flex-col justify-between p-7 sm:p-8"><div><div className="flex items-center justify-between"><span className="font-mono text-xs font-medium tracking-[.18em] text-stone-400">{category.number || String(index + 1).padStart(2, "0")}</span><span className="text-xs font-semibold uppercase tracking-[.18em]" style={{ color: lineColor }}>Nascimento</span></div><h3 className="mt-10 text-2xl font-medium leading-tight tracking-[-.035em] text-navy-950 sm:text-[30px]">{category.title}</h3><p className="mt-4 max-w-md text-[15px] leading-7 text-stone-600">{category.description}</p></div><a href={wa} target="_blank" rel="noreferrer" onClick={() => track({ name: "whatsapp_click", props: { location: "service" } })} className="mt-7 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.16em] transition group-hover:gap-4" style={{ color: lineColor }}>Solicitar orçamento <span className="text-base">↗</span></a></div></motion.article>;
}

function GalleryRail({ content, accent, orange }: { content: HomepageContent["gallery"]; accent: string; orange: string }) {
  const images = useMemo(() => {
    const seen = new Set<string>();
    return content.images.filter((item) => {
      const url = item.image?.trim();
      if (!url || seen.has(url)) return false;
      seen.add(url);
      return true;
    });
  }, [content.images]);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [transition, setTransition] = useState(true);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  }, []);

  useEffect(() => {
    if (index >= images.length && images.length > 0) {
      setTransition(false);
      setIndex(0);
      requestAnimationFrame(() => setTransition(true));
    }
  }, [index, images.length]);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    const timer = window.setTimeout(() => {
      setIndex((value) => (value + 1 >= images.length ? 0 : value + 1));
    }, Math.max(3500, content.interval || 6200));
    return () => window.clearTimeout(timer);
  }, [images.length, content.interval, paused, index]);

  const pauseForSelection = () => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 10000);
  };

  const move = (direction: number) => {
    if (images.length < 2) return;
    pauseForSelection();
    setIndex((value) => {
      if (direction > 0) return value + 1 >= images.length ? 0 : value + 1;
      return value - 1 < 0 ? images.length - 1 : value - 1;
    });
  };

  const selectImage = (selectedIndex: number) => {
    pauseForSelection();
    setIndex(selectedIndex);
  };

  return <section id="galeria" className="scroll-mt-24 overflow-hidden border-y border-stone-200 bg-[#F7F6F2] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-10">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[.24em]" style={{ color: orange }}><span className="h-px w-10" style={{ backgroundColor: orange }} />{content.eyebrow}</p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-.05em] text-navy-950 sm:text-6xl">{content.title}</h2>
          <div className="mt-5 h-1 w-16" style={{ backgroundColor: accent }} />
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-600">Um recorte visual do trabalho, em movimento contínuo.</p>
        </div>
      </div>

      {images.length ? <div className="relative -mx-5 overflow-hidden px-5 pb-7 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20">
          <button type="button" onClick={() => move(-1)} aria-label="Imagem anterior" className="pointer-events-auto absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-lg text-navy-900 shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white sm:left-5">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Próxima imagem" className="pointer-events-auto absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-lg text-navy-900 shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white sm:right-5">→</button>
        </div>

        <div className="flex items-center gap-4 py-3" style={{ transform: `translate3d(calc(-${index} * (var(--gallery-card-width) + 1rem)),0,0)`, transition: transition ? "transform 1400ms cubic-bezier(.22,.61,.36,1)" : "none", ['--gallery-card-width' as string]: 'calc(100vw - 40px)' }}>
          {images.map((item, i) => {
            const active = i === index;
            const raised = active || hovered === i;
            return <figure key={`${item.image}-${i}`} onClick={() => selectImage(i)} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className="relative shrink-0 cursor-pointer overflow-hidden bg-stone-200 transition-[transform,box-shadow,outline] duration-500 sm:[--gallery-card-width:65vw] lg:[--gallery-card-width:380px]" style={{ width: 'var(--gallery-card-width)', aspectRatio: '4 / 3', transform: raised ? 'scale(1.018)' : 'scale(1)', zIndex: raised ? 10 : 1, boxShadow: raised ? `0 18px 45px ${accent}22` : '0 8px 24px rgba(10,28,43,.08)', outline: active ? `3px solid ${accent}` : '3px solid transparent', outlineOffset: '-3px' }}>
              <Image src={item.image} alt={item.alt || "Imagem da obra"} fill sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 65vw, 380px" className="object-cover" loading="lazy" draggable={false} />
            </figure>;
          })}
        </div>
      </div> : <div className="border border-dashed border-stone-300 bg-white p-10 text-sm text-stone-500">A galeria está pronta para receber imagens pelo painel administrativo.</div>}
    </div>
  </section>;
}
