import { JsonLd } from "@/components/seo/JsonLd";
import { DynamicHome } from "@/features/home/DynamicHome";
import { SITE } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { getHomepageContent, getPublishedProjects } from "@/lib/cms";

export default async function HomePage() {
  const [content,projects] = await Promise.all([getHomepageContent(),getPublishedProjects()]);
  const supabase=await createClient();
  const {data:settings}=await supabase.from("settings").select("key,value").in("key",["accent_color","orange_color"]);
  const map=Object.fromEntries((settings??[]).map(row=>[row.key,row.value]));
  return <><JsonLd data={{"@context":"https://schema.org","@type":"LocalBusiness",name:SITE.name,description:SITE.description,url:SITE.url,telephone:`+${SITE.whatsapp}`,areaServed:{"@type":"GeoCircle",geoMidpoint:{"@type":"GeoCoordinates",latitude:-27.645,longitude:-48.668},geoRadius:"40000"},address:{"@type":"PostalAddress",addressLocality:"Palhoça",addressRegion:"SC",addressCountry:"BR"},priceRange:"$$"}}/><DynamicHome content={content} projects={projects} siteAccent={map.accent_color||"#0B3A64"} orange={map.orange_color||"#E47C19"}/></>;
}