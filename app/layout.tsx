import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScanPro — Fast Barcode Scanning for Web & Mobile",
  description:
    "ScanPro detects and decodes QR and 1D barcodes from images and live camera feeds. Built for modern scanning workflows.",
  keywords: [
    "barcode scanner",
    "QR code scanner",
    "barcode detection",
    "web barcode scanner",
    "barcode SDK",
    "image barcode reader",
  ],
  openGraph: {
    title: "ScanPro — Fast Barcode Detection",
    description:
      "Reliable barcode scanning for web and mobile applications.",
    type: "website",
    siteName: "ScanPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScanPro — Fast Barcode Detection",
    description:
      "Reliable barcode scanning for modern applications.",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
