import TermsScreen from "@/screens/terms";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service - ScanFlow Licensing & SLA",
  description:
    "Review the terms, conditions, software licensing guidelines, and 99.9% uptime SLA commitments for using ScanFlow barcode scanning engines.",
  path: "/terms",
});

const termsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ScanFlow Terms of Service",
  url: `${SITE_URL}/terms`,
  description:
    "ScanFlow terms of service and commercial software licensing agreement.",
  publisher: {
    "@type": "Organization",
    name: "CTAS",
    url: SITE_URL,
  },
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <TermsScreen />
    </>
  );
}
