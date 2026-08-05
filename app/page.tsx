import type { Metadata } from "next";
import Home from "@/screens/home";

export const metadata: Metadata = {
  title: "ScanPro — Fast Barcode Scanning for Web & Mobile",
  description:
    "ScanPro detects and decodes QR and 1D barcodes from images and live camera feeds. Built for modern scanning workflows.",
};

export default function Page() {
  return <Home />;
}
