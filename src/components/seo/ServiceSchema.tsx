import { Helmet } from "react-helmet-async";

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  url: string;
  image?: string;
}

const ServiceSchema = ({ serviceName, description, url, image }: ServiceSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "LocalBusiness",
      name: "Melia King Solar",
      telephone: "+1-310-346-9466",
      url: "https://meliasolar.com",
    },
    url: url,
    image: image || "https://meliasolar.com/melia-og-image.png",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ServiceSchema;
