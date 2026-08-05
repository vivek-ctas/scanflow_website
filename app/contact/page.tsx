import type { Metadata } from "next";
import Contact from "@/screens/contact";

export const metadata: Metadata = {
  title: "Contact Us — ScanPro Support & Sales",
  description:
    "Reach the ScanPro team via email or phone. We reply within one business day.",
};

export default function Page() {
  return <Contact />;
}
