import type { Metadata } from "next";
import Pricing from "@/screens/pricing";

export const metadata: Metadata = {
  title: "Pricing — ScanPro Plans for Every Workflow",
  description:
    "Explore ScanPro pricing plans for businesses of every size. Compare Starter, Pro, and Enterprise plans for barcode scanning.",
};

export default function Page() {
  return <Pricing />;
}
