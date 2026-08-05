import type { Metadata } from "next";
import { Inter, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fonts loaded via next/font to self-host, preload, and eliminate the
// render-blocking Google Fonts request.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

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
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
