import PrivacyScreen from "@/screens/privacy";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy - ScanFlow Data Protection & Security",
  description:
    "Learn how ScanFlow protects your privacy with 100% on-device local camera decoding, zero image storage, and strict GDPR/CCPA compliance.",
  path: "/privacy",
});

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ScanFlow Privacy Policy",
  url: `${SITE_URL}/privacy`,
  description:
    "ScanFlow privacy policy detailing on-device local barcode processing, zero image storage, and data protection practices.",
  publisher: {
    "@type": "Organization",
    name: "CTAS",
    url: SITE_URL,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <PrivacyScreen />
    </>
  );
}
