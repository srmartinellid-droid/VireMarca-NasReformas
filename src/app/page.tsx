import { JsonLd } from "@/components/seo/JsonLd";
import { DynamicHomeV2 } from "@/features/home/DynamicHomeV2";
import { SITE, resolveWhatsapp } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { getConsolidatedHomepage } from "@/lib/cms-home";

export default async function HomePage() {
  const [content, supabase] = await Promise.all([getConsolidatedHomepage(), createClient()]);
  const { data: settings } = await supabase.from("settings").select("key,value").in("key", ["accent_color", "orange_color"]);
  const map = Object.fromEntries((settings ?? []).map((row) => [row.key, row.value]));
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "LocalBusiness", name: SITE.name, description: SITE.description, url: SITE.url, telephone: `+${resolveWhatsapp(content.whatsapp)}`, areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: -27.645, longitude: -48.668 }, geoRadius: "40000" }, address: { "@type": "PostalAddress", addressLocality: "Palhoça", addressRegion: "SC", addressCountry: "BR" }, priceRange: "$$" }} /><DynamicHomeV2 content={content} siteAccent={map.accent_color || "#0B3A64"} orange={map.orange_color || "#E47C19"} /></>;
}
