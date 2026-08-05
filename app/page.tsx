import Home from "@/screens/home";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fast Barcode Scanning for Web & Mobile",
  description:
    "ScanPro detects and decodes QR and 1D barcodes from images and live camera feeds. Built for modern scanning workflows.",
  path: "/",
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ScanPro",
  url: SITE_URL,
  description:
    "Fast, accurate barcode scanning for web and mobile applications.",
  publisher: {
    "@type": "Organization",
    name: "CTAS",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/scanpro.png` },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Home />
    </>
  );
}
