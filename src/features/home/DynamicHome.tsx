"use client";
import { AnimatePresence,motion } from "framer-motion";
import Link from "next/link";
import { useEffect,useState } from "react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils";
import { SITE } from "@/lib/site";
import type { HomepageContent, ServiceCategory } from "@/lib/cms-defaults";

type Project=any;

export function DynamicHome({content,projects: _projects,siteAccent="#0B3A64",orange="#E47C19"}:{content:HomepageContent;projects:Project[];siteAccent?:string;orange?:string}){
  const [slide,setSlide]=useState(0);
  const slides=content.hero.images.filter(i=>i.image);
  const accent=siteAccent||content.hero.accentColor||"#0B3A64";
  const wa=buildWhatsAppUrl(SITE.whatsapp,"Olá, gostaria de solicitar um orçamento para uma reforma.");

  useEffect(()=>{if(slide>=slides.length)setSlide(0)},[slide,slides.length]);
  useEffect(()=>{if(slides.length<2)return;const timer=window.setInterval(()=>setSlide(v=>(v+1)%slides.length),Math.max(2500,content.hero.heroInterval));return()=>window.clearInterval(timer)},[slides.length,content.hero.heroInterval]);

  return <main style={{["--site-accent" as string]:accent}}>
    <section className="relative min-h-[100svh] overflow-hidden bg-[#081A2A] text-white">
      {slides.length?slides.map((item,index)=><motion.img key={`${item.image}-${index}`} src={item.image} alt={item.alt||"Obra Nascimento Reformas"} className="absolute inset-0 h-full w-full object-cover" initial={{opacity:0}} animate={{opacity:index===slide?1:0,scale:index===slide?1:1.035}} transition={{duration:1.15,ease:"easeInOut"}}/>):<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(11,58,100,.5),transparent_38%),linear-gradient(135deg,#0B3A64,#07131e)]"/>}
      <div className="absolute inset-0 bg-black" style={{opacity:Math.min(90,Math.max(0,content.hero.heroOverlay))/100}}/>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"/>
      {content.hero.showGrid&&<div className="absolute inset-0 bg-grid-subtle opacity-15"/>}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1380px] items-end px-5 pb-10 pt-32 sm:px-8 lg:pb-16 lg:px-12">
        <div className="grid w-full items-end gap-10 lg:grid-cols-[1fr_430px]">
          <div className="max-w-4xl pb-4">
            <div className="mb-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-[.24em] text-white/80"><span className="h-px w-12" style={{backgroundColor:accent}}/>{content.hero.eyebrow}</div>
            <AnimatePresence mode="wait"><motion.div key={`${content.hero.title}-${content.hero.highlight}`} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} transition={{duration:.6}}><h1 className="max-w-4xl text-5xl font-semibold leading-[.96] tracking-[-.05em] sm:text-6xl lg:text-7xl">{content.hero.title} <span className="relative inline-block" style={{color:accent,textShadow:`0 0 18px ${accent}55,0 0 42px ${accent}25`}}>{content.hero.highlight}</span></h1><p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/82 sm:text-xl">{content.hero.description}</p></motion.div></AnimatePresence>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={wa} target="_blank" rel="noreferrer"><Button variant="accent" size="lg">{content.hero.primaryLabel}</Button></a><Link href="#servicos"><Button variant="outline" size="lg" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-navy-900">{content.hero.secondaryLabel}</Button></Link></div>
            {slides.length>0&&<div className="mt-10 flex items-center gap-3">{slides.map((item,index)=><button key={item.image+index} onClick={()=>setSlide(index)} aria-label={`Mostrar imagem ${index+1}`}><span className="block h-px transition-all duration-500" style={{width:index===slide?48:20,backgroundColor:index===slide?accent:"rgba(255,255,255,.45)"}}/></button>)}</div>}
          </div>
          <motion.aside initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} className="relative overflow-hidden border border-white/20 bg-white/[.09] p-7 backdrop-blur-xl sm:p-8"><span className="absolute left-0 top-0 h-20 w-1" style={{backgroundColor:accent}}/><span className="absolute right-0 bottom-0 h-24 w-1" style={{backgroundColor:orange}}/><div className="mb-8 text-xs font-semibold uppercase tracking-[.22em] text-white/60">01 · Primeiro passo</div><h2 className="text-2xl font-semibold leading-tight sm:text-3xl">{content.hero.panelTitle}</h2><p className="mt-4 leading-relaxed text-white/76">{content.hero.panelText}</p><a href={wa} target="_blank" rel="noreferrer" className="mt-8 flex h-12 items-center justify-between border px-5 text-sm font-semibold transition hover:bg-white hover:text-navy-900" style={{borderColor:accent}}>{content.hero.primaryLabel}<span>↗</span></a><Link href="#servicos" className="mt-3 flex h-12 items-center justify-between border border-white/15 px-5 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white">Ver áreas de atuação <span>→</span></Link></motion.aside>
        </div>
      </div>
    </section>

    <section id="servicos" className="scroll-mt-24 bg-[#F4F3EF] px-5 py-24 text-navy-950 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end"><div><p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em]" style={{color:orange}}><span className="h-px w-10" style={{backgroundColor:orange}}/>{content.areas.eyebrow}</p><h2 className="text-4xl font-semibold leading-[1.02] tracking-[-.05em] sm:text-6xl" style={{textShadow:`0 0 28px ${accent}12`}}>{content.areas.title}<br/><em className="not-italic" style={{color:accent,textShadow:`0 0 18px ${accent}28`}}>{content.areas.highlight}</em></h2></div><p className="text-lg leading-relaxed text-stone-600">{content.areas.description}</p></div>
        <div className="mt-16 grid gap-6 lg:grid-cols-2">{content.areas.categories.map((category,index)=><ServiceCard key={`${category.number}-${category.title}-${index}`} category={category} index={index} accent={accent} orange={orange} wa={wa}/>)}</div>
      </div>
    </section>

    <GalleryRail content={content.gallery} accent={accent} />

    <section className="bg-white px-5 py-24 sm:px-8 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1280px]"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="mb-5 text-xs font-semibold uppercase tracking-[.24em]" style={{color:accent}}>{content.method.eyebrow}</p><div className="font-mono text-xs text-stone-400">01 <span className="mx-3 inline-block h-px w-16 bg-stone-300"/> 06</div></div><div><h2 className="text-4xl font-semibold leading-tight tracking-[-.045em] text-navy-950 sm:text-6xl" style={{textShadow:`0 0 26px ${accent}14`}}>{content.method.title}<br/><em className="not-italic" style={{color:orange,textShadow:`0 0 16px ${orange}25`}}>{content.method.highlight}</em></h2><p className="mt-7 max-w-2xl text-lg leading-relaxed text-stone-600">{content.method.description}</p></div></div></div></section>

    <section id="contato" className="relative overflow-hidden bg-[#0B3A64] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-28"><div className="relative mx-auto flex max-w-[1280px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="mb-5 text-xs font-semibold uppercase tracking-[.24em]" style={{color:orange}}>Nascimento Reformas · {SITE.region}</p><h2 className="text-4xl font-semibold tracking-[-.045em] sm:text-6xl" style={{textShadow:`0 0 26px ${accent}55`}}>{content.finalCta.title}</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{content.finalCta.description}</p></div><a href={wa} target="_blank" rel="noreferrer"><Button variant="accent" size="lg">{content.finalCta.button} ↗</Button></a></div></section>
  </main>
}

function ServiceCard({category,index,accent,orange,wa}:{category:ServiceCategory;index:number;accent:string;orange:string;wa:string}){
  const lineColor=index%2===0?accent:orange;
  return <motion.article whileHover={{y:-5}} transition={{duration:.25}} className="group relative grid min-h-[290px] overflow-hidden border border-stone-200 bg-white shadow-[0_12px_40px_rgba(10,28,43,.06)] sm:grid-cols-[46%_54%]"><span className="absolute left-0 top-0 z-20 h-14 w-1 transition-all duration-500 group-hover:h-24" style={{backgroundColor:lineColor}}/><div className="relative min-h-[230px] overflow-hidden bg-stone-200 sm:min-h-full">{category.image?<img src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"/>:<div className="grid h-full place-items-center p-8 text-center text-sm text-stone-400">Imagem da área ainda não cadastrada</div>}<div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/20 opacity-0 transition group-hover:opacity-100"/></div><div className="relative flex flex-col justify-between p-7 sm:p-8"><div><div className="flex items-center justify-between"><span className="font-mono text-xs font-medium tracking-[.18em] text-stone-400">{category.number||String(index+1).padStart(2,"0")}</span><span className="text-xs font-semibold uppercase tracking-[.18em]" style={{color:lineColor}}>Nascimento</span></div><h3 className="mt-10 text-2xl font-medium leading-tight tracking-[-.035em] text-navy-950 sm:text-[30px]" style={{textShadow:`0 0 20px ${lineColor}18`}}>{category.title}</h3><p className="mt-4 max-w-md text-[15px] leading-7 text-stone-600">{category.description}</p></div><a href={wa} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.16em] transition group-hover:gap-4" style={{color:lineColor}}>Solicitar orçamento <span className="text-base">↗</span></a></div></motion.article>
}

function GalleryRail({content,accent}:{content:HomepageContent["gallery"];accent:string}){
  const images=content.images.filter(item=>item.image);
  const [index,setIndex]=useState(0);
  const [animating,setAnimating]=useState(true);
  const loop=[...images,...images];
  useEffect(()=>{if(index>=images.length&&images.length){const t=window.setTimeout(()=>{setAnimating(false);setIndex(0);requestAnimationFrame(()=>requestAnimationFrame(()=>setAnimating(true)))},750);return()=>window.clearTimeout(t)}},[index,images.length]);
  useEffect(()=>{if(images.length<2)return;const t=window.setInterval(()=>setIndex(v=>v+1),Math.max(3500,content.interval||6200));return()=>window.clearInterval(t)},[images.length,content.interval]);
  if(!images.length)return null;
  const move=(direction:number)=>setIndex(v=>{if(direction>0)return v+1;return v===0?images.length-1:v-1});
  return <section id="galeria" className="scroll-mt-24 overflow-hidden bg-stone-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1280px]"><div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.22em]" style={{color:accent}}><span className="h-px w-8" style={{backgroundColor:accent}}/>{content.eyebrow}</p><h2 className="text-3xl font-semibold tracking-[-.045em] text-navy-950 sm:text-5xl">{content.title}</h2></div><div className="flex items-center gap-2"><button type="button" onClick={()=>move(-1)} aria-label="Imagem anterior" className="grid h-11 w-11 place-items-center border border-stone-300 bg-white text-navy-900 transition hover:border-navy-900 hover:bg-navy-900 hover:text-white">←</button><button type="button" onClick={()=>move(1)} aria-label="Próxima imagem" className="grid h-11 w-11 place-items-center border bg-white text-navy-900 transition hover:border-navy-900 hover:bg-navy-900 hover:text-white" style={{borderColor:accent}}>→</button></div></div><div className="relative -mx-5 overflow-hidden px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"><div className="flex gap-4" style={{transform:`translate3d(calc(-${index} * (var(--gallery-card-width) + 1rem)),0,0)`,transition:animating?"transform 750ms cubic-bezier(.22,.61,.36,1)":"none"}}>{loop.map((item,i)=><figure key={`${item.image}-${i}`} className="relative shrink-0 overflow-hidden bg-stone-200" style={{width:"var(--gallery-card-width)"}}><img src={item.image} alt={item.alt||item.label||"Imagem de obra"} className="aspect-[1.25/1] h-auto w-full object-cover"/><div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent"/>{item.label&&<figcaption className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[.16em] text-white">{item.label}</figcaption>}</figure>)}</div></div></div><style jsx>{`:global(main){--gallery-card-width:78vw}@media(min-width:640px){:global(main){--gallery-card-width:42vw}}@media(min-width:1024px){:global(main){--gallery-card-width:31%}}`}</style></section>
}
