import { Hero } from "@/features/home/Hero";
import { Credibility } from "@/features/home/Credibility";
import { Services } from "@/features/home/Services";
import { Specialty } from "@/features/home/Specialty";
import { PortfolioPreview } from "@/features/home/PortfolioPreview";
import { Process } from "@/features/home/Process";
import { WhyNascimento } from "@/features/home/WhyNascimento";
import { Region } from "@/features/home/Region";
import { CtaFinal } from "@/features/home/CtaFinal";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

export default function HomePage() {
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
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: -27.645,
              longitude: -48.668,
            },
            geoRadius: "40000",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Palhoça",
            addressRegion: "SC",
            addressCountry: "BR",
          },
          priceRange: "$$",
        }}
      />
      <Hero />
      <Credibility />
      <Services />
      <Specialty />
      <PortfolioPreview />
      <Process />
      <WhyNascimento />
      <Region />
      <CtaFinal />
    </>
  );
}
