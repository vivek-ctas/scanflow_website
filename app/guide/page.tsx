import Guide from "@/screens/guide/page";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guide - Barcode Scanning Integration & Setup",
  description:
    "Learn how to integrate ScanFlow's barcode scanning engine in minutes. Step-by-step guide with a live scan demo.",
  path: "/guide",
});

const guideJsonLd = {
  "@context": "https://schema.org",
  "@type": "Guide",
  name: "ScanFlow Guide",
  url: `${SITE_URL}/guide`,
  description:
    "Step-by-step instructions for integrating ScanFlow's barcode scanning engine into web and mobile workflows.",
  publisher: {
    "@type": "Organization",
    name: "CTAS",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/scanpro.png` },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guide", item: `${SITE_URL}/guide` },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
      />
      <Guide />
    </>
  );
}
