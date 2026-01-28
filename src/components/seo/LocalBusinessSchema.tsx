import { Helmet } from "react-helmet-async";

const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://meliasolar.com/#organization",
    name: "Melia King Solar",
    alternateName: "Voltaic Construction",
    description:
      "Expert solar panel installation, HVAC, Title 24 roofing, and QuietCool whole house fans. Serving residential and commercial clients across 12 states.",
    url: "https://meliasolar.com",
    telephone: "+1-310-346-9466",
    email: "meliaking@voltaicnow.com",
    logo: "https://meliasolar.com/images/logo.webp",
    image: "https://meliasolar.com/melia-og-image.png",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressRegion: "CA",
    },
    areaServed: [
      { "@type": "State", name: "California" },
      { "@type": "State", name: "Colorado" },
      { "@type": "State", name: "Connecticut" },
      { "@type": "State", name: "Florida" },
      { "@type": "State", name: "Hawaii" },
      { "@type": "State", name: "Illinois" },
      { "@type": "State", name: "Massachusetts" },
      { "@type": "State", name: "Maryland" },
      { "@type": "State", name: "New Jersey" },
      { "@type": "State", name: "Nevada" },
      { "@type": "State", name: "Texas" },
      { "@type": "State", name: "Virginia" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://maps.app.goo.gl/b8Z83MdUr8dECADZ9",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
