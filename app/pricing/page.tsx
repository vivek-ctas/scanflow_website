import Pricing from "@/screens/pricing";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing - ScanFlow Plans for Every Workflow",
  description:
    "Explore ScanFlow pricing plans for businesses of every size. Compare plans for barcode scanning and pick the tier that fits your scan volume.",
  path: "/pricing",
});

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ScanFlow",
  url: `${SITE_URL}/pricing`,
  description:
    "Barcode scanning plans for businesses of every size, billed monthly or quarterly.",
  brand: {
    "@type": "Organization",
    name: "CTAS",
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
