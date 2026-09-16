import Contact from "@/screens/contact";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact - ScanFlow Support & Sales",
  description:
    "Reach the ScanFlow team via email or phone. We reply within one business day.",
  path: "/contact",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact ScanFlow",
  url: `${SITE_URL}/contact`,
  description:
    "Reach the ScanFlow team via email or phone. We reply within one business day.",
  publisher: {
    "@type": "Organization",
    name: "CTAS",
    url: SITE_URL,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Contact />
    </>
  );
}
