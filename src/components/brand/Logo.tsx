"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
interface LogoProps { className?: string; variant?: "default" | "light" | "dark"; size?: "sm" | "md" | "lg"; showText?: boolean; href?: string; initialLogo?: string; initialWordmark?: string; }
const sizes = { sm: { image: 40, wordmark: 112 }, md: { image: 58, wordmark: 152 }, lg: { image: 76, wordmark: 190 } };
export function Logo({ className, variant = "default", size = "md", showText = true, href = "/", initialLogo="/logo.png", initialWordmark="" }: LogoProps) {
 const [src,setSrc]=useState(initialLogo||"/logo.png"); const [wordmark,setWordmark]=useState(initialWordmark); const s=sizes[size]; const text=variant==="light"?"text-white":"text-navy-900";
 useEffect(()=>{let active=true;(async()=>{const {createClient}=await import("@/lib/supabase/client");const supabase=createClient();const {data}=await supabase.from("settings").select("key,value").in("key",["logo_url","wordmark_url"]);const map=Object.fromEntries((data??[]).map(r=>[r.key,r.value]));if(active){if(map.logo_url)setSrc(map.logo_url);if(map.wordmark_url)setWordmark(map.wordmark_url)}})();return()=>{active=false}},[]);
 const content=<span className={cn("inline-flex items-center gap-3.5",className)}><Image src={src} alt="Nascimento Reformas" width={s.image} height={s.image} sizes={`${s.image}px`} className="h-auto object-contain" style={{width:s.image}}/>{showText&&(wordmark?<Image src={wordmark} alt="Nascimento Reformas" width={s.wordmark} height={Math.round(s.wordmark * 0.3)} sizes={`${s.wordmark}px`} className="h-auto max-w-[190px] object-contain" style={{width:s.wordmark}}/>:<span className={cn("font-semibold tracking-[-0.025em] leading-[.95]",size==="lg"?"text-2xl":size==="md"?"text-xl":"text-base",text)}>Nascimento<span className="block mt-1 text-[0.52em] font-medium tracking-[0.18em] uppercase opacity-65">Reformas</span></span>)}</span>;
 return href?<Link href={href} className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500">{content}</Link>:content;
}