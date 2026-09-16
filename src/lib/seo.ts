import type { Metadata } from "next";

export const SITE_NAME = "ScanFlow";
export const SITE_URL = "https://ctasis.com";
export const SITE_DESCRIPTION =
  "ScanFlow detects and decodes QR and 1D barcodes from images and live camera feeds. Built for modern scanning workflows.";

export const DEFAULT_OG_IMAGE = "/scanpro.png";

function canonicalUrl(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const url = canonicalUrl(path);
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
