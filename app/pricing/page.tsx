import Pricing from "@/screens/pricing";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing - ScanFlow Plans for Every Workflow",
  description:
    "Explore ScanFlow pricing plans for businesses of every size. Compare Starter, Pro, and Enterprise plans for barcode scanning.",
  path: "/pricing",
});

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ScanFlow",
  url: `${SITE_URL}/pricing`,
  description:
    "Barcode scanning plans for businesses of every size. Starter, Pro, and Enterprise options.",
  brand: {
    "@type": "Organization",
    name: "CTAS",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "499",
    offerCount: "3",
    availability: "https://schema.org/InStock",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <Pricing />
    </>
  );
}
