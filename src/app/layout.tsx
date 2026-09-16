import type { Metadata,Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { SITE } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
const inter=Inter({subsets:["latin"],variable:"--font-sans",display:"swap"});
export const metadata:Metadata={metadataBase:new URL(SITE.url),title:{default:`${SITE.name} | Reformas Residenciais em Palhoça e Grande Florianópolis`,template:`%s | ${SITE.name}`},description:SITE.description,keywords:["reformas residenciais","reforma Palhoça","reforma Florianópolis","drywall Grande Florianópolis","gesso Florianópolis","hidráulica residencial","reforma alto padrão SC"],authors:[{name:SITE.name}],icons:{icon:"/api/favicon",shortcut:"/api/favicon",apple:"/api/favicon"},openGraph:{type:"website",locale:"pt_BR",url:SITE.url,siteName:SITE.name,title:`${SITE.name} | Reformas Residenciais`,description:SITE.description,images:[{url:"/og-image.jpg",width:1200,height:630,alt:SITE.name}]},twitter:{card:"summary_large_image",title:SITE.name,description:SITE.description},robots:{index:true,follow:true},alternates:{canonical:SITE.url}};
export const viewport:Viewport={themeColor:"#0B3A64",width:"device-width",initialScale:1};
export default async function RootLayout({children}:{children:React.ReactNode}){const supabase=await createClient();const {data}=await supabase.from("settings").select("key,value").in("key",["logo_url","wordmark_url"]);const settings=Object.fromEntries((data??[]).map(r=>[r.key,r.value]));return <html lang="pt-BR" className={inter.variable}><body className="min-h-screen flex flex-col antialiased"><Header initialLogo={settings.logo_url||"/logo.png"} initialWordmark={settings.wordmark_url||""}/><main className="flex-1">{children}</main><Footer/><FloatingWhatsApp/></body></html>}
