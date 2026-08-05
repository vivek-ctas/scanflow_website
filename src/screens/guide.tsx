"use client";

import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LiveScanDemo from "@/components/sections/LiveScanDemo";
import CTASection from "@/components/sections/CTASection";

export default function Guide() {
  return (
    <Layout>
      <div className="pt-26">
        <PageHeader
          badge="Guide"
          title={<>Get started with <span className="text-gradient">ScanPro</span></>}
          subtitle="This is a guide section. Learn how to integrate ScanPro's barcode scanning engine into your workflows in minutes."
        />
        <HowItWorksSection />
        <LiveScanDemo />
        <CTASection />
      </div>
    </Layout>
  );
}
