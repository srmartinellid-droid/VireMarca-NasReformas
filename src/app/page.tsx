import { JsonLd } from "@/components/seo/JsonLd";
import { DynamicHome } from "@/features/home/DynamicHome";
import { SITE } from "@/lib/site";
import { getHomepageContent, getPublishedProjects } from "@/lib/cms";

export default async function HomePage() {
  const [content, projects] = await Promise.all([getHomepageContent(), getPublishedProjects()]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE.name,
          description: SITE.description,
          url: SITE.url,
          telephone: `+${SITE.whatsapp}`,
          areaServed: {
            "@type": "GeoCircle",
            geoMidpoint: { "@type": "GeoCoordinates", latitude: -27.645, longitude: -48.668 },
            geoRadius: "40000",
          },
          address: { "@type": "PostalAddress", addressLocality: "Palhoça", addressRegion: "SC", addressCountry: "BR" },
          priceRange: "$$",
        }}
      />
      <DynamicHome content={content} projects={projects} />
    </>
  );
}
