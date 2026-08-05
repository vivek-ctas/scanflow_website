import type { Metadata } from "next";
import Guide from "@/screens/guide";

export const metadata: Metadata = {
  title: "Guide — ScanPro Barcode Scanning Guide",
  description:
    "Learn how to integrate ScanPro's barcode scanning engine in minutes. Step-by-step guide with a live scan demo.",
};

export default function Page() {
  return <Guide />;
}
