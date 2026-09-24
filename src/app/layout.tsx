import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { SITE, resolveWhatsapp } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Reformas Residenciais em Palhoça e Grande Florianópolis`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ["reformas residenciais", "reforma Palhoça", "reforma Florianópolis", "drywall Grande Florianópolis", "gesso Florianópolis", "hidráulica residencial", "reforma alto padrão SC"],
  authors: [{ name: SITE.name }],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/apple-icon" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Reformas Residenciais`,
    description: SITE.description,
    images: [{
      url: `${SITE.url}/opengraph-image.png`,
      width: 1200,
      height: 630,
      alt: "Nascimento Reformas",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [`${SITE.url}/opengraph-image.png`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0B3A64", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("key,value").in("key", ["logo_url", "wordmark_url", "whatsapp"]);
  const settings = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  const whatsapp = resolveWhatsapp(settings.whatsapp);

  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header initialLogo={settings.logo_url || "/logo.png"} initialWordmark={settings.wordmark_url || ""} whatsapp={whatsapp} />
        <main className="flex-1">{children}</main>
        <Footer whatsapp={whatsapp} />
        <FloatingWhatsApp whatsapp={whatsapp} />
        <Analytics />
      </body>
    </html>
  );
}
